import { SharedService } from './shared.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Task } from '../Models/task';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('Task Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpModule],
      providers: [SharedService]
    });
  });
  
  it('should be created', inject([SharedService], (service: SharedService) => {
    expect(service.GetAll()).toBeTruthy();
  }));
});


describe('Task Service', () => {
  let injector;
  let service: SharedService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpModule],
      providers: [SharedService]
    });

    injector = getTestBed();
    service = injector.get(SharedService);
    httpMock = injector.get(HttpTestingController);
  });


    it('should get all Tasks', () => {

      const task = {
            TaskId : 1,
            TaskName: 'Analysis',
            ParentTaskId: null,
            StartDate: '9/21/2018',
            EndDate: '11/21/2018',
            Priority: 5,
            IsTaskEnded: false
          };

      service.GetAll().subscribe(tasks => {
        expect(tasks[0].TaskId).toBe(task.TaskId);
        expect(tasks[0].TaskName).toEqual(task.TaskName);
   
      });
     

    });


    it('should fetch a single task entry by a Taskid', () => {

      const task = {
            TaskId : 1,
            TaskName: 'Analysis',
            ParentTaskId: null,
            StartDate: '9/21/2018',
            EndDate: '11/21/2018',
            Priority: 5,
            IsTaskEnded: false
          };

      service.GetById(1).subscribe(tasks => {
        expect(tasks.TaskId).toBe(task.TaskId);
        expect(tasks.TaskName).toEqual(task.TaskName);
      
      });
     
    });



    it('should insert new task entry', () => {

      const task = {
            TaskId : 1,
            TaskName: 'Analysis',
            ParentTaskId: null,
            StartDate: '9/21/2018',
            EndDate: '11/21/2018',
            Priority: 5,
            IsTaskEnded: false
          };

          let data: Task = new Task();
      
          data.TaskName ='Test1';
          data.ParentTaskId = 5;
          data.Priority = 5;
          data.StartDate = new Date('8/25/2018');
          data.EndDate = new Date('9/26/2018');
          data.IsTaskEnded = false;

      service.Add(data).subscribe( p =>
        service.GetAllTasks().subscribe(
                  (data) => {
                    expect(data[data.length-1].TaskName).toEqual('Test1');
                    expect(data[data.length-1].ParentTaskId).toEqual(5);
                    expect(data[data.length-1].Priority).toEqual(5);
                }));
       
      });
    


      it('should save updates to an existing Task entry', () => {

        const task = {
              TaskId : 3,
              TaskName: 'Development',
              ParentTaskId: 1,
              StartDate: '9/21/2018',
              EndDate: '02/15/2019',
              Priority: 5,
              IsTaskEnded: true
            };
  
            let data: Task = new Task();
            data.TaskId = 3;
            data.TaskName ='Development';
            data.ParentTaskId = 1;
            data.Priority = 5;
            data.StartDate = new Date('9/21/2018');
            data.EndDate = new Date('02/15/2019');
            data.IsTaskEnded = true;
  
        service.Update(data.TaskId,data).subscribe( p =>
          service.GetById(3).subscribe(tasks => {
                   expect(tasks.TaskId).toBe(task.TaskId);
                   expect(tasks.TaskName).toEqual(task.TaskName);
                   expect(tasks.ParentTaskId).toEqual(task.ParentTaskId);
                  }));
         
        });
    

        it('should delete an existing Task entry', () => {
          service.Delete(13).subscribe( p =>
            service.GetById(13).subscribe(tasks => {
                    expect(tasks).toBeUndefined();
                    //  expect(tasks.TaskId).toBe(task.TaskId);
                    //  expect(tasks.TaskName).toEqual(task.TaskName);
                    //  expect(tasks.ParentTaskId).toEqual(task.ParentTaskId);
                    }));
           
          });

  });
