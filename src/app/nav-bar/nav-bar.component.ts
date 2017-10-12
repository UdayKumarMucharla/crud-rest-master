import { Component, OnInit } from '@angular/core';
import {login} from '../Log/login.component'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }
public log : boolean;
  ngOnInit() {
  }
}
