// app
import {LoginRoutes} from '../../components/login/login.routes';
import {HomeRoutes} from '../../components/home/home.routes';

export const routes: Array<any> = [
  ...LoginRoutes,
  ...HomeRoutes
];
