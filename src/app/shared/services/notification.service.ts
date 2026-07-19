import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'info';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  readonly message = signal<string | null>(null);
  readonly type = signal<NotificationType>('info');

  notify(message: string, type: NotificationType = 'info'): void {
    this.message.set(message);
    this.type.set(type);
    setTimeout(() => this.clear(), 3000);
  }

  success(message: string): void {
    this.notify(message, 'success');
  }

  error(message: string): void {
    this.notify(message, 'error');
  }

  clear(): void {
    this.message.set(null);
  }
}
