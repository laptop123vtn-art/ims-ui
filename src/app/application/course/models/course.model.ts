export interface CourseFilterQuery {
  filterText?: string;
}

export interface Course {
  id: number;
  title: string;
  startDate: string;
  endDateTime: string;
  studentCapacity: number;
}

export interface CourseCreateCommand {
  title: string;
  startDate: string;
  endDateTime: string;
  studentCapacity: number;
}

export interface CourseUpdateCommand extends CourseCreateCommand {
  id: number;
}
