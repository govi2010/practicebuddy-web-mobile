import { Route } from '@angular/router';

import { StudentHomeComponent } from './student-home.component';

export const StudentHomeRoutes: Route[] = [
  { path: "student-home/:id", component: StudentHomeComponent }
];
