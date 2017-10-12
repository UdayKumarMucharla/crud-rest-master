import { Component, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicValidators } from './../shared/basic-validators';
import { UsersService } from '../users/shared/users.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    outputs: ['childEvent']


})

export class login {
    constructor(private router: Router, private http: Http, private usersService: UsersService) {
    }
    public email;
    public pswd;
    model: any = {};
    public isLogin: String;
    log() {
        const URL = "http://10.100.8.127:8081/user/Login/" + this.email + "/" + this.pswd;
        this.http.get(URL).map(res => {
            this.isLogin = res.text();
            this.logvalidate();
             return res;
        }).subscribe(data => this.isLogin);
    }
    logvalidate(){
          if (this.isLogin == 'true') {
            this.router.navigate(['/']);
        } else {
            alert("Invali UserName or Password");
            this.router.navigate(['/login']);
            this.reset();
        }
    }

    reset() {
        this.email = "";
        this.pswd = "";
    }



}