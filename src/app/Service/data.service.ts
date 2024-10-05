import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http:HttpClient) { }


getMessage(){
  return this.http.get<any>('http://192.168.1.54:3000');

}


}
