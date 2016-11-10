import {Inject, trigger, style, animate, state, transition, keyframes, ViewChild, ElementRef, OnInit} from '@angular/core';
import {BaseComponent} from '../../../core/decorators/base.component';
import {LogService} from '../../../core/services/log.service';
import {FRAME, DIALOGS} from '../../../core/tokens';
import {Observable} from 'rxjs/Observable';
import {Config} from '../../../core/utils/config';
import {Router} from '@angular/router';
import {StudentService} from '../../../practicebuddy/services/student.service';
import {StudentModel} from '../../../practicebuddy/models/student.model';

@BaseComponent({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.css'],
  animations: [
        trigger('state', [
            state('active', style({ transform: 'rotate(45)' })),
            state('inactive', style({ transform: 'rotate(0)' })),
            transition('inactivebtn => activebtna', [
                animate('280ms ease-in', keyframes([
                    style({opacity: 1, transform: 'translateY(0)'}),
                    style({opacity: 1, transform: 'translateX(70)'})                
                ]))
            ]),
            transition('inactivebtn => activebtnb', [
                 animate('280ms ease-in', keyframes([
                    style({opacity: 1, transform: 'translateX(0)'}),
                    style({opacity: 1, transform: 'translateY(-80)'})
                ]))
            ]),
            transition('inactivebtn => activebtnc', [
                 animate('280ms ease-in', keyframes([
                    style({opacity: 1, transform: 'translateY(0)'}),
                    style({opacity: 1, transform: 'translateX(-70)'}),
                    
                ]))
            ]),
            transition('activebtna => inactivebtn', [
               animate('280ms ease-out', keyframes([
                    style({opacity: 0, transform: 'translateX(0)'}),
                    style({opacity: 0, transform: 'translateY(0)'})
                ]))
            ]),
            transition('activebtnb => inactivebtn', [
                 animate('280ms ease-out', keyframes([
                    style({opacity: 0, transform: 'translateX(0)'}),
                    style({opacity: 0, transform: 'translateY(0)'})
                ]))
            ]),
            transition('activebtnc => inactivebtn', [
                 animate('280ms ease-out', keyframes([
                    style({opacity: 0, transform: 'translateX(0)'}),
                    style({opacity: 0, transform: 'translateY(0)'})
                ]))
            ])
        ]) 
    ]  
})
export class HomeComponent implements OnInit {
  
  public students$: Observable<any>;
  constructor(public studentService: StudentService,
              private logger: LogService,
              private _router: Router,
              @Inject(FRAME) private frame: any,
              @Inject(DIALOGS) private dialogs: any
            ) {}

 ngOnInit() {
    this.students$ = <any>this.studentService.getMyStudents();
    if (Config.IS_MOBILE_NATIVE()) {
      if (this.frame.topmost().ios) {
          this.frame.topmost().ios.controller.visibleViewController.navigationItem.setHidesBackButtonAnimated(true, false);
      } 
    }    
  }

isOpen = false;

onTap() {
  this.isOpen = !this.isOpen;
}

goToStudentHome(id:string) {
    this.isOpen = false;
    this._router.navigate(["/student-home", id]);
}

editStudent(id:string){
    //edit selected student
    this.isOpen = false;
    this._router.navigate(["/student-admin", id]);
}

goToTeachersHome(){
    this.isOpen = false;
    this._router.navigate(["/teacher-home"]);
}

addStudent(){
   this.isOpen = false;
   var options = {
      title: 'Add a student',
      okButtonText: 'Save',
      cancelButtonText: 'Cancel',
      inputType: this.dialogs.inputType.text
    };
    this.dialogs.prompt(options).then((result: any) => {
      if (result.text.trim() != "") {
       this.studentService.add(result.text)
          .then(() => {
            alert("Student successfully added!")
          }, (err: any) => {
            alert(err);
          });
      }
    });
}


logout(){
    this.isOpen = false;
    //check whether for real, then logout
    var options = {
      title: 'Logout?',
      okButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    };
    this.dialogs.confirm(options).then((result: any) => {
      //navigate
      this._router.navigate(["/"]);
    });

}

deleteStudent(item:StudentModel){
    var options = {
      title: 'Are you sure you want to delete this student?',
      okButtonText: 'Yes',
      cancelButtonText: 'No'
    };
    this.dialogs.confirm(options).then((result: boolean) => {
      if (result === true) {
       this.studentService.deleteStudent(item)
          .then(() => {
            //nothing
          }, (err: any) => {
            alert(err);
          });
      }
    });
}
 
}