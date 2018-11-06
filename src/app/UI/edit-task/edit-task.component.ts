import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Task } from '../../Models/task';
import { SharedService } from '../../Services/shared.service';
import { Jsonp } from '../../../../node_modules/@angular/http';
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  item: Task;
  list: Task[];
  objTask:any;
  sdate: Date;
  dt:string;
  id: number;  
  obj: any;
  selectedTask: Task;
  error:any={isError:false,errorMessage:''};
  constructor(private route: ActivatedRoute, private router: Router, private _service:SharedService) { 

    if (this.route.snapshot.params["id"]) {  

      this.id = this.route.snapshot.params["id"];  
    }
  }

   ngOnInit() {

    this._service.GetAll()
    .subscribe(p => this.list = p)

    if (this.id > 0) {  
     
      
      this.route.params.subscribe(params => {
        this.objTask = this._service.GetById(params['id']).subscribe(res => {
          this.objTask = res;
        });
      });
      }  

   }

   Update() {

    
     this.item = new Task();
     this.item = this.objTask;
     if (this.selectedTask !== undefined) {
      this.item.ParentTaskId= this.selectedTask.TaskId;
     }
     this._service.Update(this.id, this.objTask)
     .subscribe(p => this.obj = p);
     this.router.navigate(['/viewtask']);
   }

    Cancel() {
      this.router.navigate(['/viewtask']);
    }
  
  compareTwoDates(){
    if(new Date(this.objTask.EndDate) < new Date(this.objTask.StartDate)){
       this.error={isError:true,errorMessage:'End Date cannot before start date'};
    }
    else
    {
     this.error={isError:false,errorMessage:''};
    }
 }
  

}
