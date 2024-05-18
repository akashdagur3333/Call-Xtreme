import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  tog:boolean=false
  @Output() Toggle = new EventEmitter<string>();
token:any
  ngOnInit(): void {
      this.token=localStorage.getItem('token')
      this.token=jwtDecode(this.token)
      
  }

  isToggle(){
  this.tog=!this.tog
  this.tog==true?this.Toggle.emit('1'):this.Toggle.emit('0')
  }
}
