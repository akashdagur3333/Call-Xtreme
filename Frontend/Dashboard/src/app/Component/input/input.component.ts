import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  dynamicForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dynamicForm = this.fb.group({
      fields:this.fb.array([
        this.fb.group({
          name:[''],
          placeholder:[''],
          required:[''],
          type:['']
        })
      ]),
    });
  }

  get fields() {
    return this.dynamicForm.get('fields') as FormArray;
  }

  addField() {
    this.fields.push(this.fb.group({
      name:[''],
      placeholder:[''],
      required:[''],
      type:['']
    }));
  }

  removeField(index: number) {
    this.fields.removeAt(index);
  }

  submitForm() {
    console.log(this.dynamicForm.value);
    // Add your form submission logic here
  }
}
