import { AfterViewInit, Component } from '@angular/core';
import { ISignup, emptySignup } from '../../../data/model/entities/omRoot';
import { IForm } from '../../../data/model/guiOM';
import { SignupForm } from './signup.form';
import { Router }               from "@angular/router";
import { DataServices }                     from '../../../../services/session.services';
import { ViewUpdater }                      from '../../../../model/model';

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
  var user = this.dataServices.findUser(msg.email, msg.password);
  if (user) {
    alert('Usuário já cadastrado');
  } else {
    this.dataServices.register(msg.name, msg.password);
    this.router.navigate(['/login']);
    alert(`Parabéns, ${msg.name}.\nVocê está cadastrado\nFaça seu login!`);  }
}

}
