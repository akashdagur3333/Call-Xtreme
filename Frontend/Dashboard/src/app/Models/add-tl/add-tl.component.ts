import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';
import { UpdateService } from 'src/app/services/update.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-tl',
  templateUrl: './add-tl.component.html',
  styleUrls: ['./add-tl.component.css']
})
export class AddTlComponent implements OnInit{
  fontSize:any={'font-size':'24px'}
  tlForm!:FormGroup
  submit:String='Submit'
    constructor(private formbuilder:FormBuilder,private update:UpdateService,private post:PostService,private dialogRef:MatDialogRef<AddTlComponent>,@Inject(MAT_DIALOG_DATA) private editdata:any){}
  ngOnInit(): void {

      this.tlForm=this.formbuilder.group({
        tl_name:[''],
        tl_email:[''],
        tl_password:[''],
        tl_description:['']
      })

      if(this.editdata){
        this.submit='Update'
        this.tlForm.controls['tl_name'].setValue(this.editdata.tl_name)
        this.tlForm.controls['tl_email'].setValue(this.editdata.tl_email)
        this.tlForm.controls['tl_password'].setValue(this.editdata.tl_password)
        this.tlForm.controls['tl_description'].setValue(this.editdata.tl_description)

      }

  }
  addTL(){
    if(!this.editdata){
      this.post.postTl(this.tlForm.value).subscribe({
        next:(res)=>{
          Swal.fire({
            title: "Good job!",
            text: "TL Added Successfully",
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
      this.updateTL()
    }
  }

  updateTL(){
    this.update.updateTL(this.tlForm.value,this.editdata.tl_id).subscribe({
      next:(res)=>{
        console.log(res)
        Swal.fire({
          title: "Good job!",
          text: "TL Updated Successfully",
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
