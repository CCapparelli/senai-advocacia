import { Router, RouterLink }               from "@angular/router";
import { Component, OnInit }                from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ViewUpdater }                      from '../../../model/model';
import { DataServices }                     from '../../../services/session.services';

@Component({selector: "app-login", 
            imports: [ReactiveFormsModule, RouterLink], 
            templateUrl: "./login.component.html", 
            styleUrl: './login.component.css' })
export class LoginComponent implements OnInit {
  constructor(
    private dataServices: DataServices,
    private router: Router,
    private view: ViewUpdater
  ) {}

  ngOnInit(): void {
    if (this.dataServices.hasData()) {
      this.router.navigate(['/home']);
    }
  }

  formGroup: FormGroup = new FormGroup({
      userName:     new FormControl<string>("", {nonNullable: true,
        validators: [Validators.required, Validators.min(2)],
      }),
      userPassword: new FormControl<string>("", {nonNullable: true,
        validators: [Validators.required, Validators.min(6)],
      }),
  });

  login() {
    if (this.formGroup.invalid) {
      alert('Dados inválidos.');
      return;
    }
    const { userName, userPassword } = this.formGroup.value;
    var user = this.dataServices.findUser(userName, userPassword);
    if (user) {
      this.dataServices.setAsCurrent(user);
      if (user.roles.includes('admin')) {
        this.router.navigate(["/admin"]);
      } else if (user.roles.includes('lawer')) {
        this.router.navigate(["/lawer"]);
      } else if (user.roles.includes('client')) {
        this.router.navigate(["/client"]);
      } else {
        this.router.navigate(['/']);
      }
      this.view.update(user);
    } else {
      alert('Usuário não localizado');
    }
  }

  logout() {
    this.dataServices.endSession();
    this.view.reset();
    this.router.navigate(['/login']);
  }
}
