export interface StudentFilterQuery {
  filterText?: string;
}

export interface FamilyDto {
  id: number;
  fullName: string;
  relationType: number;
  relationTypeTitle: string;
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  studentFamilies?: FamilyDto[];
}
