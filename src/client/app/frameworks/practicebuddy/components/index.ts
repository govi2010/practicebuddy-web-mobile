import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentAdminComponent } from './student-admin/student-admin.component';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';


// for routes
export const ENTRY_COMPONENTS: any[] = [
  LoginComponent,
  HomeComponent,
  StudentHomeComponent,
  StudentAdminComponent,
  TeacherHomeComponent
];

export * from './app/app.component';
export * from './login/login.component';
export * from './home/home.component';
export * from './student-home/student-home.component';
export * from './student-admin/student-admin.component';
export * from './teacher-home/teacher-home.component';