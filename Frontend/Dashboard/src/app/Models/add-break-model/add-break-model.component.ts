import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-break-model',
  templateUrl: './add-break-model.component.html',
  styleUrls: ['./add-break-model.component.css']
})
export class AddBreakModelComponent implements OnInit{
breakForm!:FormGroup
  constructor(private formbuilder:FormBuilder){}
ngOnInit(): void {
    this.breakForm=this.formbuilder.group({
      campaign:['',Validators.required],
      callDisposition:['',Validators.required]
    })
}
addBreak(){
  console.log(this.breakForm.value)
}


}
