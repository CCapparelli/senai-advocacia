import { AfterViewInit, Component } from '@angular/core';
import { SignupForm } from './signup.form';
import { Router }               from "@angular/router";
import { IForm } from '../../../../model/ui.contracts';
import { ISignup, emptySignup } from '../../../../model/ui';
import { DataServices } from '../../../../services/dataService';
import { ViewUpdater } from '../../../../services/uiServices';
import { emptyUserAuth, emptyUserData } from '../../../../model/user/om';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements IForm<ISignup>, AfterViewInit {
  form  : SignupForm|null = null;
  formContainer: HTMLElement|null = null;

    constructor(
      private dataServices: DataServices,
      private router: Router,
      private view: ViewUpdater
    ) {}
    
    ngAfterViewInit(): void {
      this.formContainer = document.getElementById('divLoginForm');
      this.form = new SignupForm(this);
      this.form.load(emptySignup);
    }
  
    submit(msg: ISignup): void {
      this.register(msg);
    }

register(msg: ISignup) {
  var user = this.dataServices.authenticate(msg.email, msg.password);
  if (user) {
    alert('Usuário/email já cadastrado');
  } else {
    let x = emptyUserData;
    x.email = msg.email;
    x.name = msg.name;

    let y = emptyUserAuth;
    y.email = msg.email;
    y.pass = msg.password;

    this.dataServices.register(x, y);
    this.router.navigate(['/login']);
    alert(`Parabéns, ${msg.name}.\nVocê está cadastrado\nFaça seu login!`);  
  }
}

}
