import {
    HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { NotificationService } from '../notification.service';
import { error } from 'console';

@Injectable()
export class ErrorPrintInterceptor implements HttpInterceptor {
    constructor(private readonly notificationService: NotificationService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            tap({
                error: (err: HttpErrorResponse) => {
                    const message = JSON.parse(err.error).message;

                    this.notificationService.showError(message, 0);
                },
            })
        );
    }
}
