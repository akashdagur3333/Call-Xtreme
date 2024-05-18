import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddServiceModelComponent } from 'src/app/Models/add-service-model/add-service-model.component';
import { AddTlComponent } from 'src/app/Models/add-tl/add-tl.component';
import { DeleteService } from 'src/app/services/delete.service';
import { GetService } from 'src/app/services/get.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit{
  displayedColumns: string[] = ['id','camp_name','camp_type','camp_did','create_date','trunk_name','TrunkType','action'];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor(private dialog:MatDialog,private get:GetService,private deletetl:DeleteService){}


ngOnInit(): void {
    this.getAllServices()
}
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddServiceModelComponent, {
      width:"70%",
      enterAnimationDuration,
      exitAnimationDuration,
      panelClass: 'custom-dialog-class',
    }).afterClosed().subscribe(val=>{
        this.getAllServices()

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

  getAllServices(){
   this.get.getService().subscribe({
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

  deleteService(id:any){

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
        this.deletetl.deleteService(id).subscribe({
          next:(res)=>{
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            this.getAllServices()
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


  editService(data:any){
    this.dialog.open(AddServiceModelComponent, {
      width:"70%",
      data:data,
      panelClass: 'custom-dialog-class',
    }).afterClosed().subscribe(val=>{
        this.getAllServices()
    })
  }
}



