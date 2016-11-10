import {Inject, NgZone, OnInit, AfterViewInit} from '@angular/core';
import {BaseComponent} from '../../../core/decorators/base.component';
import {FRAME, LISTPICKER} from '../../../core/tokens';
import {Observable} from 'rxjs/Observable';
import {Config} from '../../../core/utils/config';
import {Router, ActivatedRoute} from '@angular/router';
import {StudentService} from '../../../practicebuddy/services/student.service';
import {StudentModel} from '../../../practicebuddy/models/student.model';
import 'rxjs/add/operator/take';

@BaseComponent({
    moduleId: module.id,
    selector: 'sd-student-admin',
    templateUrl: 'student-admin.component.html',
    styleUrls: ['student-admin.css']
})
export class StudentAdminComponent implements OnInit, AfterViewInit {

    name: string;
    practicesrequired: number;
    practicelength: number;
    practicescompleted: number;
    reward: string;
    adminpassword: string;
    teacheremail: string;
    date: string;
    instrument: number;
    instruments:any;
    selectedInstrumentIndex: number;
    public student: Observable<any>;
    public newstudent: StudentModel;
    id: any;
    private sub: any;
  

    constructor(
        private route: ActivatedRoute,
        private studentService: StudentService,
        private _router: Router,
        private ngZone: NgZone,
        @Inject(FRAME) private frame: any,
        @Inject(LISTPICKER) private listPicker: any
    ) {}

ngOnInit(){
    this.sub = this.route.params.subscribe((params:any) => {
      this.id = params['id'];
      this.studentService.getMyStudent(this.id).subscribe((student) => {
         this.ngZone.run(() => {    
          for (let prop in student) {
                  //props
                  if (prop === "Id") {
                    this.id = student[prop];
                  }
                  if (prop === "Name") {
                    this.name = student[prop];
                  }
                  if (prop === "PracticesRequired") {
                    this.practicesrequired = student[prop];
                  }
                  if (prop === "PracticesCompleted") {
                    this.practicescompleted = student[prop];
                  }
                  if (prop === "PracticeLength") {
                    this.practicelength = student[prop];
                  }
                  if (prop === "Reward") {
                    this.reward = student[prop];
                  }
                  if (prop === "Instrument") {
                    this.instrument = student[prop];
                  }
                  this.instruments = ['acoustic guitar', 'banjo', 'cello',
                  'clarinet', 'elecric guitar', 'flute', 'french horn',
                  'handbells', 'harp', 'mandolin', 'music', 'oboe', 'organ', 'percussion', 'piano', 'sax',
                  'trombone', 'trumpet', 'violin', 'voice', 'xylophone'];
            
                }
             });
          });
      }); 
  }


 ngAfterViewInit(){

          /*if (Config.IS_MOBILE_NATIVE()) {
              let instrumentListPicker = this.listPicker.nativeElement;
              instrumentListPicker.selectedIndex = this.instrument;
              console.log(this.instrument)
          } */

           
  }

 public selectedIndexChanged(picker:any) {
        console.log('picker selection: ' + picker.selectedIndex);              
    }

  submit() {  
    this.newstudent = new StudentModel(

      this.id,
      this.adminpassword,
      this.date,
      this.selectedInstrumentIndex,
      this.name,
      Math.round(this.practicelength), 
      this.practicescompleted, 
      Math.round(this.practicesrequired),
      this.reward,
      this.teacheremail)

    this.studentService.saveSettings(this.newstudent)
    .catch(function (e:any) {
        console.log(e.message);
    });     
  }

}