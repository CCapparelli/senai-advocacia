import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ILogin, emptyLogin } from '../../../data/model/entities/omRoot';
import { IForm } from '../../../data/model/guiOM';
import { LoginForm } from './login.form';
import { Router }               from "@angular/router";
import { DataServices }                     from '../../../../services/session.services';
import { ViewUpdater }                      from '../../../../model/model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements IForm<ILogin>, OnInit, AfterViewInit {
  form  : LoginForm|null = null;
  formContainer: HTMLElement|null = null;
  
  constructor(
    private dataServices: DataServices,
    private router: Router,
    private view: ViewUpdater
  ) {}

  ngOnInit(): void {
    if (this.dataServices.hasUser()) {
      this.logout();
    }
  } 

  ngAfterViewInit(): void {
    this.formContainer = document.getElementById('divLoginForm');
    this.form = new LoginForm(this);
    this.form.load(emptyLogin);
  }

  submit(msg: ILogin): void {
    this.login(msg);
  }

  login(msg: ILogin) {
    var user = this.dataServices.findUser(msg.email, msg.password);
    if (user) {
      // this.dataServices.setAsCurrent(user);
      if (user.roles.includes('admin')) {
        // this.router.navigate(["/admin"]);
        this.router.navigate(["/dashboard"]);
      } else if (user.roles.includes('lawer')) {
        // this.router.navigate(["/lawer"]);
        this.router.navigate(["/meetings"]);
      } else if (user.roles.includes('client')) {
        // this.router.navigate(["/client"]);
        this.router.navigate(["/reports"]);
      } else {
        this.router.navigate(['/']);
      }
      this.view.update(user);
    } else {
      alert('Usuário não localizado');
    }
  }

  logout() {
    this.form?.load(emptyLogin);
    this.dataServices.endSession();
    this.router.navigate(['/']);
    this.view.reset(this.dataServices.currentUser);
  }
}
