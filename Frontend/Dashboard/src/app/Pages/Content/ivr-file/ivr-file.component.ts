import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddTlComponent } from 'src/app/Models/add-tl/add-tl.component';
import { IvrFileModelComponent } from 'src/app/Models/ivr-file-model/ivr-file-model.component';
import { DeleteService } from 'src/app/services/delete.service';
import { GetService } from 'src/app/services/get.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ivr-file',
  templateUrl: './ivr-file.component.html',
  styleUrls: ['./ivr-file.component.css']
})
export class IvrFileComponent implements OnInit{
  displayedColumns: string[] = ['id','file_name','date'];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor(private dialog:MatDialog,private get:GetService,private deletetl:DeleteService){}


ngOnInit(): void {
    this.getIvrFile()
}
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(IvrFileModelComponent, {
      width:"70%",
      enterAnimationDuration,
      exitAnimationDuration,
      panelClass: 'custom-dialog-class',
    }).afterClosed().subscribe(val=>{
      if(val=='add'){
        this.getIvrFile()
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

  getIvrFile(){
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


}




