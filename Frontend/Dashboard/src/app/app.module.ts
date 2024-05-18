import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './Pages/main/main.component';
import { SwitcherComponent } from './Components/switcher/switcher.component';
import { MainContentComponent } from './Pages/Content/main-content/main-content.component';
import { DynamicFormComponent } from './Pages/Content/dynamic-form/dynamic-form.component';
import { InputComponent } from './Component/input/input.component';
import { LoaderComponent } from './Components/loader/loader.component';
import { ClockComponent } from './Components/clock/clock.component';
import { ServicesComponent } from './Pages/Content/services/services.component';
import { AddServiceModelComponent } from './Models/add-service-model/add-service-model.component';
import { AddBreakModelComponent } from './Models/add-break-model/add-break-model.component';
import { AddScriptModelComponent } from './Models/add-script-model/add-script-model.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { CloseButtonComponent } from './Component/close-button/close-button.component';
import { SubmitButtonComponent } from './Component/submit-button/submit-button.component';
import { BreakComponent } from './Pages/Content/break/break.component';
import { ScriptComponent } from './Pages/Content/script/script.component';
import { LiveAgentsComponent } from './Pages/Content/live-agents/live-agents.component';
import { AddDispositionModelComponent } from './Models/add-disposition-model/add-disposition-model.component';
import { DispositionComponent } from './Pages/Content/disposition/disposition.component';
import { DNIComponent } from './Pages/Content/dni/dni.component';
import { GreenButtonComponent } from './Component/green-button/green-button.component';
import { OutboundRecordsComponent } from './Pages/Content/outbound-records/outbound-records.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TlComponent } from './Pages/Content/tl/tl.component';
import { ManagerComponent } from './Pages/Content/manager/manager.component';
import { AddTlComponent } from './Models/add-tl/add-tl.component';
import { AddManagerComponent } from './Models/add-manager/add-manager.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { SingleDIDModelComponent } from './Models/single-didmodel/single-didmodel.component';
import { RangeDiDModelComponent } from './Models/range-di-dmodel/range-di-dmodel.component';
import { DropdownComponent } from './Pages/Content/dropdown/dropdown.component';
import { DropdownModelComponent } from './Models/dropdown-model/dropdown-model.component';
import { DynamicFormModelComponent } from './Models/dynamic-form-model/dynamic-form-model.component';
import { IvrFileComponent } from './Pages/Content/ivr-file/ivr-file.component';
import { IvrFileModelComponent } from './Models/ivr-file-model/ivr-file-model.component';
import { TokenInterceptor } from './token.interceptor';
import { AgentComponent } from './Pages/Content/agent/agent.component';
import { AddAgentsComponent } from './Models/add-agents/add-agents.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    MainComponent,
    SwitcherComponent,
    MainContentComponent,
    DynamicFormComponent,
    InputComponent,
    LoaderComponent,
    ClockComponent,
    ServicesComponent,
    AddServiceModelComponent,
    AddBreakModelComponent,
    AddScriptModelComponent,
    CloseButtonComponent,
    SubmitButtonComponent,
    BreakComponent,
    ScriptComponent,
    LiveAgentsComponent,
    AddDispositionModelComponent,
    DispositionComponent,

    DNIComponent,
     GreenButtonComponent,
     OutboundRecordsComponent,
     TlComponent,
     ManagerComponent,
     AddTlComponent,
     AddManagerComponent,
     SingleDIDModelComponent,
     RangeDiDModelComponent,
     DropdownComponent,
     DropdownModelComponent,
     DynamicFormModelComponent,
     IvrFileComponent,
     IvrFileModelComponent,
     AgentComponent,
     AddAgentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [HttpClientModule, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
