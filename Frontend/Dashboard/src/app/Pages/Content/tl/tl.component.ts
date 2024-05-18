import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddTlComponent } from 'src/app/Models/add-tl/add-tl.component';
import { DeleteService } from 'src/app/services/delete.service';
import { GetService } from 'src/app/services/get.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tl',
  templateUrl: './tl.component.html',
  styleUrls: ['./tl.component.css']
})
export class TlComponent implements OnInit{
  displayedColumns: string[] = ['id','tl_name','tl_email','tl_password','tl_description','action'];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor(private dialog:MatDialog,private get:GetService,private deletetl:DeleteService){}


ngOnInit(): void {
    this.getAllTL()
}
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddTlComponent, {
      width:"70%",
      enterAnimationDuration,
      exitAnimationDuration,
      panelClass: 'custom-dialog-class',
    }).afterClosed().subscribe(val=>{
      if(val=='add'){
        this.getAllTL()
      }
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

  getAllTL(){
   this.get.getTl().subscribe({
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

  deleteTL(id:any){

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
        this.deletetl.deleteTl(id).subscribe({
          next:(res)=>{
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            this.getAllTL()
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

  editTL(data:any){
    this.dialog.open(AddTlComponent, {
      width:"70%",
      panelClass: 'custom-dialog-class',
      data:data
    }).afterClosed().subscribe(val=>{
     
        this.getAllTL()
      
    })
  }

}



