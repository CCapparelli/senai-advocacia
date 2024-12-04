import { Router }                          from "@angular/router";
import { SessaoService }                   from '../../sessao.service';
import { Component, OnInit }               from '@angular/core';
import { ViewUpdater, ApiSumulator }       from '../../auth.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ISafeData } from "../../auth.interface";

import { CommonModule } from '@angular/common';

@Component({selector: "app-login", imports: [ReactiveFormsModule, CommonModule], templateUrl: "./login.component.html", styleUrl: './login.component.css' })
export class LoginComponent implements OnInit {
  private data : ISafeData|null;
  username = '';
  password = '';
  errorMessage = '';  
  constructor(
    private sessaoService: SessaoService,
    private router: Router,
    private api: ApiSumulator,
    private view: ViewUpdater
  ) {
    this.data = this.sessaoService.safe.get();
  }

  ngOnInit(): void {
    if (this.data !== null) {
      this.logout();
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
      return;
    }

    const { userName, userPassword } = this.formGroup.value;
    this.api.call(userName, userPassword)?.subscribe({
      next: (response) => {
        this.data = response;
        this.sessaoService.save(response);
        this.view.update(response);
        if (response.roles.includes('admin')) {
          this.router.navigate(["/admin"]);
        } else if (response.roles.includes('lawer')) {
          this.router.navigate(["/lawer"]);
        } else if (response.roles.includes('client')) {
          this.router.navigate(["/client"]);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        alert(error);
        this.view.reset();
        this.formGroup.reset();
      },
    });
  }

  logout() {
    this.data = null;
    this.sessaoService.clear();
    this.view.reset();
    this.router.navigate(['/login']);
  }
}
