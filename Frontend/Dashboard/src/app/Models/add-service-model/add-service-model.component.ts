import { animate, state, style, transition, trigger } from '@angular/animations';
import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { UpdateService } from 'src/app/services/update.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-service-model',
  templateUrl: './add-service-model.component.html',
  styleUrls: ['./add-service-model.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1000)
      ]),
      transition(':leave', [
        animate(700, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AddServiceModelComponent implements OnInit{
  serviceForm!:FormGroup
  fontSize:any={'font-size':'24px'}
  isIVREnable:boolean=false
  isSticky:boolean=false
  animationState = 'in';
  heading:String='Add Service'
  submit:String='Submit'
  constructor(private formbuilder:FormBuilder,private update:UpdateService,private get:GetService,private post:PostService,private dialogRef:DialogRef,@Inject(MAT_DIALOG_DATA) private editData:any){}

  ngOnInit(): void {
    this.getAllDiD()
    this.getAllCRM()
      this.serviceForm=this.formbuilder.group({
        camp_name:['',Validators.required],
        camp_type:['',Validators.required],
        camp_did:['',Validators.required],
        PacingSet:[''],
        queue:[''],
        hold:1,
        waraptime:['',Validators.required],
        trunkType:0,
        trunk:[''],
        FormID:[],
        sticky:0,
        ivr_status:0,
        CRMURL:[''],
        create_date:this.date()
      })

      if(this.editData){
       this.heading='Update Service'
       this.submit='Update'
        this.serviceForm.controls['camp_name'].setValue(this.editData.camp_name)
        this.serviceForm.controls['camp_type'].setValue(this.editData.camp_type)
        this.serviceForm.controls['camp_did'].setValue(this.editData.camp_did)
        this.serviceForm.controls['PacingSet'].setValue(this.editData.PacingSet)
        this.serviceForm.controls['queue'].setValue(this.editData.queue)
        this.serviceForm.controls['hold'].setValue(this.editData.hold)
        this.serviceForm.controls['waraptime'].setValue(this.editData.waraptime)
        this.serviceForm.controls['trunkType'].setValue(this.editData.trunkType)
        this.serviceForm.controls['trunk'].setValue(this.editData.trunk)
        this.serviceForm.controls['FormID'].setValue(this.editData.FormID)
        this.serviceForm.controls['sticky'].setValue(this.editData.sticky)
        this.serviceForm.controls['ivr_status'].setValue(this.editData.ivr_status)
        this.serviceForm.controls['CRMURL'].setValue(this.editData.CRMURL)

      }
  }
  IVRSelect(){
    this.isIVREnable=!this.isIVREnable
    if(this.isIVREnable==true){
      this.toggleAnimation()
      this.serviceForm.controls['ivr_status'].setValue(1)
    }
    else{
      this.serviceForm.controls['ivr_status'].setValue(0)
    }
  }
  stickySelect(){
    this.isSticky=!this.isSticky
    if(this.isSticky==true){
      this.serviceForm.controls['sticky'].setValue(1)
    }
    else{
      this.serviceForm.controls['sticky'].setValue(0)
    }
  }
  

  date(){
    const currentDate = new Date();

// Get individual components
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
const day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();

// Format date and time
const formattedDateTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
 return formattedDateTime
  }


  resp:any
  addService(){
    if(!this.editData){
      this.post.postService(this.serviceForm.value).subscribe({
        next:(res)=>{
          this.resp=res
         if(this.resp.message=='Campaign Already Exists'){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Campaign Already Exists!",
          });
         }
         else{
          Swal.fire({
            title: "Good job!",
            text: "Service Added Successfully",
            icon: "success"
          });
          this.dialogRef.close("add")
         }
         
       
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
    else{
 this.updateService()
    }
  }

  updateService(){
    this.update.updateService(this.serviceForm.value,this.editData.c_id).subscribe({
      next:(res)=>{
        console.log(res)
        Swal.fire({
          title: "Good job!",
          text: "Service Updated Successfully",
          icon: "success"
        });
      this.dialogRef.close("update")
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

DiD:any
  getAllDiD(){
    this.get.getDid().subscribe({
      next:(res)=>{
     this.DiD=res
     this.DiD=this.DiD.filter((x:any)=>x.status==0)
      },error:(err)=>{
        console.log(err)
      }
    })
  }

  
CrmData:any
getAllCRM(){
  this.get.getDynamicForm().subscribe({
    next:(res)=>{
   this.CrmData=res
    },error:(err)=>{
      console.log(err)
    }
  })
}
 

  toggleAnimation() {
    this.animationState = this.animationState === 'in' ? 'out' : 'in';
  }
}
