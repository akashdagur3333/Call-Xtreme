import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddManagerComponent } from 'src/app/Models/add-manager/add-manager.component';
import { AddTlComponent } from 'src/app/Models/add-tl/add-tl.component';
import { DynamicFormModelComponent } from 'src/app/Models/dynamic-form-model/dynamic-form-model.component';
import { DeleteService } from 'src/app/services/delete.service';
import { GetService } from 'src/app/services/get.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit{
  displayedColumns: string[] = ['id','formName','action'];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor(private dialog:MatDialog,private get:GetService,private deletetl:DeleteService){}


ngOnInit(): void {
    this.getAllDynamicForm()
}
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DynamicFormModelComponent, {
      width:"70%",
      height:"53%",
      enterAnimationDuration,
      exitAnimationDuration,
      panelClass: 'custom-dialog-class',
    }).afterClosed().subscribe(val=>{
      
        this.getAllDynamicForm()
      
    })
  }

  editDynamicForm(data:any){
    this.dialog.open(DynamicFormModelComponent, {
      width:"70%",
      height:"53%",
     data:data,
      panelClass: 'custom-dialog-class',
    }).afterClosed().subscribe(val=>{
      
        this.getAllDynamicForm()
      
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  data:any

  getAllDynamicForm(){
   this.get.getDynamicForm().subscribe({
    next:(res)=>{
      this.data=res
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort =this.sort;
    },
    error:(err)=>{
      console.log(err)
    }
   })
  }

  deleteDynamicModel(id:any){

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
        this.deletetl.deleteDynamicForm(id).subscribe({
          next:(res)=>{
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            this.getAllDynamicForm()
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
}




