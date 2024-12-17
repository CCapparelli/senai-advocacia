import { FloatingForm } from "../../services/ui/forms";
import { Html } from "../../services/ui/html";
import { Address } from "../shared";
import { IModal } from "../ui.contracts";
import { IUserData } from "./om";


export class UserModalManager {
    private parent: IModal<IUserData>;
    
    constructor(parent : IModal<IUserData>) {
        this.parent = parent;
        this.init();
    }

    init() {
        if (!this.parent.modalContainer) return;

        this.parent.modalContainer.innerHTML = '';

        let dialog  = Html.append(this.parent.modalContainer, 'div', ['modal-dialog', 'dark']);
        let content = Html.append(dialog, 'div', ['modal-content']);

        let header = Html.append(content, 'div', ['modal-header']);
        let body   = Html.append(content, 'div', ['modal-body']);
        let footer = Html.append(content, 'div', ['modal-footer']);
        let spaced = Html.append(footer, 'div', ['f-sp-b']);

        // const title = (parent.current[0] === '') ? 'Novo' : 'Edição';
        const title = 'Modal';
        Html.appendText(header, 'h4', ['modal-title'], title);
       
        const btnX = Html.appendType(header, 'button', 'button', ['btn-close'], null);
        btnX.addEventListener('click', () => this.hide());

        // body 
        //  https://getbootstrap.com/docs/5.0/forms/floating-labels/ 
        FloatingForm.Input('txtName', 'text', 'Nome', this.parent.current.name, body);
        
        const inline = Html.append(body, 'div', ['f-sp-b']);
        FloatingForm.Input('txtEmail', 'email', 'Email', this.parent.current.email, inline);
        FloatingForm.Input('txtMobile', 'text', 'WhatsApp', this.parent.current.mobile, inline);
        
        FloatingForm.Input('txtAddress', 'textArea', 'Endereço', this.parent.current.addressInfo.address, body);

        const inline2 = Html.append(body, 'div', ['f-sp-b']);
        FloatingForm.Input('txtPostalCode', 'text', 'CEP', this.parent.current.addressInfo.postalCode, inline2);
        FloatingForm.Input('txtCity', 'text', 'Cidade', this.parent.current.addressInfo.city, inline2);
        FloatingForm.Input('txtState', 'text', 'Estado', this.parent.current.addressInfo.state, inline2);

        // footer
        const btnCancel = Html.appendType(spaced, 'button', 'button', ['btn', 'btn-danger'], 'Cancelar');
        btnCancel.addEventListener('click', () => this.hide());

        const btnSave = Html.appendType(spaced, 'button', 'button', ['btn', 'btn-primary'], 'Salvar');
        btnSave.addEventListener('click', () => this.saveOrUpdate());
    }

    saveOrUpdate() {
        const name   = (document.getElementById('txtName') as HTMLInputElement)?.value;
        const mobile = (document.getElementById('txtMobile') as HTMLInputElement)?.value;
        const email  = (document.getElementById('txtEmail') as HTMLInputElement)?.value;
        const street = (document.getElementById('txtAddress') as HTMLInputElement)?.value;
        const city   = (document.getElementById('txtCity') as HTMLInputElement)?.value;
        const state  = (document.getElementById('txtState') as HTMLInputElement)?.value;
        const code   = (document.getElementById('txtPostalCode') as HTMLInputElement)?.value;

        const item = { name: name, mobile: mobile, email: email, addressInfo: new Address(street, city, state, code)};
        // this.parent.saveOrUptade(item);
    }

    show(item : IUserData): void {
        (document.getElementById('txtName') as HTMLInputElement).value = item.name;
        (document.getElementById('txtMobile') as HTMLInputElement).value = item.mobile;
        (document.getElementById('txtEmail') as HTMLInputElement).value = item.email;
        (document.getElementById('txtAddress') as HTMLInputElement).value = item.addressInfo.address;
        (document.getElementById('txtCity') as HTMLInputElement).value = item.addressInfo.city;
        (document.getElementById('txtState') as HTMLInputElement).value = item.addressInfo.state;
        (document.getElementById('txtPostalCode') as HTMLInputElement).value = item.addressInfo.postalCode;
       
        if (this.parent.modalContainer) 
            this.parent.modalContainer.style.display = 'block';
    }

    hide() {
        if (this.parent.modalContainer) 
            this.parent.modalContainer.style.display = 'none';
    }
}