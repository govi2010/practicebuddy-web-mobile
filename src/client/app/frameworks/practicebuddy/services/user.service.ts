import {Injectable, Inject, NgZone} from '@angular/core';
import {LogService} from '../../core/services/log.service';
import {Config} from '../../core/utils/config';
import {FIREBASE, LOADER} from '../../core/tokens';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';
import {UserModel} from '../models/user.model';

declare var zonedCallback: Function;

@Injectable()
export class UserService {
  private _auth: any;
  private _database: any;


  constructor(
    private logger: LogService,
    private ngZone: NgZone,
    @Inject(FIREBASE) private firebase: any,
    @Inject(LOADER) private LoadingIndicator: any) {
    logger.debug(`UserService initializing...`);

    if (Config.IS_MOBILE_NATIVE()) {
      firebase.init({
        persist: true,
        storageBucket: 'gs://practicebuddy-4d466.appspot.com',
        // iOSEmulatorFlush: true,
        onAuthStateChanged: (data: any) => {
          this.logger.debug(`Logged ${data.loggedIn ? 'into' : 'out of'} firebase.`);
        }
      }).then(() => {
        this.logger.debug('firebase.init done');
      }, (error: any) => {
        this.logger.debug('firebase.init error: ' + error);
      });

    } else {

      // web
      let config = {
        apiKey: "AIzaSyD1zfCdGei1OU9wphWTu8wNjarjwe-rRwQ",
        authDomain: "practicebuddy-4d466.firebaseapp.com",
        databaseURL: "https://practicebuddy-4d466.firebaseio.com",
        storageBucket: "practicebuddy-4d466.appspot.com",
        messagingSenderId: "858571045381"
      };
      firebase.initializeApp(config);
      this._database = firebase.database();
      this._auth = firebase.auth();
    }
  }

  public login(user: UserModel) {
    if (Config.IS_MOBILE_NATIVE()) {
    return this.firebase.login({
      type: this.firebase.LoginType.PASSWORD,
      email: user.email,
      password: user.password
    }).then(
        function (result:any) {
          Config.token = result.uid
          Config.email = user.email
          return JSON.stringify(result);
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        }
    )
  }
  else {
      return this._auth.signInWithEmailAndPassword(user.email, user.password).then(function(result:any) {
        console.log(result);
      }, function (error:any) {
           alert(error.message);
        });
    }
  }

  public register(user: UserModel){
    if (Config.IS_MOBILE_NATIVE()) {
      return this.firebase.createUser({
        email: user.email,
        password: user.password
      }).then(
          function (result:any) {
            return JSON.stringify(result);
          },
          function (errorMessage:any) {
            alert(errorMessage);
          }
      )
    }
    else {
    return this._auth.createUserWithEmailAndPassword(user.email, user.password).then(
          function (result:any) {
            console.log(result);
            //Config.token = result.uid
            return JSON.stringify(result);
          }, function (error:any) {
            alert(error.message);
      });
    }
  }

  public resetPassword(email: any){
    //web
    return this._auth.sendPasswordResetEmail(email).then(function (result:any) {
          return JSON.stringify("You've requested to have your password reset. Please check your email to proceed.");
        }, function (error:any) {
           alert(error.message);
     });
  } 

  public logout(){
    Config.token = "";
    this.firebase.logout();
  }

}
