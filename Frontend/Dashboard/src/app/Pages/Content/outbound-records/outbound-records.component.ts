import { Component, OnInit, ViewChild } from '@angular/core';
import { GetService } from 'src/app/services/get.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-outbound-records',
  templateUrl: './outbound-records.component.html',
  styleUrls: ['./outbound-records.component.css'],
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
export class OutboundRecordsComponent implements OnInit{


  displayedColumns: string[] = ['id','tl_name','tl_email','tl_password','tl_description','action'];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isExport:boolean=false
  animationState = 'in';
  fontSize:any={'font-size':'15px'}
  constructor(private get:GetService){}
  ngOnInit(): void {
      this.getReport()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getReport(){
   this.get.getReport().subscribe({
    next:(res)=>{
      console.log(res)
    },error:(err)=>{
      console.log(err)
    }
   })
   }

   checkExport(){
    this.isExport=!this.isExport
    if(this.isExport==true){
      this.toggleAnimation()
    }
  }

    toggleAnimation() {
      this.animationState = this.animationState === 'in' ? 'out' : 'in';
    }
  }
 

