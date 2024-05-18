import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ivr-file-model',
  templateUrl: './ivr-file-model.component.html',
  styleUrls: ['./ivr-file-model.component.css']
})
export class IvrFileModelComponent{
  fontSize:any={'font-size':'24px'}
  fileDescription:any=''
    constructor(private formbuilder:FormBuilder,private post:PostService,private dialogRef:MatDialogRef<IvrFileModelComponent>){}

 
  selectedFile!: File;


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


  addForm() {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile);
  

      this.post.fileUpload1(formData).subscribe({
        next:(res)=>{
          console.log(res)
          Swal.fire({
            title: "Good job!",
            text: "File Uploaded Successfully",
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
      Swal.fire({
        title: "The File?",
        text: "Select file?",
        icon: "question"
      });
    }
  }


}
