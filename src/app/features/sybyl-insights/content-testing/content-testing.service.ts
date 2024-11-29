import { Injectable } from '@angular/core';
import { ApiUrls } from '../../../shared/utils/api.constant';
import { environment } from '../../../../environments/environment';
// import { RestService } from './../../../shared/service/rest.service'
import {
    HttpClient,
    HttpHeaders,
    HttpParams,

} from '@angular/common/http';
// import { RestService } from '../../../shared/service/rest.service';
@Injectable({
    providedIn: 'root',
})

export class ContentTestingService {
    constructor(private http: HttpClient) { }

    public runAnalysis(payload: any): any {
        // return this._restService.send({
        //     url: `${environment.apiBaseUrl}${ApiUrls.runAnalysis}`,
        //     payload: payload
        // });
        console.log('payload form the service', payload)
        return this.http.post(`${environment.apiBaseUrl}${ApiUrls.runAnalysis}`, payload);
    }
}