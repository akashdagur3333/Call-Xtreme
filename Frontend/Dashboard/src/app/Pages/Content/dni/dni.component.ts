import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddManagerComponent } from 'src/app/Models/add-manager/add-manager.component';
import { AddTlComponent } from 'src/app/Models/add-tl/add-tl.component';
import { RangeDiDModelComponent } from 'src/app/Models/range-di-dmodel/range-di-dmodel.component';
import { SingleDIDModelComponent } from 'src/app/Models/single-didmodel/single-didmodel.component';
import { DeleteService } from 'src/app/services/delete.service';
import { GetService } from 'src/app/services/get.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dni',
  templateUrl: './dni.component.html',
  styleUrls: ['./dni.component.css']
})
export class DNIComponent implements OnInit{
  displayedColumns: string[] = ['id','did','campaign_name','status'];
  displayedColumns1: string[] = ['id','did','status'];
  displayedColumns2: string[] = ['id','did','status','action'];  
  dataSource!: MatTableDataSource<any>;
  dataSource1!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;




  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


constructor(private dialog:MatDialog,private get:GetService,private deletetl:DeleteService){}


ngOnInit(): void {
    this.getAllDid()
}
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SingleDIDModelComponent, {
      width:"70%",
      enterAnimationDuration,
      exitAnimationDuration,
      panelClass: 'custom-dialog-class',
    }).afterClosed().subscribe(val=>{
      if(val=='add'){
        this.getAllDid()
      }
    })
  }

  openDialog1(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(RangeDiDModelComponent, {
      width:"70%",
      enterAnimationDuration,
      exitAnimationDuration,
      panelClass: 'custom-dialog-class',
    }).afterClosed().subscribe(val=>{
      if(val=='add'){
        this.getAllDid()
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
  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }
  data:any

  getAllDid(){
   this.get.getDid().subscribe({
    next:(res)=>{
      this.data=res
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort =this.sort;
      this.dataSource1 = new MatTableDataSource(this.data);
      this.dataSource1.paginator= this.paginator;
      this.dataSource1.sort =this.sort;
      this.dataSource2 = new MatTableDataSource(this.data);
      this.dataSource2.paginator= this.paginator;
      this.dataSource2.sort =this.sort;
    },
    error:(err)=>{
      console.log(err)
    }
   })
  }

  deleteDiD(id:any){

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
        this.deletetl.deleteDid(id).subscribe({
          next:(res)=>{
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            this.getAllDid()
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



