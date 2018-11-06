import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Services/shared.service';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Task } from '../../Models/task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  item: Task;
  list: Task[];
  TaskId: number;
  ParentTaskId:number;
  TaskName: string;
  StartDate: Date;
  EndDate: Date;
  Priority: number;
  obj: any;
  selectedTask: Task;

  taskForm: FormGroup;
  error:any={isError:false,errorMessage:''};

  constructor(private _service: SharedService, private router: Router) {
   }


  ngOnInit() {
    this._service.GetAll()
      .subscribe(p => this.list = p)
  }


  onTaskChange()
  {
    //alert(JSON.stringify(this.selectedTask.TaskId));
  }

  Add() {

   
    this.item = new Task();
    this.item.TaskName = this.TaskName;
    if (this.selectedTask !== undefined) {
      this.item.ParentTaskId = this.selectedTask.TaskId;
    }
    this.item.Priority = this.Priority;
    this.item.StartDate = this.StartDate;
    this.item.EndDate = this.EndDate;
     this._service.Add(this.item)
      .subscribe(p => this.obj = p);
    this.router.navigate(['viewtask']);
        
    }

  Cancel() {
    this.TaskName = "";
    this.selectedTask = undefined;
    this.Priority = 2;
    this.StartDate = null;
    this.EndDate = null;
  }

compareTwoDates(){
   if(new Date(this.EndDate) < new Date(this.StartDate)){
      this.error={isError:true,errorMessage:'End Date cannot before start date'};
   }
   else
   {
    this.error={isError:false,errorMessage:''};
   }
}

}
