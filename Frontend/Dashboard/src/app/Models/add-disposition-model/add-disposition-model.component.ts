import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-disposition-model',
  templateUrl: './add-disposition-model.component.html',
  styleUrls: ['./add-disposition-model.component.css']
})
export class AddDispositionModelComponent 
 {
  fontSize:any={'font-size':'24px'}

    constructor(private post:PostService,private dialogRef:MatDialogRef<AddDispositionModelComponent>){}

  selectedFile!: File;
  uploadResponse: any;



  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  data:any
  onUpload() {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile);
      this.post.fileUpload(formData).subscribe({
        next:(res)=>{
          this.data=res
          if(this.data.message=='Check Campaign id must be integer'){
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Campaign id must be integer!",
            }); 
          }
          Swal.fire({
            title: "Good job!",
            text: "disposition Added Successfully",
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

    } else {
      console.warn('No file selected');
    }
  }

  }
  

