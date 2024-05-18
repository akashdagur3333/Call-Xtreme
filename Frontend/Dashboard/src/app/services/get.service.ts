import { Injectable } from '@angular/core';
import { environment } from '../enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor(private http:HttpClient) { }

  public getDynamicForm(){
    return this.http.get(environment.url+'dynamicForm')
  }

  public getDropdown(){
    return this.http.get(environment.url+'dropdown')
  }

  public getTl(){
    return this.http.get(environment.url+'tl')
  }

  public getManager(){
    return this.http.get(environment.url+'manager')
  }

  public getCampaign(){
    return this.http.get(environment.url+'campaign')
  }

  public getDid(){
    return this.http.get(environment.url+'did')
  }

  public getAgent(){
    return this.http.get(environment.url+'agent')
  }

  public getReport(){
    return this.http.get(environment.url+'report')
  }
  public getDisposition(){
    return this.http.get(environment.url+'disposition')
  }
  public getLiveAgent(){
    return this.http.get(environment.url+'liveagent')
  }

  public getService(){
    return this.http.get(environment.url+'service')
  }
}
