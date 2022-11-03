import { Component, Input, OnInit } from '@angular/core';
import { contact } from 'src/app/app.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() contact: contact

  constructor() { }

  ngOnInit(): void {
    console.log(this.contact)
  }

}
