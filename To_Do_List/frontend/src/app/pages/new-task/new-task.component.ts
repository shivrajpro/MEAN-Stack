import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  listId: string;

  constructor(private taskService:TaskService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.listId = params["listId"];
    })
  }

  addNewTask(taskTitle:string){
    if(this.listId){

      this.taskService.createTask(this.listId, taskTitle).subscribe(()=>{
        this.router.navigate(['../'], {relativeTo:this.route})
      })
    }
  }
}
