import {OpaqueToken} from '@angular/core';

export const FIREBASE: OpaqueToken = new OpaqueToken('firebase');
export const ENUMS: OpaqueToken = new OpaqueToken('enums');
export const DIALOGS: OpaqueToken = new OpaqueToken('dialogs');
export const APPSETTINGS: OpaqueToken = new OpaqueToken('appSettings');
export const LOADER: OpaqueToken = new OpaqueToken('LoadingIndicator');
export const FRAME: OpaqueToken = new OpaqueToken('Frame');
export const PAGE: OpaqueToken = new OpaqueToken('Page');
export const VIEW: OpaqueToken = new OpaqueToken('View');
export const LISTPICKER: OpaqueToken = new OpaqueToken('ListPicker');
export const TIMER: OpaqueToken = new OpaqueToken('Timer');

export const TOKENS_SHARED: Array<any> = [
  { provide: FIREBASE, useValue: {} },
  { provide: ENUMS, useValue: {} },
  { provide: DIALOGS, useValue: {} },
  { provide: APPSETTINGS, useValue: {} },
  { provide: LOADER, useValue: {} },
  { provide: FRAME, useValue: {} },
  { provide: PAGE, useValue: {} },
  { provide: VIEW, useValue: {} },
  { provide: LISTPICKER, useValue: {} },
  { provide: TIMER, useValue: {} }
];
