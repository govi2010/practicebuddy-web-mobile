// Feel free to extend this interface
// depending on your app specific config.
import {APPSETTINGS} from '../../core/tokens';
import {Inject} from '@angular/core';

export interface EnvConfig {
  API?: string;
  ENV?: string;
}

interface IPlatforms {
  WEB: string;
  MOBILE_NATIVE: string;
  MOBILE_HYBRID: string;
  DESKTOP: string;
}

export class Config {

  
  constructor(@Inject(APPSETTINGS) private appsettings: any
  ) {}
public static PageClass: any;

  //tokens
  public static token:string = "";
  public static email:string = "";
  
  /*public static getToken():any {
    if (Config.IS_WEB()) {
      return <string>localStorage.getItem("token");
    }
    else {
      return this.appsettings.getString("token");
    }
  }
    
  public static setToken(theToken: string) {
    if (Config.IS_WEB()) {
      localStorage.setItem("token", theToken);
    }
    else {
      this.appsettings.setString("token", theToken);
    }
  }
    
  public static hasActiveToken():any {
    if (Config.IS_WEB()) {
      return !!localStorage.getItem("token");
    }
    else{
      return !!this.appsettings.getString("token");
    }
  }*/

  public static invalidateToken() {
    Config.token = "";
    Config.email = "";
  }
  
  public static DEBUG: any = {
    LEVEL_1: false, // .info only
    LEVEL_2: false, // .warn only
    LEVEL_3: false, // .error only
    LEVEL_4: false  // .log + all the above
  };

  // supported platforms
  public static PLATFORMS: IPlatforms = {
    WEB: 'web',
    MOBILE_NATIVE: 'mobile_native',
    MOBILE_HYBRID: 'mobile_hybrid',
    DESKTOP: 'desktop'
  };

  // current target (defaults to web)
  public static PLATFORM_TARGET: string = Config.PLATFORMS.WEB;

  // convenient platform checks
  public static IS_WEB(): boolean {
    return Config.PLATFORM_TARGET === Config.PLATFORMS.WEB;
  }

  public static IS_MOBILE_NATIVE(): boolean {
    return Config.PLATFORM_TARGET === Config.PLATFORMS.MOBILE_NATIVE;
  }

  public static IS_MOBILE_HYBRID(): boolean {
    return Config.PLATFORM_TARGET === Config.PLATFORMS.MOBILE_HYBRID;
  }

  public static IS_DESKTOP(): boolean {
    return Config.PLATFORM_TARGET === Config.PLATFORMS.DESKTOP;
  }

  public static ENVIRONMENT(): EnvConfig {
    if (Config.IS_MOBILE_NATIVE()) {
      return {
        API: 'your api endpoint',
        ENV: 'nativescript'
      };
    } else {
      return JSON.parse('<%= ENV_CONFIG %>');
    }
  }

  public static IS_DEBUG_MODE(): boolean {
    for (let key in Config.DEBUG) {
      if (Config.DEBUG[key]) {
        // if any level is on, debug mode is on
        return true;
      }
    }
    return false;
  }

  // reset debug defaults
  public static RESET() {
    for (let key in Config.DEBUG) {
      Config.DEBUG[key] = false;
    }
  }
}
