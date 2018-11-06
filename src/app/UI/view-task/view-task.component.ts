import { Component, OnInit } from '@angular/core';
import { Task } from '../../Models/task';
import { SharedService } from '../../Services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ChangeDetectionStrategy,  Input} from '@angular/core';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
 
})
export class ViewTaskComponent implements OnInit {
  list: Task[];
  EndedTask: Task;
  ParenTask: Task;
  TaskId: number;
  TaskName: string;
  StartDate: Date;
  EndDate: Date;
  Priority: number;
  obj: any;


  constructor(private route: ActivatedRoute, private router: Router,private _service: SharedService) {
    this.SearchAll();
  }
  ngOnInit() {
    this.SearchAll();
  }

  SearchByTask() {
    if (this.TaskName.length > 0) {
      this.list = this.list.filter(i => i.TaskName.startsWith(this.TaskName));
    }
    else {
      this.SearchAll();
    }
  }
  SearchByPriority() {
    if (this.Priority.toString().length > 0) {
      this.list = this.list.filter(i => i.Priority.toString().startsWith(this.Priority.toString()));
    }
    else {
      this.SearchAll();
    }
  }
  SearchByStartDate() {
   
    if (this.StartDate.toString().length > 0) {
      this.list = this.list.filter(i => i.StartDate == this.StartDate);
    }
    else {
      this.SearchAll();
    }
  }

  SearchByEndDate() {
   
    if (this.EndDate.toString().length > 0) {
      this.list = this.list.filter(i => i.EndDate == this.EndDate);
    }
    else {
      this.SearchAll();
    }
  }

  SearchAll() {
    this._service.GetAll()
      .subscribe(p => this.list = p)
  }

  GetParentTask(id) {
    this.ParenTask = this.list.find(x => x.TaskId === id);
    if (this.ParenTask !== undefined) {
      return this.ParenTask.TaskName;
    }
  }

  EndTask(id)
  {
    this.EndedTask = this.list.find(x => x.TaskId === id);
    if (this.EndedTask !== undefined) {
      this.EndedTask.IsTaskEnded = true;
      this._service.Update(id, this.EndedTask)
      .subscribe(p => {  this._service.GetAll() });
    }
  }

  DeleteTask(id)
  {
    if (confirm('Are you sure to delete this Task ?') == true) {
      this._service.Delete(id)
      .subscribe(()=> {
        this.SearchAll();
    });
    }
  }
 
  Edit(id) {
    this.router.navigate(['/edittask', id]);
  }

}
