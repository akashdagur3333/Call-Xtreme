import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { UpdateService } from 'src/app/services/update.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dropdown-model',
  templateUrl: './dropdown-model.component.html',
  styleUrls: ['./dropdown-model.component.css']
})
export class DropdownModelComponent implements OnInit {
  dropdownForm!: FormGroup;
  submit:String='Submit'
  heading:String='Add DropDown'
  fontSize:any={'font-size':'24px'}
  listName:String=''
  constructor(private fb: FormBuilder,private post:PostService,private update:UpdateService,private get:GetService,private dialogRef:DialogRef,@Inject(MAT_DIALOG_DATA) private editData:any) { }

  ngOnInit() {
    // this.getdropdownForm()
    this.dropdownForm = this.fb.group({
      list_name:['',Validators.required],
      data:this.fb.array([
        this.fb.group({
          label:'',
          value:''
        })
      ]),
    });
    if (this.editData) {
  this.submit='Update'
  this.heading='Update DropDown'
      this.dropdownForm.controls['list_name'].setValue(this.editData.list_name)
      const newData = this.editData.data.map((x: any) => {
        return this.fb.group({
          label: x.label,
          value: x.value
        });
      });
    
      // Assuming `this.data` is a FormArray
      const dataArray = this.data as FormArray;
    
      // Clear existing controls in the FormArray
      dataArray.clear();
    
      // Add new controls to the FormArray
      newData.forEach((group: FormGroup) => {
        dataArray.push(group);
      });
    }
    
  }


  

  get data() {
    return this.dropdownForm.get('data') as FormArray;
  }



  addData() {
    this.data.push(this.fb.group({
      label:[''],
      value:['']
    }));
  }

  setlistName(){
this.dropdownForm.controls['list_name'].setValue(this.listName)
  }
  removeField(index: number) {
    this.data.removeAt(index);
  }

  addDropDown() {
    if(!this.editData){
      this.post.addDropdown(this.dropdownForm.value).subscribe({
        next:(res)=>{
          Swal.fire({
            title: "Good job!",
            text: "Dropdown Added Successfully",
            icon: "success"
          });
          this.dialogRef.close('add')
        },
        error:(err)=>{
          console.log(err)
        }
       })
    }
  else{
    this.updateDropDown()
  }
  }
  updateDropDown(){
    this.update.updateDropDown(this.dropdownForm.value,this.editData.id).subscribe({
      next:(res)=>{
        Swal.fire({
          title: "Good job!",
          text: "Dropdown Updated Successfully",
          icon: "success"
        });
        this.dialogRef.close('update')
      },
      error:(err)=>{
        console.log(err)
      }
     })
  }
}