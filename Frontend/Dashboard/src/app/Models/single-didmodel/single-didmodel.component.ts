import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-single-didmodel',
  templateUrl: './single-didmodel.component.html',
  styleUrls: ['./single-didmodel.component.css']
})
export class SingleDIDModelComponent implements OnInit{
  fontSize:any={'font-size':'24px'}
  singleDiDForm!:FormGroup
    constructor(private formbuilder:FormBuilder,private post:PostService,private dialogRef:MatDialogRef<SingleDIDModelComponent>){}
  ngOnInit(): void {
      this.singleDiDForm=this.formbuilder.group({
        did:['',Validators.required],
        status:0,
        uploaddate:'2023-12-27',
        campaign_name:''
      })
  }
  addSingleDiD(){
    this.post.postDid(this.singleDiDForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        Swal.fire({
          title: "Good job!",
          text: "DID Added Successfully",
          icon: "success"
        });
      this.dialogRef.close('add')
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }








}
