import { Injectable } from '@angular/core';
import { ApiUrls } from '../../../../../shared/utils/api.constant';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
// import { RestService } from './../../../../shared/service/rest.service'

@Injectable({
    providedIn: 'root',
})

export class ContentTestingResultsService {
    constructor(private _http: HttpClient) { }

    public getData(file: any) {
        // return this._restService.send({
        //     url: `${environment.apiBaseUrl}${ApiUrls.contentTesttingResult}`,
        //     payload: payload
        // }); 
        // const formData = new FormData();
        // formData.append('file', file);

        return this._http.post<any>(`${environment.apiBaseUrl}${ApiUrls.getPredictionData}`, file);
    }

    public getResult(id: any, tenantId: any): any {
        // return this._restService.send({
        //     url: `${environment.apiBaseUrl}${ApiUrls.contentTesttingResult}`,
        //     payload: payload
        // });
        return this._http.get<any>(`${environment.apiBaseUrl}${ApiUrls.getResult(id, tenantId)}`);
    }

    public convertBase64ToBlob(base64: string, fileType: string): Blob {
        const byteString = window.atob(base64);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const intArray = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            intArray[i] = byteString.charCodeAt(i);
        }
        return new Blob([intArray], { type: fileType });
    }

    public createFileFromBase64(base64String: string, fileName: string, fileType: string): File {
        const blob = this.convertBase64ToBlob(base64String, fileType);
        return new File([blob], fileName, { type: fileType });
    }

    public schedulePost(id: any, payload: any) {
        return this._http.put<any>(`${environment.apiBaseUrl}${ApiUrls.schedulePost(id)}`, payload);
    }

    public suggestCaption(query: any) {
        return this._http.post<any>(`${environment.apiBaseUrl}${ApiUrls.askAIChat}`, query)
    }
}