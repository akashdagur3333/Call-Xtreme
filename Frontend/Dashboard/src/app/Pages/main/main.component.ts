import { Component, OnInit } from '@angular/core';
import { LoadScriptService } from 'src/app/services/load-script.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  Toggle:String=''
  constructor(private script:LoadScriptService){}
  ngOnInit(): void {
      this.script.loadScript([
        '../assets/js/bootstrap.bundle.min.js',
        '../assets/js/jquery.min.js',
        '../assets/plugins/simplebar/js/simplebar.min.js',
        '../assets/plugins/metismenu/js/metisMenu.min.js',
        '../assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js',
        // '../assets/plugins/apexcharts-bundle/js/apexcharts.min.js',
        // '../assets/plugins/datatable/js/jquery.dataTables.min.js',
        // '../assets/plugins/datatable/js/dataTables.bootstrap5.min.js',
        '../assets/js/index.js',
        '../assets/js/app.js'
      ])
      
  }

Togle(event:string){
event=='1'?this.Toggle='wrapper toggled':this.Toggle='wrapper'
}

}
