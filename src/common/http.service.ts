
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response , RequestOptions , URLSearchParams  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/**
* This class provides the CommonHttp service with methods to read names and add names.
*/
@Injectable()
export class CommonHttpService {
/**
* Creates a new CommonHttpService with the injected Http.
* @param {Http} http - The injected Http.
* @constructor
*/
    constructor(private http: Http) {}
/**
* Returns an Observable for the HTTP GET request for the JSON resource.
* @return {string[]} The Observable for the HTTP request.
*/
    callApi(apiname: string ): Observable<any> {

        return this.http.get(`${environment.urlpath}/` +  apiname).map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }
    callApi2(apiname: string , data?: any ):  Observable<any> {
        return this.http.post(`http://localhost:3000/` +  apiname, data , '' ).map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);

    }
    callApiParams(apiname: string , paramss?: any) {
        console.log(apiname);
        console.log(paramss);
        const params: URLSearchParams = new URLSearchParams();
        params.set('type', paramss);
        params.set('modetype', 'admin');

        const requestOptions = new RequestOptions();
        requestOptions.search = params;

        return this.http.get(`${environment.urlpath}/` + apiname, requestOptions ).map((res: Response) =>  res.json()).catch(this.handleError);
    }
/**
* Handle HTTP error
*/
    private handleError (error: any) {
        const errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}