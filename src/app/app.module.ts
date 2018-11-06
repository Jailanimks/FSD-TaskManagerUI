import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './UI/add-task/add-task.component';
import { ViewTaskComponent } from './UI/view-task/view-task.component';
import { EditTaskComponent } from './UI/edit-task/edit-task.component';
import { appRoutes} from './app.routing';
import { SharedService } from './Services/shared.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ViewTaskComponent,
    EditTaskComponent
    
  ],
  imports: [
    BrowserModule,HttpModule,FormsModule,ReactiveFormsModule,Http,HttpClientTestingModule,HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
