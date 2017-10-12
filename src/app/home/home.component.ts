import { Component, OnInit } from '@angular/core';
import {login} from '../Log/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public disp : Boolean;
  ngOnInit() {
  }

}
