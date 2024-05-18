import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-close-button',
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.css']
})
export class CloseButtonComponent {
  
 @Input('button') buttonStyle:any
  @Input('name') name!:String
}
