import { Route } from '@angular/router';

import { StudentAdminComponent } from './student-admin.component';

export const StudentAdminRoutes: Route[] = [
  { path: "student-admin/:id", component: StudentAdminComponent }
];
