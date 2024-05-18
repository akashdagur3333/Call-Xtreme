import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-green-button',
  templateUrl: './green-button.component.html',
  styleUrls: ['./green-button.component.css']
})
export class GreenButtonComponent {
  @Input('name') name!:String
  @Input('button') buttonStyle:any
}
