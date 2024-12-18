import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnInit, RendererFactory2 } from '@angular/core';
import { IForm } from '../../../../model/ui.contracts';
import { LoginForm } from './login.form';
import { ILogin, emptyLogin } from '../../../../model/ui';
import { DataServices } from '../../../../services/dataService';
import { Router } from '@angular/router';
import { ViewUpdater } from '../../../../services/uiServices';
import { IUserData } from '../../../../model/user/om';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements IForm<ILogin>, OnInit, AfterContentChecked {
  form  : LoginForm|null = null;
  formContainer: HTMLElement|null = null;

  constructor(
    private dataServices: DataServices,
    private router: Router,
    private view: ViewUpdater,
    private rendererFactory: RendererFactory2
  ) {}

  ngOnInit(): void {
    this.rendererFactory.end = () => {
      this.form?.load(emptyLogin);
    }
    if (this.dataServices.hasUser()) {
      this.logout();
    }
    // alert(`init`);
  } 

  ngAfterContentChecked(): void {
    this.formContainer = document.getElementById('divLoginForm');
    (this.formContainer as HTMLInputElement).innerHTML = '';
    this.form = new LoginForm(this);
    this.form.load(emptyLogin);
    // alert(`view init`);
  }

  submit(msg: ILogin): void {
    if (!msg.email || !msg.password)
      alert('Favor preencher todos os campos.')
    else
      this.login(msg);
  }

  login(msg: ILogin) {
    var user = this.dataServices.authenticate(msg.email, msg.password);

    if (user) {
      this.dataServices.setAsCurrent(user);
      this.view.update(user);
      this.route(user);
      this.form?.clear();
      
    } else {
      alert('Usuário não localizado');
    }
  }

  private route(user: IUserData) {
    if (user.roles.includes('admin')) {
      this.router.navigate(["/records"]);

    } else if (user.roles.includes('lawer')) {
      this.router.navigate(["/lawer"]);

    } else if (user.roles.includes('client')) {
      this.router.navigate(["/client"]);

    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.form?.load(emptyLogin);
    this.dataServices.endSession();
    this.view.reset(this.dataServices.currentUser);
    this.form?.clear();
  }
}
