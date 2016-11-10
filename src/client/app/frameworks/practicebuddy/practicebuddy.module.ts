// angular
import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';

// app
import { CoreModule } from '../core/core.module';
import { TOKENS_SHARED } from '../core/tokens';
import { PRACTICEBUDDY_PROVIDERS } from './services/index';


/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CoreModule
  ],
  providers: [
    PRACTICEBUDDY_PROVIDERS,
    TOKENS_SHARED
  ]
})
export class PracticeBuddyModule {
  static forRoot(configuredProviders: Array<any>): ModuleWithProviders {
    return {
      ngModule: PracticeBuddyModule,
      providers: configuredProviders
    };
  }
  constructor( @Optional() @SkipSelf() parentModule: PracticeBuddyModule) {
    console.log(`PBModule constructor`);
    if (parentModule) {
      throw new Error('PBModule already loaded; Import in root module only.');
    }
  }
}
