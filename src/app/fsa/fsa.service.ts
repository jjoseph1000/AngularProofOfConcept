import {Injectable} from '@angular/core';
import {IEChart} from './echart';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class FSAService {
    private _productUrl = './api/fsa/echart-students.json';
    constructor(private _http: HttpClient) {

    }
    
    getEChart(): Observable<IEChart> {
        return this._http.get<IEChart>(this._productUrl)
                .do(data => console.log('All: ' + JSON.stringify(data)))
                .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}