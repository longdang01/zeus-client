import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpInterceptor
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export class ErrorIntercept implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        // errorMessage = `Error: ${error.error.message}`;
                        errorMessage = `Message: ${error.error.message}`;
                    } else {
                        // server-side error
                        errorMessage = `Message: ${error.error.message}`;
                        // errorMessage = `Error Status: ${error.status}\nMessage: ${error.error.message}`;
                    }
                    console.log(errorMessage)
                    console.log(error)
                    return throwError(() => new Error(errorMessage));
                })
            )
    }
}