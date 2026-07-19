import { Routes } from '@angular/router';
import { CourseCreate } from './application/course/course-create/course-create';
import { CourseEdit } from './application/course/course-edit/course-edit';
import { CourseList } from './application/course/course-list/course-list';
import { StudentList } from './application/student/student-list/student-list';
import { StudnetCreate } from './application/student/studnet-create/studnet-create';

export const routes: Routes = [
  { path: 'stdlist', component: StudentList },
  { path: 'stdnew', component: StudnetCreate },
  { path: 'courselist', component: CourseList },
  { path: 'coursenew', component: CourseCreate },
  { path: 'courseedit/:id', component: CourseEdit },
];
