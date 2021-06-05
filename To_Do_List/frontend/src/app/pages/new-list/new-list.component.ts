import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
  }

  addNewList(listTitle: string) {
    console.log('>> ', listTitle);

    // return;
    this.taskService.createList(listTitle).subscribe(() => {
      this.router.navigate(['/lists']);
    })
  }
}
