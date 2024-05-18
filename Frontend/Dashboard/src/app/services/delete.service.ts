import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(private http:HttpClient) { }

  public deleteDynamicForm(id:any){
    return this.http.delete(environment.url+'dynamicForm/'+id)
  }
  public deleteDropdown(id:any){
    return this.http.delete(environment.url+'dropdown/'+id)
  }

  public deleteTl(id:any){
    return this.http.delete(environment.url+'tl/'+id)
  }

  public deleteManager(id:any){
    return this.http.delete(environment.url+'manager/'+id)
  }

  public deleteCampaign(id:any){
    return this.http.delete(environment.url+'campaign/'+id)
  }

  public deleteDid(id:any){
    return this.http.delete(environment.url+'did/'+id)
  }

  public deleteAgent(id:any){
    return this.http.delete(environment.url+'agent/'+id)
  }

  public deleteReport(id:any){
    return this.http.delete(environment.url+'report/'+id)
  }
  public deleteDisposition(id:any){
    return this.http.delete(environment.url+'disposition/'+id)
  }
  public deleteService(id:any){
    return this.http.delete(environment.url+'service/'+id)
  }
}
