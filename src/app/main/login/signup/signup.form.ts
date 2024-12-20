import { ISignup, emptySignup } from "../../../../model/ui";
import { IForm } from "../../../../model/ui.contracts";
import { FloatingForm } from "../../../../services/ui/forms";
import { Html } from "../../../../services/ui/html";

export class SignupForm {
  private component: IForm<ISignup>;

  container: HTMLElement|null;

  constructor(component : IForm<ISignup>) {
    this.component = component;
    this.container = component.formContainer;
  }

  load(msg : ISignup) { 
    if (!this.container) return;
    this.container.innerHTML = '';

    let form  = Html.append(this.container, 'form', ['form', 'app-form','form-floating', 'log-in']);

    FloatingForm.Input('txtName', 'text', 'Nome', msg.name, form);
    FloatingForm.Input('txtEmail', 'text', 'Email', msg.email, form);
    
    let div1 = Html.append(form, 'div', ['f-sp-b']);
    FloatingForm.Input('txtPass', 'password', 'Senha', msg.password, div1);
    FloatingForm.Input('txtConfirm', 'password', 'Confirme a senha', msg.confirmPassword, div1);
    
    let div2 = Html.append(form, 'div', ['f-sp-b']);
    const btnGoBack   = Html.appendText(div2, 'a', ['discrete'], 'Voltar');
    const btnSubmit = Html.appendText(div2, 'button', ['btn', 'btn-primary'], 'Registrar');
    
    // btnSingup.setAttribute('routerLink','/signup');
    btnGoBack.addEventListener('click', () => this.goBack());    
    btnSubmit.addEventListener('click', () => this.submit());    
  }

  goBack = () => location.href = '/login'

  submit() {
    let msg = emptySignup;
    msg.name = (document.getElementById('txtName') as HTMLInputElement).value;
    msg.email = (document.getElementById('txtEmail') as HTMLInputElement).value;
    msg.password = (document.getElementById('txtPass') as HTMLInputElement).value;
    msg.confirmPassword = (document.getElementById('txtConfirm') as HTMLInputElement).value;
    this.component.submit(msg);
  }
}