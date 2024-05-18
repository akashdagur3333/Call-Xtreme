import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }
  public fileUpload1(data:any){
    return this.http.post(environment.url+'uploadFile',data)
  }
  public fileUpload(data:any){
    return this.http.post(environment.url+'upload',data)
  }

  public addDynamicForm(data:any){
    return this.http.post(environment.url+'dynamicForm',data)
  }

  public addDropdown(data:any){
    return this.http.post(environment.url+'dropdown',data)
  }
  
  public postTl(data:any){
    return this.http.post(environment.url+'tl', data)
  }

  public postManager(data:any){
    return this.http.post(environment.url+'manager', data)
  }

  public postCampaign(data:any){
    return this.http.post(environment.url+'campaign', data)
  }

  public postDid(data:any){
    return this.http.post(environment.url+'did', data)
  }

  public postAgent(data:any){
    return this.http.post(environment.url+'agent', data)
  }

  public postReport(data:any){
    return this.http.post(environment.url+'report', data)
  }

  public postService(data:any){
    return this.http.post(environment.url+'service', data)
  }
}
