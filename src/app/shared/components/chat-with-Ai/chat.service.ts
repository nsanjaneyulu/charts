
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

export class ChatService {
    constructor(private http: HttpClient) { }

    public sendMessage(payload: any): any {
        console.log('payload form the service', payload);
        return this.http.post(`${environment.apiBaseUrl}${ApiUrls.askChatWithAi}`, { query: payload });
    }
}