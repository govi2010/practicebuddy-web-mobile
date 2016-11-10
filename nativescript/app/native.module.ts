// nativescript
import { NativeScriptModule, platformNativeScriptDynamic, onAfterLivesync, onBeforeLivesync } from 'nativescript-angular/platform';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { RouterExtensions as TNSRouterExtensions } from 'nativescript-angular/router/router-extensions';

// angular
import { NgModule } from '@angular/core';

// libs
import {TNSFontIconService, TNSFontIconPipe, TNSFontIconPurePipe} from 'nativescript-ng2-fonticon';

// app
import { WindowService, ConsoleService, RouterExtensions } from './app/frameworks/core/index';
import { NSAppComponent } from './pages/app/app.component';
import { TOKENS_NATIVE } from './tokens.native';
import { AppComponent, ENTRY_COMPONENTS } from './app/frameworks/practicebuddy/index';
import { routes } from './app/frameworks/practicebuddy/routes';
import { PracticeBuddyModule } from './app/frameworks/practicebuddy/practicebuddy.module';
import {registerElement} from "nativescript-angular/element-registry";
registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab);

// feature modules
import { CoreModule } from './app/frameworks/core/core.module';


// intermediate component module
// helps encapsulate custom native modules in with the components
// note: couple ways this could be done, just one option presented here...
@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule
  ],
  declarations: [
    TNSFontIconPipe,
    TNSFontIconPurePipe,
    ENTRY_COMPONENTS
  ],
  exports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule
  ]
})
class ComponentModule { }

@NgModule({
  imports: [
    CoreModule.forRoot([
      { provide: ConsoleService, useValue: console }
    ]),   
    ComponentModule,
    PracticeBuddyModule.forRoot([
      TOKENS_NATIVE,
      {
        provide: TNSFontIconService,
        useFactory: () => {
          return new TNSFontIconService({
            'fa': 'fonts/font-awesome.css',
            'ion': 'fonts/ionicons.css'
          });
        }
      }
    ]),
    NativeScriptRouterModule.forRoot(<any>routes)
  ],
  declarations: [
    NSAppComponent
  ],
  providers: [
    { provide: RouterExtensions, useClass: TNSRouterExtensions }
  ],
  bootstrap: [NSAppComponent]
})

export class NativeModule { }
