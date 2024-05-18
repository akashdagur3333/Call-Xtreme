import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DropdownModelComponent } from 'src/app/Models/dropdown-model/dropdown-model.component';
import { DeleteService } from 'src/app/services/delete.service';
import { GetService } from 'src/app/services/get.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit{


constructor(private dialog:MatDialog,private get:GetService,private deleted:DeleteService){}


ngOnInit(): void {
    this.getAllDropDown()
}
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DropdownModelComponent, {
      width:"70%",
      height:"57%",
      enterAnimationDuration,
      exitAnimationDuration,
      panelClass: 'custom-dialog-class',
    }).afterClosed().subscribe(val=>{
        this.getAllDropDown()
    })
  }


  data:any

  getAllDropDown(){
   this.get.getDropdown().subscribe({
    next:(res)=>{
      this.data=res
      this.data.map((x:any)=>{
        x.data=JSON.parse(x.data)
        console.log(x)
      })
      
    },
    error:(err)=>{
      console.log(err)
    }
   })
  }

  deleteDropdown(id:any){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleted.deleteDropdown(id).subscribe({
          next:(res)=>{
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            this.getAllDropDown()
          },
          error:(err)=>{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err,
            });
          }
        })
      }
    });

  }


  editDropDown(data:any){
    this.dialog.open(DropdownModelComponent, {
      width:"70%",
      height:"57%",
      data:data,
      panelClass: 'custom-dialog-class',
    }).afterClosed().subscribe(val=>{
        this.getAllDropDown()
    })
  }

}
