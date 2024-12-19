import { IContactMessage, emptyContactMessage } from "../../../../model/ui";
import { IForm } from "../../../../model/ui.contracts";
import { FloatingForm } from "../../../../services/ui/forms";
import { Html } from "../../../../services/ui/html";

export class OurContactForm {
  private component: IForm<IContactMessage>;

  container: HTMLElement|null;

  constructor(component : IForm<IContactMessage>) {
    this.component = component;
    this.container = component.formContainer;
  }

  load(msg : IContactMessage) { 
    if (!this.container) return;
    this.container.innerHTML = '';

    let form  = Html.append(this.container, 'form', ['app-form','form-floating']);

    FloatingForm.Input('txtName', 'text', 'Nome', msg.senderName, form);
    FloatingForm.Input('txtEmail', 'email', 'Email', msg.senderEmail, form);
    FloatingForm.Input('txtMobile', 'text', 'WhatsApp', msg.senderMobile, form);
    FloatingForm.Input('txtTitle', 'text', 'Assunto', msg.messageTitle, form);
    FloatingForm.Input('txtMessage', 'textArea', 'Mensagem', msg.messageText, form);

    let spaced = Html.append(form, 'div', ['f-jc-e']);
    const btnSubmit = Html.appendType(spaced, 'button', 'button', ['btn', 'btn-primary'], 'Submit');
    btnSubmit.addEventListener('click', () => this.submit());
  }

  submit() {
    let msg = emptyContactMessage;
    msg.senderName = (document.getElementById('txtName') as HTMLInputElement).value;
    msg.senderEmail = (document.getElementById('txtEmail') as HTMLInputElement).value;
    msg.senderMobile = (document.getElementById('txtMobile') as HTMLInputElement).value;
    msg.messageTitle = (document.getElementById('txtTitle') as HTMLInputElement).value;
    msg.messageText = (document.getElementById('txtMessage') as HTMLInputElement).value;
    this.component.submit(msg);
  }
}