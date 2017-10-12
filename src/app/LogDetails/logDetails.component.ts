import {Component , OnInit} from '@angular/core';
import {UsersService} from "../users/shared/users.service";
import {User} from "../users/shared/user";

@Component({
  selector: 'app-logDetails',
  templateUrl: './logDetails.component.html',
  styleUrls: ['./logDetails.component.css']
})


export class logDetails implements OnInit{




  private logDetails: logDetails[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUserLog()
      .subscribe(data => this.logDetails = data);
  }


}