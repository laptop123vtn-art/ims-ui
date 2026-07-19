import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-studnet-create',
  imports: [FormsModule],
  templateUrl: './studnet-create.html',
  styleUrl: './studnet-create.css',
})
export class StudnetCreate {
  firstName: string = '';
  lastName: string = '';

  constructor(private http: HttpClient) {}

  save() {
    const model = { firstName: this.firstName, lastName: this.lastName };
    this.http.post('https://localhost:7058/api/Student/create', model).subscribe((res: any) => {
      alert('ثبت با موفقیت انجام شد');
    });
    //
  }
}
