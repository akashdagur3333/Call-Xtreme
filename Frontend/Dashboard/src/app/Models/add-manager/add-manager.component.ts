import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';
import { UpdateService } from 'src/app/services/update.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.css']
})
export class AddManagerComponent implements OnInit{
  fontSize:any={'font-size':'24px'}
  form:String='Add Manager'
  managerForm!:FormGroup
  submit:String='Submit'
  heading:String='Add Manager'
    constructor(private formbuilder:FormBuilder,private update:UpdateService,private post:PostService,private dialogRef:MatDialogRef<AddManagerComponent>,@Inject(MAT_DIALOG_DATA) private editData:any){}
  ngOnInit(): void {
      this.managerForm=this.formbuilder.group({
        m_name:[''],
        m_email:[''],
        m_password:[''],
        m_description:['']
      })

      if(this.editData){
        this.submit='Update'
        this.heading='update Manager'
        this.managerForm.controls['m_name'].setValue(this.editData.m_name)
        this.managerForm.controls['m_email'].setValue(this.editData.m_email)
        this.managerForm.controls['m_password'].setValue(this.editData.m_password)
        this.managerForm.controls['m_description'].setValue(this.editData.m_description)

      }
  }
  addManager(){
   if(!this.editData){
    this.post.postManager(this.managerForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        Swal.fire({
          title: "Good job!",
          text: "Manager Added Successfully",
          icon: "success"
        });
      this.dialogRef.close('add')
      },
      error:(err)=>{
        console.log(err)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    })

   }
   else{
    this.updateManager()
   }


  }

  updateManager(){
    this.update.updateManager(this.managerForm.value,this.editData.m_id).subscribe({
      next:(res)=>{
        Swal.fire({
          title: "Good job!",
          text: "Manager Updated Successfully",
          icon: "success"
        });
      this.dialogRef.close('update')
      },error:(err)=>{
        console.log(err)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    })
 
  }








}
