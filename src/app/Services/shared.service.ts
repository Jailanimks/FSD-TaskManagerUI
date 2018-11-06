import { Injectable } from '@angular/core';
import {Http,Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Task } from '../Models/task';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public url:string='http://localhost:9810/api/TaskAPI';
  selectedTask:Task;
  TaskList:Task[];
  constructor(private _http:Http) { }

  GetAll():Observable<Task[]>
  {
     return this._http.get(this.url)
    .map((this.extractAllData));

    // .map((response:Response)=><Task[]>response.json());
  }


  GetAllTasks():Observable<Task[]>
  {
     return this._http.get(this.url)
     .map((response:Response)=><Task[]>response.json());
   }

  GetById(tid:number):Observable<Task>
  {
    return this._http.get(this.url+"/"+tid)
    .map(this.extractData);
    // .map((response:Response)=><Task>response.json())
  }

  private extractAllData(res: Response) {
    var data = res.json() || [];
    if (data !== undefined) {
    data.forEach((d) => {
      d.StartDate = JSON.stringify(d.StartDate).substring(1,11);
       d.EndDate = JSON.stringify(d.EndDate).substring(1,11);
    });
  }
    return data || {};
  }

  private extractData(res: Response) {
    var data = res.json();
    data.StartDate = JSON.stringify(data.StartDate).substring(1,11);
    data.EndDate = JSON.stringify(data.EndDate).substring(1,11);
    return data || {};
  }


  Add(item:Task):Observable<any>
  {
   
    var body = JSON.stringify(item);
    var headerOptions = new Headers({ 'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method:RequestMethod.Post, headers:headerOptions});
    return this._http.post(this.url,body,requestOptions)
    .map((r:Response)=><any>r.json())
  }


  Update(id:number, item:Task):Observable<any>
  {
    var body = JSON.stringify(item);
    var headerOptions = new Headers({ 'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method:RequestMethod.Put, headers:headerOptions});
    return this._http.put(this.url + '/'+ id ,body,requestOptions)
    .map((r:Response)=><any>r.json())
  }


  Delete(tid:number):Observable<any>
  {
   return this._http.delete(this.url+"/"+tid)
    .map((r:Response)=><any>r.json())
  }
}
