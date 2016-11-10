import {LoginRoutes} from './components/login/login.routes';
import {HomeRoutes} from './components/home/home.routes';
import {StudentHomeRoutes} from './components/student-home/student-home.routes';
import {StudentAdminRoutes} from './components/student-admin/student-admin.routes';
import {TeacherHomeRoutes} from './components/teacher-home/teacher-home.routes';

export const routes: Array<any> = [
  ...LoginRoutes,
  ...HomeRoutes,
  ...StudentHomeRoutes,
  ...StudentAdminRoutes,
  ...TeacherHomeRoutes
];
