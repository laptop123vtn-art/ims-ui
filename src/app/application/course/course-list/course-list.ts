import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification.service';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList {
  private readonly courseService = inject(CourseService);
  protected readonly notificationService = inject(NotificationService);

  readonly dataSource = signal<Course[]>([]);
  readonly filterText = signal('');

  getCourses(): void {
    this.courseService.getAllByFilter({ filterText: this.filterText() }).subscribe({
      next: (courses) => {
        this.dataSource.set(courses);
        this.notificationService.success(`${courses.length} دوره با موفقیت بارگذاری شد`);
      },
      error: () => {
        this.notificationService.error('خطا در بارگذاری لیست دوره‌ها');
      },
    });
  }

  deleteCourse(id: number): void {
    this.courseService.delete(id).subscribe({
      next: (success) => {
        if (success) {
          this.dataSource.update((courses) => courses.filter((c) => c.id !== id));
          this.notificationService.success('دوره با موفقیت حذف شد');
        } else {
          this.notificationService.error('دوره یافت نشد');
        }
      },
      error: () => {
        this.notificationService.error('خطا در حذف دوره');
      },
    });
  }
}
