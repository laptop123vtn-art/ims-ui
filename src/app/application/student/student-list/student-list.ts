import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../shared/services/notification.service';
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList {
  private readonly studentService = inject(StudentService);
  protected readonly notificationService = inject(NotificationService);

  readonly dataSource = signal<Student[]>([]);
  readonly filterText = signal('');

  getStudents(): void {
    this.studentService.getAllByFilter({ filterText: this.filterText() }).subscribe({
      next: (students) => {
        this.dataSource.set(students);
        this.notificationService.success(`${students.length} دانشجو با موفقیت بارگذاری شد`);
      },
      error: () => {
        this.notificationService.error('خطا در بارگذاری لیست دانشجویان');
      },
    });
  }

  deleteStudent(id: number): void {}
}
