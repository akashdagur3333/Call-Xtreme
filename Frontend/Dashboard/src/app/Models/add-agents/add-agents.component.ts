import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { UpdateService } from 'src/app/services/update.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-agents',
  templateUrl: './add-agents.component.html',
  styleUrls: ['./add-agents.component.css']
})
export class AddAgentsComponent implements OnInit{
  fontSize:any={'font-size':'24px'}
  agentForm!:FormGroup
  submit:String='Submit'
  manualDial:boolean=false
  status:boolean=false
  heading:String='Add Agent'
    constructor(private formbuilder:FormBuilder,private get:GetService,private update:UpdateService,private post:PostService,private dialogRef:MatDialogRef<AddAgentsComponent>,@Inject(MAT_DIALOG_DATA) private editdata:any){}
  ngOnInit(): void {
    this.getAllManager()
    this.getAllTL()
    this.getAllService()

      this.agentForm=this.formbuilder.group({
        agent_name:['',Validators.required],
        agent_pwd:['',Validators.required],
        agentType:[],
        mobile_no:[''],
        login_type:[''],
        camp_name:[''],
        employee_code:[''],
        hold_time:[],
        headset:[''],
        Reporting1:[''],
        Reporting2:[''],
        status:this.status==true?1:0,
        mdial_status:this.manualDial==true?1:0
      })

      if(this.editdata){
        this.submit='Update'
        this.heading='Update Agent'
        this.agentForm.controls['agent_name'].setValue(this.editdata.agent_name)
        this.agentForm.controls['agent_pwd'].setValue(this.editdata.agent_pwd)
        this.agentForm.controls['agentType'].setValue(this.editdata.agentType)
        this.agentForm.controls['mobile_no'].setValue(this.editdata.mobile_no)
        this.agentForm.controls['login_type'].setValue(this.editdata.login_type)
        this.agentForm.controls['camp_name'].setValue(this.editdata.camp_name)
        this.agentForm.controls['employee_code'].setValue(this.editdata.employee_code)
        this.agentForm.controls['hold_time'].setValue(this.editdata.hold_time)
        this.agentForm.controls['headset'].setValue(this.editdata.headset)
        this.agentForm.controls['Reporting1'].setValue(this.editdata.Reporting1)
        this.agentForm.controls['Reporting2'].setValue(this.editdata.Reporting2)
        this.agentForm.controls['status'].setValue(this.editdata.hold_time)
        this.agentForm.controls['mdial_status'].setValue(this.editdata.hold_time)

      }

  }
  addAgent(){
    if(!this.editdata){
      this.post.postAgent(this.agentForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          Swal.fire({
            title: "Good job!",
            text: "Agent Added Successfully",
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
      this.updateAgent()
    }
  }

  updateAgent(){
    this.update.updateAgent(this.agentForm.value,this.editdata.agent_id).subscribe({
      next:(res)=>{
        console.log(res)
        Swal.fire({
          title: "Good job!",
          text: "Agent Updated Successfully",
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

  tl:any
  getAllTL(){
    this.get.getTl().subscribe({
     next:(res)=>{
       this.tl=res
      
     },
     error:(err)=>{
       console.log(err)
     }
    })
   }


   manager:any
   
   getAllManager(){
    this.get.getManager().subscribe({
     next:(res)=>{
       this.manager=res
     
     },
     error:(err)=>{
       console.log(err)
     }
    })
   }

   service:any
   getAllService(){
    this.get.getService().subscribe({
      next:(res)=>{
        this.service=res
      
      },
      error:(err)=>{
        console.log(err)
      }
     })
   }

    camp:any
   CampaignType(event:Event){
    const value = (event.target as HTMLInputElement).value;
    this.camp=this.service.filter((x:any)=>x.camp_type==value)
   }








}
