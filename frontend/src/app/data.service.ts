import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse  } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';
import {
  DataType,
  ReturnType
} from "./type";
import 'rxjs/add/operator/map';

const SERVER_URL: string = 'api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
 

export class DataService {

  constructor(private http: HttpClient) { 
  }

  public predict(data:any):Observable<any>
  {
    return this.http.post<any>(`${SERVER_URL}predictText`, data, httpOptions)
   .pipe(
    catchError(this.handleError)
   );
    

}
handleError(error: HttpErrorResponse){
  console.log("lalalalalalalala");
  return throwError(error);
  }
}