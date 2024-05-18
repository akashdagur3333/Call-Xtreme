import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-script-model',
  templateUrl: './add-script-model.component.html',
  styleUrls: ['./add-script-model.component.css']
})
export class AddScriptModelComponent implements OnInit{
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
