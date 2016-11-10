import {UserService} from './user.service';
import {StudentService} from './student.service';


export const PRACTICEBUDDY_PROVIDERS: Array<any> = [
  StudentService,
  UserService
];

export * from './student.service';
export * from './user.service';