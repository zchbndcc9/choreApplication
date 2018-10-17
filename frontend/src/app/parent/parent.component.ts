import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  tasks: any;
  members: any;
  constructor() { }

  ngOnInit() {
    this.tasks = [
      {id: 1, name: 'Mow the lawn', member: 'Jimbo', status: 'In Progress'},
      {id: 2, name: 'Take out the trash', member: 'Janette', status: 'Completed'},
      {id: 3, name: 'Run errands', member: 'Jimbo' , status: 'Pending verification' },
      {id: 4, name: 'Walk the dogs', member: 'Jimbo', status: 'Completed'}
    ];

    this.members = [
      {id: 1, name: 'John', type: 'Parent'},
      {id: 2, name: 'Jane', type: 'Parent'},
      {id: 3, name: 'Jimbo', type: 'Child'},
      {id: 4, name: 'Janette', type: 'Child'}
    ];
  }

}
