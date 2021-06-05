import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import List from 'src/app/models/list';
import Task from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[] = [];
  tasks: Task[] = [];
  listId: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists.slice();
      console.log('>> lists', this.lists);
    })


    this.route.params.subscribe((params: Params) => {
      this.listId = params["listId"];

      if (this.listId) {

        this.taskService.getTasks(this.listId).subscribe((tasks: Task[]) => {
          this.tasks = tasks.slice();
          console.log('>> tasks', this.tasks);
        })
      }
    });
  }

  onTaskClick(task: Task) {
    this.taskService.setCompleted(this.listId, task).subscribe(
      () => {
        task.completed = !task.completed;
      }
    )
  }

  deleteTask(task:Task){
    // console.log('>> task',task);
    
    // return;
    // returns the task to be deleted
    this.taskService.deleteTask(this.listId, task._id).subscribe((deletedTask:Task)=>{
      this.tasks = this.tasks.filter(t=>t._id!==deletedTask._id);
    })
  }

  deleteList(list:List){
    console.log('>> l',list);
    
    // return;
    this.taskService.deleteList(list._id).subscribe(()=>{
      this.lists = this.lists.filter((l)=>l._id !== list._id);
    })
  }

}
