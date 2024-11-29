import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError, } from "rxjs";
import { CommonService } from "../service/common.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private commonservice: CommonService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string = this.commonservice.getLocalData('JWT_TOKEN');
    const reqClone = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(reqClone).pipe(
      tap((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse && evt.ok) {
          // this.commonservice.notify('', 'asdasdas', 'success')
          this.handleResponse(evt);
        }
      }),
      catchError(error => {
        // console.error('Error occurred:', error);
        this.handleError(error);
        return throwError(() => console.log(error, 'error'))//this.commonservice.notify('',error,'error'));
      })
    );
  }

// TODO: common loading spinner

  handleResponse(response: HttpResponse<any>): void {
    // console.log(response, 'update manually')

  }

  handleError(error: HttpErrorResponse): void {
    this.commonservice.notify('', error.error, 'error')
    // console.log(error)
    //Handle error using generic flyout
  }

}