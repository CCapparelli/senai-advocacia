import { IForm } from "../../../data/model/guiOM";
import { DOM } from '../../../dom/html';
import { FloatingForm } from '../../../dom/forms';
import { ILogin, emptyLogin } from "../../../data/model/entities/omRoot";

export class LoginForm {
  private component: IForm<ILogin>;

  container: HTMLElement|null;

  constructor(component : IForm<ILogin>) {
    this.component = component;
    this.container = component.formContainer;
  }

  load(msg : ILogin) { 
    if (!this.container) return;
    this.container.innerHTML = '';

    let form  = DOM.append(this.container, 'form', ['form', 'app-form','form-floating', 'log-in']);

    FloatingForm.Input('txtEmail', 'text', 'Email', msg.email, form);
    FloatingForm.Input('txtPass', 'password', 'Senha', msg.password, form);
    
    let div = DOM.append(form, 'div', ['f-sp-b']);
    const btnSingup = DOM.appendText(div, 'a', ['discrete'], 'Registre-se');
    const btnSubmit = DOM.appendText(div, 'button', ['btn', 'btn-primary'], 'Login');
    
    // btnSingup.setAttribute('routerLink','/signup');
    btnSingup.addEventListener('click', () => this.signup());    
    btnSubmit.addEventListener('click', () => this.submit());    
  }

  signup = () => location.href = '/signup'

  submit() {
    let msg = emptyLogin;
    msg.email = (document.getElementById('txtEmail') as HTMLInputElement).value;
    msg.password = (document.getElementById('txtPass') as HTMLInputElement).value;
    this.component.submit(msg);
  }
}