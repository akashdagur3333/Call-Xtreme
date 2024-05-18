import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { UpdateService } from 'src/app/services/update.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dynamic-form-model',
  templateUrl: './dynamic-form-model.component.html',
  styleUrls: ['./dynamic-form-model.component.css']
})
export class DynamicFormModelComponent  implements OnInit {
  dynamicForm!: FormGroup;
  fontSize:any={'font-size':'24px'}
  formName:String=''
  heading:String='Add Dynamic Form'
  submit:String='Submit'
  constructor(private fb: FormBuilder,private api:PostService,private update:UpdateService,private get:GetService,private dialogRef:DialogRef,@Inject(MAT_DIALOG_DATA) private editData:any) { }

  ngOnInit() {

    this.dropdownList()
    this.dynamicForm = this.fb.group({
      FormName:['',Validators.required],
      fields:this.fb.array([
        this.fb.group({
          name:'',
          placeholder:'',
          required:'',
          type:'',
          dropdownList:''
        })
      ]),
    });

    if (this.editData) {
      this.heading = 'Update Dynamic Form';
      this.submit = 'Update';
    
      // Set the FormName control
      this.dynamicForm.controls['FormName'].setValue(this.editData.FormName);
      let data=JSON.parse(this.editData.FormData)
      console.log(data)
  
      const newData = data.map((x: any) => {
        return this.fb.group({
          name: x.name,
          placeholder: x.placeholder,
          required: x.required, // Assuming x.required is either true or false
          type: x.type,
          dropdownList: x.dropdownList
        });
      });
    
      // Assuming `fields` is a FormArray
      const fieldsArray = this.dynamicForm.get('fields') as FormArray;
    
      // Clear existing controls in the FormArray
      fieldsArray.clear();
    
      // Add new controls to the FormArray
      newData.forEach((group: FormGroup) => {
        fieldsArray.push(group);
      });
    }
    
  }

  get fields() {
    return this.dynamicForm.get('fields') as FormArray;
  }


isDropDownType(index: number): boolean {
  const fieldsArray = this.dynamicForm.get('fields') as FormArray;
  const fieldTypeControl = fieldsArray.at(index)?.get('type');

  // Check if the current form group has 'DropDown List' selected as the 'Field Type'
  return fieldTypeControl?.value === '1';
}


drop!:any
dropdownList(){
  this.get.getDropdown().subscribe({
    next:(res)=>{
      this.drop=res
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

isDropDown:boolean=false;
selectType(event:Event){
  const value = (event.target as HTMLInputElement).value;
  if(value=='1'){
    this.isDropDown=true
  }
  else{
 this.isDropDown=false
  }
}

  addField() {
    this.fields.push(this.fb.group({
      name:[''],
      placeholder:[''],
      required:[''],
      type:[''],
      dropdownList:['']

    }));
  }

  setformName(){
this.dynamicForm.controls['FormName'].setValue(this.formName)
  }
  removeField(index: number) {
    this.fields.removeAt(index);
  }

  submitForm() {

    if(!this.editData){
      this.api.addDynamicForm(this.dynamicForm.value).subscribe({
        next:(res)=>{
          Swal.fire({
            title: "Good job!",
            text: "Dynamic Form Added Successfully",
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
     this.updateDynamicform()
    }
 
  }
  
  updateDynamicform(){
    this.update.updateDyamicForm(this.dynamicForm.value,this.editData.ID).subscribe({
      next:(res)=>{
        Swal.fire({
          title: "Good job!",
          text: "Dynamic Form Updated Successfully",
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
    
