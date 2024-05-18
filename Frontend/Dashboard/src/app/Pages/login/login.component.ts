import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  crediateils:any={email:'admin',password:'admin'}

   
  
  constructor(private formbuilder:FormBuilder,private route:Router,private api:LoginService){
  }


  ngOnInit(): void {
   localStorage.clear()
  }
   log:({email:string,password:string})={
    email:'',
    password:''
  }


authentication!:any
  login(){
    this.api.login(this.log).subscribe(
      {
        next:(res)=>{
       this.authentication=res
       if(this.authentication.message=='login Successfully'){
       localStorage.setItem('token',this.authentication.token)
        Swal.fire({
          title: "Good job!",
          text: this.authentication.message,
          icon: "success"
        });
        this.route.navigate(['index'])
       }
      else if(this.authentication.message=='Admin have multiple account'){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: this.authentication.message
        });
        }
       else if(this.authentication.message=='Password not Match'){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: this.authentication.message
        });
          }
         else{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: this.authentication.message
          });
            }
      
         
        },
        error:(err)=>{
          console.log(err)
        }
      })
    //  if(this.log.email==this.crediateils.email && this.log.password==this.crediateils.password){
    //   this.route.navigate(['index'])
    //  }
  }

}
