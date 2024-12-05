import { Router, }               from "@angular/router";
import { Component }             from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ViewUpdater }           from '../../../../model/model';
import { DataServices }          from '../../../../services/session.services';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(
    private dataServices: DataServices,
    private router: Router,
    private view: ViewUpdater
  ) {}
  formGroup: FormGroup = new FormGroup({
    userName:     new FormControl<string>("", {nonNullable: true,
      validators: [Validators.required, Validators.min(2)],
    }),
    userPassword: new FormControl<string>("", {nonNullable: true,
      validators: [Validators.required, Validators.min(6)],
    }),
});

register() {
  if (this.formGroup.invalid) {
    alert('Dados inválidos.');
    return;
  }
  const { userName, userPassword } = this.formGroup.value;
  var user = this.dataServices.findUser(userName, userPassword);
  if (user) {
    alert('Usuário já cadastrado');
  } else {
    this.dataServices.register(userName, userPassword);
    this.router.navigate(['/login']);
    alert(`Parabéns, ${userName}.\nVocê está cadastrado\nFaça seu login!`);  }
}

}
