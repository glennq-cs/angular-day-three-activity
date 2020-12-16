import { GlobalService } from '../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Login} from './login-model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLogged: boolean;

  logins: Login = {
    username: '',
    password: ''
  };

  constructor(
    private service: GlobalService,
    private router: Router) {
    this.isLogged = false;
  }

  ngOnInit(): void {
    this.service.isLogged.subscribe(
      (logged: any) => {
        this.isLogged = logged;
      }
    );

    this.service.checkLogStatus();

    if(this.isLogged) {
      this.router.navigate(['my-profile']);
    }
  }

  onLogin(): void {
    this.service.httpLogin(this.logins);

    this.service.onHttpLogin.subscribe(
      (response: any) => {
        const token = response.token;
        this.service.setToken(token);
        console.log('token from service',this.service.getToken());
        this.router.navigate(['/my-profile']);
      }
    );
    
  }

  onLogout(): void {
    this.service.deleteToken();    
  }
}
