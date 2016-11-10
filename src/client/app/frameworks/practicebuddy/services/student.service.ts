import {Injectable, Inject, NgZone} from '@angular/core';
import {LogService} from '../../core/services/log.service';
import {Config} from '../../core/utils/config';
import {FIREBASE, LOADER} from '../../core/tokens';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/find';
import {StudentModel} from '../models/student.model';

declare var zonedCallback: Function;

@Injectable()
export class StudentService {
  items: BehaviorSubject<Array<StudentModel>> = new BehaviorSubject([]); 
  //private onSync:Function; 
  private _allItems: Array<StudentModel> = [];
  private _database: any;
  
  constructor(
    private logger: LogService,
    private ngZone: NgZone,
    @Inject(FIREBASE) private firebase: any,
    @Inject(LOADER) private LoadingIndicator: any) {
    logger.debug(`StudentService initializing...`);
  }
  
 
  public getMyStudents(): Observable<any> {
    //this gets the students associated to the account
    return new Observable((observer: any) => {
      let path = 'StudentSettings';
      let listener: any;

      if (Config.IS_MOBILE_NATIVE()) {
          
        this.LoadingIndicator.show({ message: 'Finding Students...' });
          
        let onValueEvent = (snapshot: any) => {
          this.ngZone.run(() => {
            let results = this.handleSnapshot(false,snapshot.value, path);
             observer.next(results);
          });
        };

        this.firebase.addValueEventListener(onValueEvent, `/${path}`).then(() => {
          console.log(`firebase listener setup.`);
          this.LoadingIndicator.hide();
        });

      } else {
        listener = this.firebase.database().ref(path).orderByChild('date')
          .on('value', (snapshot:any) => {
            this.ngZone.run(() => {
              observer.next(this.handleSnapshot(false, snapshot.value, path));
            });
          }, observer.error);
      }

      return () => {
        // Unsubscribe
        console.log('unsubscribe students');
        if (Config.IS_MOBILE_NATIVE()) {
          // nothing needs to clean up with native firebase I don't think?
          // may need to check with Eddy, but should be ok for now
        } else {
          // cleanup and detach listener
          this.firebase.database().ref(path).off('value', listener);
        }     
      };
    }).share();
  }

  public getTeacherStudents(): Observable<any> {
    //this gets the students associated to the account
    return new Observable((observer: any) => {
      let path = 'StudentSettings';
      let listener: any;

      if (Config.IS_MOBILE_NATIVE()) {
          
        this.LoadingIndicator.show({ message: 'Finding Students...' });
          
        let onValueEvent = (snapshot: any) => {
          this.ngZone.run(() => {
            let results = this.handleSnapshot(true,snapshot.value, path);
            observer.next(results);
          });
        };

        this.firebase.addValueEventListener(onValueEvent, `/${path}`).then(() => {
          console.log(`firebase listener setup.`);
          this.LoadingIndicator.hide();
        });

      } else {
        listener = this.firebase.database().ref(path).orderByChild('date')
          .on('value', (snapshot:any) => {
            this.ngZone.run(() => {
              observer.next(this.handleSnapshot(true, snapshot.value, path));
            });
          }, observer.error);
      }

      return () => {
        // Unsubscribe
        console.log('unsubscribe students');
        if (Config.IS_MOBILE_NATIVE()) {
          // nothing needs to clean up with native firebase I don't think?
          // may need to check with Eddy, but should be ok for now
        } else {
          // cleanup and detach listener
          this.firebase.database().ref(path).off('value', listener);
        }     
      };
    }).share();
  }

  /*getMyStudent(id: string) {
    return new Promise((resolve) => {
      let complete = () => {
        resolve(this._allItems.filter(s => s.id === id)[0]);
      };
      if (this._allItems.length) {
        complete();
      } else {
        let sub = this.getMyStudents().subscribe((students: StudentModel) => {
          sub.unsubscribe();
          complete();
        });
      }
    });
  }*/
  public getMyStudent(id: string): Observable<any> {
    return new Observable((observer: any) => {
      observer.next(this._allItems.filter(s => s.id === id)[0]);
    }).share();
  }

  getTeacherStudent(id: string) {
    return new Promise((resolve) => {
      let complete = () => {
        resolve(this._allItems.filter(s => s.id === id)[0]);
      };
      if (this._allItems.length) {
        complete();
      } else {
        let sub = this.getTeacherStudents().subscribe((students: StudentModel) => {
          sub.unsubscribe();
          complete();
        });
      }
    });
  }

  add(name: string) {   
    return this.firebase.push(
        "/StudentSettings",
        {
          "Name": name,
          "Date": 0 - Date.now(), 
          "PracticesRequired": 5,
          "PracticesCompleted": 0, 
          "PracticeLength": 20, 
          "Reward": "A special prize!",
          "AdminPassword": "",
          "TeacherEmail": "",
          "Instrument": 10,
          "UID": Config.token
        }
      )
      .catch(this.handleErrors);
  }

  saveSettings(student: StudentModel){
    console.log(JSON.stringify(student))    
    this.publishUpdates();
    return this.firebase.update("/StudentSettings/"+student.id+"",{Name:student.Name, Instrument:student.Instrument, AdminPassword:student.AdminPassword, PracticesRequired:student.PracticesRequired, PracticeLength:student.PracticeLength, PracticesCompleted: student.PracticesCompleted, Reward:student.Reward, TeacherEmail:student.TeacherEmail})
      .then(alert("Student information saved!"))
      .catch(this.handleErrors);     
  }
  
  deleteStudent(student: StudentModel) {
    return this.firebase.remove("/StudentSettings/"+student.id+"")
      .then(this.publishUpdates())
      .catch(this.handleErrors);
  }

  saveRecording(path:any){
    //firebase
    this.firebase.uploadFile(path).then((uploadedFile: any) => {
        alert("File uploaded: " + JSON.stringify(uploadedFile));
    }, (error: any) => {
        alert("File upload error: " + error);
    });
  }


  
  handleSnapshot(all: boolean, data: any, path?: string) {
    //empty array, then refill
    this._allItems = [];
    if (path)
      console.log(`value ${path}:`, data);

    if (data) {
      for (let id in data) {
        console.log(JSON.stringify(data))
        
        let result = (<any>Object).assign({id: id}, data[id]);
        if(!all && Config.token === result.UID){
          this._allItems.push(result);
        }
        else {
          //get all students in db for one teacher
          if(all && Config.email === result.TeacherEmail){
            this._allItems.push(result);
          }
        }
      }
      this.publishUpdates();
    }
    return this._allItems;
  }

  publishUpdates() {
    // must emit a *new* value (immutability!)
    this._allItems.sort(function(a, b){
        if(a.Date < b.Date) return -1;
        if(a.Date > b.Date) return 1;
      return 0;
    })
    this.items.next([...this._allItems]);
  }

  handleErrors(error:any) {
    console.log(JSON.stringify(error));
    return Promise.reject(error.message);
  }
}