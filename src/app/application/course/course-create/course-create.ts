import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-create',
  imports: [FormsModule],
  templateUrl: './course-create.html',
  styleUrl: './course-create.css',
})
export class CourseCreate {
  private readonly courseService = inject(CourseService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);

  title = '';
  startDate = '';
  endDateTime = '';
  studentCapacity = 0;

  save(): void {
    const model = {
      title: this.title,
      startDate: new Date(this.startDate).toISOString(),
      endDateTime: new Date(this.endDateTime).toISOString(),
      studentCapacity: this.studentCapacity,
    };

    this.courseService.create(model).subscribe({
      next: () => {
        this.notificationService.success('دوره با موفقیت ثبت شد');
        this.router.navigate(['/courselist']);
      },
      error: () => {
        this.notificationService.error('خطا در ثبت دوره');
      },
    });
  }
}
