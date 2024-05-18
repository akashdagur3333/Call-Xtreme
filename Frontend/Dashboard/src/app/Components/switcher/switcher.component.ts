import { Component } from '@angular/core';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.css']
})
export class SwitcherComponent {
  Swi:String=''
  switcher(val:String){
    (val=='open')?this.Swi='switcher-toggled':this.Swi=''
  }
}
