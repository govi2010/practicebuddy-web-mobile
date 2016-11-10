import {OnInit, Inject, ViewChild, ElementRef, ViewEncapsulation} from '@angular/core';
import {BaseComponent} from '../../../core/decorators/base.component';
import {LogService} from '../../../core/services/log.service';
import {DIALOGS, FRAME, PAGE, VIEW} from '../../../core/tokens';
import {UserService} from '../../../practicebuddy/services/user.service';
import {Observable} from 'rxjs/Observable';
import {Config} from '../../../core/utils/config';
import {Router} from '@angular/router';
import {UserModel} from '../../../practicebuddy/models/user.model';

@BaseComponent({
  moduleId: module.id,
  selector: 'sd-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  user: UserModel;
  isLoggingIn = true;
  isAuthenticating = false;

  
  constructor(public userService: UserService,
              private logger: LogService,
              private _router: Router,
              @Inject(DIALOGS) private dialogs: any,
              @Inject(FRAME) private frame: any
            ) {
              this.user = new UserModel();
              this.user.email = "user@nativescript.org";
              this.user.password = "password";
            }

 ngOnInit() {
    if (Config.IS_MOBILE_NATIVE()) {
      if (this.frame.topmost().ios) {
          this.frame.topmost().ios.controller.visibleViewController.navigationItem.setHidesBackButtonAnimated(true, false);
      } 
    } 
  }

 submit() {
    this.isAuthenticating = true;
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }

  login() {
    /*if (getConnectionType() == connectionType.none) {
      alert("PB requires an internet connection to log in.");
      return;
    }*/

    this.userService.login(this.user)
      .then(() => {
        this.isAuthenticating = false;
        this._router.navigate(["/home"]);
      })
      .catch((message:any) => {
        alert(message);
        this.isAuthenticating = false;
      });
  }

  signUp() {
    /*if (getConnectionType() == connectionType.none) {
      alert("PB requires an internet connection to register.");
      return;
    }*/

    this.userService.register(this.user)
      .then(() => {
        this.isAuthenticating = false;
        this.toggleDisplay();
      })
      .catch((message:any) => {
        alert(message);
        this.isAuthenticating = false;
      });
  }

  forgotPassword() {

    var email =  prompt("Enter the email address you used to register for PracticeBuddy to reset your password.", "")
    
    if(email){
      this.userService.resetPassword(email.trim())
          .then((result:any) => {
            if(result){
              alert(result);
            }
          })
          
    }
 }
  
toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }
}