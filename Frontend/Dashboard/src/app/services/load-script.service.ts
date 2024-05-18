import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadScriptService {

  constructor() { }


  public loadScript(dynamicScripts:any){
  //   const dynamicScripts = [

  //     '../assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js',


  //  ];
   for (let i = 0; i < dynamicScripts.length; i++) {
     const node = document.createElement('script');
     node.src = dynamicScripts[i];
     node.type = 'text/javascript';
     node.async = false;
     document.getElementsByTagName('body')[0].appendChild(node);
   }
 }
}
