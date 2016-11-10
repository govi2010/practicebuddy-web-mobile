import {FIREBASE, ENUMS, APPSETTINGS} from './app/frameworks/core/tokens';
var firebase = require('firebase/app');
require("firebase/auth");
require("firebase/database");

export const TOKENS_WEB: Array<any> = [
  {
    provide: FIREBASE, useFactory: () => {
      return firebase;
    }
  },
  { provide: ENUMS, useValue: {} },
  { provide: APPSETTINGS, useValue: {} }
];
