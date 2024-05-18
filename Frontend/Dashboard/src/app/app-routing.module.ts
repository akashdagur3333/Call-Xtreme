import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { MainComponent } from './Pages/main/main.component';
import { MainContentComponent } from './Pages/Content/main-content/main-content.component';
import { DynamicFormComponent } from './Pages/Content/dynamic-form/dynamic-form.component';
import { ServicesComponent } from './Pages/Content/services/services.component';
import { BreakComponent } from './Pages/Content/break/break.component';
import { ScriptComponent } from './Pages/Content/script/script.component';
import { AddDispositionModelComponent } from './Models/add-disposition-model/add-disposition-model.component';
import { DispositionComponent } from './Pages/Content/disposition/disposition.component';
import { LiveAgentsComponent } from './Pages/Content/live-agents/live-agents.component';
import { DNIComponent } from './Pages/Content/dni/dni.component';
import { OutboundRecordsComponent } from './Pages/Content/outbound-records/outbound-records.component';
import { RouteGuardService } from './services/route-guard.service';
import { TlComponent } from './Pages/Content/tl/tl.component';
import { ManagerComponent } from './Pages/Content/manager/manager.component';
import { DropdownComponent } from './Pages/Content/dropdown/dropdown.component';
import { IvrFileComponent } from './Pages/Content/ivr-file/ivr-file.component';
import { AgentComponent } from './Pages/Content/agent/agent.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full',
  },
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full',

  },
  {
    path:'index',
    component:MainComponent,
    canActivate:[RouteGuardService],
    children:[
      {
        path:'',
        component:ServicesComponent,
        pathMatch:'full',
        canActivate:[RouteGuardService],

      },
      {
        path:'dynamicForm',
        component:DynamicFormComponent,
        pathMatch:'full',
        // canActivate:[RouteGuardService],

      },
      {
        path:'service',
        component:ServicesComponent,
        pathMatch:'full',
        canActivate:[RouteGuardService],

      },
      {
        path:'break',
        component:BreakComponent,
        pathMatch:'full',
        canActivate:[RouteGuardService],

      },
      {
        path:'script',
        component:ScriptComponent,
        pathMatch:'full',
        canActivate:[RouteGuardService],

      },
      {
        path:'disposition',
        component:DispositionComponent,
        pathMatch:'full',
        canActivate:[RouteGuardService],

      },
      {
        path:'liveAgent',
        component:LiveAgentsComponent,
        pathMatch:'full',
        canActivate:[RouteGuardService],

      },
      {
        path:'dni',
        component:DNIComponent,
        pathMatch:'full',
        canActivate:[RouteGuardService],
      },
      {
        path:'outboundRecords',
        component:OutboundRecordsComponent,
        pathMatch:'full',
        canActivate:[RouteGuardService],

      },
      {
        path:'tl',
        component:TlComponent,
        pathMatch:'full',
        canActivate:[RouteGuardService],
      },
      {
        path:'manager',
        component:ManagerComponent,
        pathMatch:'full',
        canActivate:[RouteGuardService],

      },
      {
        path:'dropdown',
        component:DropdownComponent,
        pathMatch:'full',
        canActivate:[RouteGuardService],

      },
      {
        path:'ivr',
        component:IvrFileComponent,
        pathMatch:'full',
        canActivate:[RouteGuardService],

      },
      {
        path:'agent',
        component:AgentComponent,
        pathMatch:'full',
        canActivate:[RouteGuardService],

      },
    ]
  },
  {
path:'**',
redirectTo:'login',
pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
