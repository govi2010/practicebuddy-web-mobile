import {Inject, OnInit, OnDestroy, NgZone} from '@angular/core';
import {BaseComponent} from '../../../core/decorators/base.component';
import {TIMER} from '../../../core/tokens';
import {Router, ActivatedRoute} from '@angular/router';
import {StudentService} from '../../../practicebuddy/services/student.service';
import {StudentModel} from '../../../practicebuddy/models/student.model';
import 'rxjs/add/operator/take';
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
// libs
//import {Store} from '@ngrx/store';

@BaseComponent({
    moduleId: module.id,
    selector: 'sd-student-home',
    templateUrl: 'student-home.component.html',
    styleUrls: ['student-home.css']
})
export class StudentHomeComponent implements OnInit, OnDestroy {

  public student: Observable<any>;
  id: any;
  private sub: any;
  name: string;
  practicesrequired: number;
  practicelength: number;
  practicescompleted: number;
  instrument: number;
  reward: string;
  //timers
  isTiming: boolean;
  isRecording: boolean;
  minutes: number = 0;
  seconds: number = 0;
  myTimer: any;

  public minutes$: BehaviorSubject<number> = new BehaviorSubject(0);
  public seconds$: BehaviorSubject<number> = new BehaviorSubject(0);
  
    constructor(
        private route: ActivatedRoute,
        private studentService: StudentService,
        private _router: Router,
        private ngZone: NgZone,
        @Inject(TIMER) private timer: any
    ) {
      this.sub = this.route.params.subscribe((params:any) => {
        this.id = params['id'];
      });
    }

  ngOnInit(){
    console.log(this.id)
    this.studentService.getMyStudent(this.id).subscribe((student) => {
        console.log(JSON.stringify(student))
         this.ngZone.run(() => {    
          for (let prop in student) {
                  //props
                  if (prop === "id") {
                    //this.id = student[prop];
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
                }
             });
          });         
  }

    toggleRecord(args: any) {

    }

    toggleTimer(args: any) {
        if (!this.isTiming){
            this.startTimer();
        }
        else {
            this.stopTimer();
        }    
    }

    startTimer(){
        this.isTiming = true;
        this.myTimer = this.timer.setInterval(() => {
            if(this.seconds < 60 && this.seconds >= 0){
                ++this.seconds;
                console.log(this.seconds)
                this.ngZone.run(() => {
                  this.seconds$.next(this.seconds);
                });
            }
            else{
                this.seconds = 0;
                ++this.minutes;
                this.ngZone.run(() => {
                  this.minutes$.next(this.minutes);
                });
            }
            
        }, 1000);
    }

    stopTimer() {
        //todo - warn if you're stopping early
        this.isTiming = false;
        this.timer.clearInterval(this.myTimer);
        this.minutes = 0;
        this.seconds = 0;
        this.ngZone.run(() => {
            this.seconds$.next(this.seconds);
            this.minutes$.next(this.minutes);
        });
    }
   
    ngOnDestroy() {
      this.stopTimer();
      if (this.sub) this.sub.unsubscribe();
    }


}