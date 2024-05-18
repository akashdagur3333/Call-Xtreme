import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  tog:boolean=false
  @Output() Toggle = new EventEmitter<string>();


  isToggle(){
  this.tog=!this.tog
  this.tog==true?this.Toggle.emit('1'):this.Toggle.emit('0')
  }
}
