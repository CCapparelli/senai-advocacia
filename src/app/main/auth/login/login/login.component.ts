import { Component }      from "@angular/core";
import { Router }         from "@angular/router";
import { of, throwError } from "rxjs";
import { SessaoService }  from "../../sessao.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: './login.component.css',
  styles: [],
  imports: [ReactiveFormsModule],
})

export class LoginComponent {

  formGroup: FormGroup = new FormGroup({
      userName: new FormControl<string>("", {
        nonNullable: true,
        validators: [Validators.required, Validators.min(2)],
      }),
      userPassword: new FormControl<string>("", {
        nonNullable: true,
        validators: [Validators.required, Validators.min(6)],
      }),
  });

  constructor(
    private sessaoService: SessaoService,
    private router: Router
  ) {}

  login() {
    if (this.formGroup.invalid) {
      return;
    }

    const { userName, userPassword } = this.formGroup.value;

    // IMPORTANTE: para facilitar o estudo, utilizamos a lógica abaixo, porém, no
    // mundo real haveria uma chamada à uma service para acionar uma API e validar
    // o usuário e senha.
    
    this.simularChamadaAPI(userName, userPassword)?.subscribe({
      next: (resposta) => {
        this.sessaoService.salvarSessao(resposta);

        const path = localStorage.getItem('pathRequested');
        this.router.navigate([path]);

        const btn = document.getElementById('btn-logout');
        if (btn) {
          btn.style.display = 'block';
        }
      },
      error: (erro) => {
        alert(erro);
        this.formGroup.reset();
      },
    });
  }

  simularChamadaAPI(userName: string, userPassword: string) {
    const isValid   = (userName === "professor" && userPassword === "12345");

    return isValid  ? of({accessToken: "Password", nome: "Professor"})
                    : throwError(() => {
                        const error: any = new Error(`Usuário ou senha inválido`);
                        error.timestamp = Date.now();
                        return error;
                    });
  }
  
}
