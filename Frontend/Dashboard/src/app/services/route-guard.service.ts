import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {
  constructor(public router:Router) { }

  public isAuthenticated():boolean{
    const token =localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/']);
      localStorage.clear()
      return false;
    }
    else{
      return true;
    }
  }

  canActivate(route:ActivatedRouteSnapshot):boolean{
    if(this.isAuthenticated()){
      return true
    }
    return false
  //  let expectedRoleArray=route.data;
  //  expectedRoleArray=expectedRoleArray['expectedRole'];
// const token:any=localStorage.getItem('token');
//    var tokenPayload:any;
 
   //check token

  //  try{
  //    tokenPayload=jwtDecode(token);
  //  }
  //  catch(err){
  //   localStorage.clear();
  //   this.router.navigate(['/']);
  //  }

   //console.log(tokenPayload.role)
   //check role
  //  let checkRole=false;


  //  for(let i=0;i<=expectedRoleArray['length'];i++){
  //   if(expectedRoleArray[i]==tokenPayload.role){
  //     checkRole=true;
  //   }
  //  }

//    if(tokenPayload.role =='user' || tokenPayload.role=='admin' || tokenPayload.role=='hr' || tokenPayload.role=='technical' || tokenPayload.role=='nadmin'){
//     if(this.isAuthenticated()){
//       return true;
//     }
//     this.router.navigate(['/home']);
//     return false;
//    }
//  else{
//   this.router.navigate(['/']);
//   localStorage.clear();
//   return false;
//  }
  }
}