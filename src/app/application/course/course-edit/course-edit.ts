import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-edit',
  imports: [FormsModule],
  templateUrl: './course-edit.html',
  styleUrl: './course-edit.css',
})
export class CourseEdit implements OnInit {
  private readonly courseService = inject(CourseService);
  private readonly notificationService = inject(NotificationService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  id = 0;
  title = '';
  startDate = '';
  endDateTime = '';
  studentCapacity = 0;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      return;
    }

    this.id = Number(idParam);
    this.courseService.getAllByFilter({}).subscribe({
      next: (courses) => {
        const course = courses.find((c) => c.id === this.id);
        if (!course) {
          this.notificationService.error('دوره یافت نشد');
          return;
        }

        this.title = course.title;
        this.startDate = this.toDateInputValue(course.startDate);
        this.endDateTime = this.toDateTimeLocalValue(course.endDateTime);
        this.studentCapacity = course.studentCapacity;
      },
      error: () => {
        this.notificationService.error('خطا در بارگذاری دوره');
      },
    });
  }

  save(): void {
    const model = {
      id: this.id,
      title: this.title,
      startDate: new Date(this.startDate).toISOString(),
      endDateTime: new Date(this.endDateTime).toISOString(),
      studentCapacity: this.studentCapacity,
    };

    this.courseService.update(model).subscribe({
      next: (success) => {
        if (success) {
          this.notificationService.success('دوره با موفقیت ویرایش شد');
          this.router.navigate(['/courselist']);
        } else {
          this.notificationService.error('دوره یافت نشد');
        }
      },
      error: () => {
        this.notificationService.error('خطا در ویرایش دوره');
      },
    });
  }

  private toDateInputValue(isoDate: string): string {
    return isoDate.substring(0, 10);
  }

  private toDateTimeLocalValue(isoDateTime: string): string {
    const date = new Date(isoDateTime);
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60_000);
    return local.toISOString().slice(0, 16);
  }
}
