import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Injectable()
export class UsersService {
  constructor(private http: Http, private router: Router, private requestoptions: RequestOptions) { }
  getUsers() {
    const URL = "http://10.100.8.127:8081/user/fetchAll";
    return this.http.get(URL).map(
      res => {
        const users = res.json();
        return users;
      }
    );
  }

  getUser(id) {
    const URL = "http://10.100.8.127:8081/user/fetchById/" + id;
    return this.http.get(URL).map(
      res => {
        const user = res.json();
        return user;
      }
    );
  }
  getUserByEmail(email) {

    const URL = "http://10.100.8.127:8081/user/fetchByEmail/" + email + "/email";
    return this.http.get(URL).subscribe((data) => {
      const user = data.json();
      return user;
    });
  }

  addUser(user) {
    const URL = "http://10.100.8.127:8081/user/saveUser";

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', '*');
    headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    let options = new RequestOptions({ headers: headers });
    this.http.post(URL, JSON.stringify(user), options).map(res => {

      if (res.text() == "Success") {
        alert("User Registered successfully");
        return;
      } else {
        alert("This is Email is Already Registerd");
        return false;
      }
    }).subscribe(data => this.router.navigate(["/login"]));
  }

  updateUser(user) {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    const URL = "http://localhost:8081/user/updateUser";
    return this.http.post(URL, user, options).map((response: Response) => { return; });
  }
  getUserLog(){
      const URL = "http://10.100.8.127:8081/log/fetchAll";
    return this.http.get(URL).map(
      res => {
        const logDetails = res.json();
     
        return logDetails;
      }
    );

  }

  delete(user) {
    const URL = "http://10.100.8.127:8081/user/delete/" + user.id;
    return this.http.delete(URL).map(res => { location.reload(); return; });
  }
  private jwt() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}
