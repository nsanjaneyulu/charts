
import {
  HttpClient,
  HttpHeaders,
  HttpParams,

} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from './../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }
  private getUrl(relativeUrl: string): string {
    console.log(environment, environment.apiBaseUrl, environment['apiBaseUrl'])
    environment.apiBaseUrl + relativeUrl;

    return environment.apiBaseUrl + relativeUrl;
  }

  private getRequestObject(
    params?: Dictionary,
    headers?: Dictionary
  ): RequestObject {
    let hdr = new HttpHeaders();
    let prms = new HttpParams();
    headers = headers ?? [];
    params = params ?? [];
    if (!headers.some((s: any) => s.key == 'Content-Type' || s.key == 'ContentType'))
      headers?.push({ key: 'Content-Type', value: 'application/json' });
    headers?.forEach((m: any) => {
      hdr = hdr.set(m.key, m.value as string);
    });
    params?.forEach((m: any) => {
      prms = prms.set(m.key, m.value as string);
    });

    return {
      observe: 'response',
      reportProgress: false,
      responseType: 'json',
      headers: hdr,
      params: prms,
    };
  }

  /**
    * Performs HTTP GET requests
    * @param requests
    */
  get<T>(request: ApiRequest): Observable<T> {
    return this.http.get<T>(
      this.getUrl(request.url),
      this.getRequestObject(request.params, request.headers)
    ).pipe(
      map(response => response as T))


  }





  /**
   * Performs HTTP POST requests
   * @param requests
   */
  public send<T>(request: ApiRequest): Observable<T> {

    return this.http
      .post<T>(
        this.getUrl(request.url),
        request.payload,
        this.getRequestObject(request.params, request.headers)
      )
      .pipe(
        map(response => response as T)
        // ,catchError(this.handleError)
      )

  }

  /**
   * Performs HTTP PUT requests
   * @param requests
   */
  public update<T>(request: ApiRequest): Observable<T> {

    return this.http
      .put<T>(
        this.getUrl(request.url),
        request.payload,
        this.getRequestObject(request.params, request.headers)
      )
      .pipe(
        map(response => response as T)
        // , catchError(this.handleError)
      )

  }

  /**
   * Performs HTTP DELETE requests
   * @param requests
   */
  public delete<T>(request: ApiRequest): Observable<T> {
    return this.http
      .delete<T>(
        this.getUrl(request.url),
        this.getRequestObject(request.params, request.headers)
      )
      .pipe(
        map(response => response as T)
        // ,catchError(this.handleError)
      )

  }



}


