import {Inject, OnInit} from '@angular/core';
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
  selector: 'sd-teacher-home',
  templateUrl: 'teacher-home.component.html',
  styleUrls: ['teacher-home.css'] 
})
export class TeacherHomeComponent implements OnInit {
  
  public teacherstudents$: Observable<any>;
  constructor(public studentService: StudentService,
              private logger: LogService,
              private _router: Router,
              @Inject(FRAME) private frame: any,
              @Inject(DIALOGS) private dialogs: any
            ) {}

 ngOnInit() {
    //this.teacherstudents$ = <any>this.studentService.getTeacherStudents();
  }

  goToTeacherStudentHome(){
    //navigate and grab student
  }

 
}