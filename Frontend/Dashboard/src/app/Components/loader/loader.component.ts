import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { fromEvent, throttleTime } from 'rxjs';

import * as $ from 'jquery'
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent{

 showLoader: boolean = true;

ManageClass='pace-deactive'

  constructor(@Inject(DOCUMENT) private document:Document, private router: Router){
    router.events.subscribe( (routerEvent: any) => {
      this.checkRouteChange(routerEvent);

  });
  }
  checkRouteChange( routerEvent:RouterEvent){
  
    // if route change started
    if(routerEvent instanceof NavigationStart){
      // $(window).on('load', function() {
       this.ManageClass='pace-active'
      // });
  
    }
    // if route change ended
   if(routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    )
    {
      // $(window).on('load', function() {
  
      setTimeout(()=>{

        this.ManageClass='pace-deactive'

      },100)
      // });
    }
  
  }
}
