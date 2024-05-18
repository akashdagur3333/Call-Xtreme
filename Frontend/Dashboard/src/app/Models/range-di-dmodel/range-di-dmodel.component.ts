import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-range-di-dmodel',
  templateUrl: './range-di-dmodel.component.html',
  styleUrls: ['./range-di-dmodel.component.css']
})
export class RangeDiDModelComponent implements OnInit{
  fontSize:any={'font-size':'24px'}
  RangeDiDForm!:FormGroup
    constructor(private formbuilder:FormBuilder,private post:PostService,private dialogRef:MatDialogRef<RangeDiDModelComponent>){}
  ngOnInit(): void {
      this.RangeDiDForm=this.formbuilder.group({
        did:['',Validators.required],
        did1:['']
      })
  }
  addRangeDiD(){
    this.post.postDid(this.RangeDiDForm.value).subscribe({
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
