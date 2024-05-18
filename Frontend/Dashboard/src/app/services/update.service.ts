import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  constructor(private http:HttpClient) { }
  public updateTL(data:any,id:any){
    return this.http.put(environment.url+'tl/'+id,data)
  }
  public updateManager(data:any,id:any){
    return this.http.put(environment.url+'manager/'+id,data)
  }
  public updateDyamicForm(data:any,id:any){
    return this.http.put(environment.url+'dynamicForm/'+id,data)
  }
  public updateDropDown(data:any,id:any){
    return this.http.put(environment.url+'dropdown/'+id,data)
  }
  public updateService(data:any,id:any){
    return this.http.put(environment.url+'service/'+id,data)
  }

  public updateAgent(data:any,id:any){
    return this.http.put(environment.url+'agent/'+id,data)
  }
}
