import {FIREBASE, TIMER, ENUMS, DIALOGS, APPSETTINGS, 
  LOADER, FRAME, PAGE, LISTPICKER} from './app/frameworks/core/tokens';
var firebase = require("nativescript-plugin-firebase");
import * as enums from 'ui/enums';
import * as dialogs from 'ui/dialogs';
import * as frame from 'ui/frame';
import * as page from 'ui/page';
import * as appSettings from 'application-settings';
import * as listPicker from 'ui/list-picker';
import * as timer from 'timer';

import { LoadingIndicator } from 'nativescript-loading-indicator';


export const TOKENS_NATIVE: Array<any> = [
  {
    provide: FIREBASE, useFactory: () => {
      return firebase;
    }
  },
  { provide: ENUMS, useValue: enums },
  { provide: DIALOGS, useValue: dialogs },
  { provide: APPSETTINGS, useValue: appSettings},
  { provide: LOADER, useClass: LoadingIndicator},
  { provide: FRAME, useValue: frame },
  { provide: PAGE, useValue: page},
  { provide: LISTPICKER, useValue: listPicker},
  { provide: TIMER, useValue: timer}
];