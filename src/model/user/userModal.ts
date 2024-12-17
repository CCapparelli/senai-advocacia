import { FloatingForm } from "../../services/ui/forms";
import { Html } from "../../services/ui/html";
import { Address } from "../shared";
import { IModal } from "../ui.contracts";
import { IUserData } from "./om";
import { clientItems } from '../../services/auth.guard';
import { Modal } from "../ui";

export class UserModal extends Modal<IUserData> {
    constructor(parent : IModal<IUserData>, isDark: boolean) {
        super(parent, isDark);
    }
    
    protected override addBody(content: HTMLElement) {
        let body   = Html.append(content, 'div', ['modal-body']);
        FloatingForm.Input('txtName', 'text', 'Nome', this.parent.current.name, body);

        const inline = Html.append(body, 'div', ['f-sp-b']);
        FloatingForm.Input('txtEmail', 'email', 'Email', this.parent.current.email, inline);
        FloatingForm.Input('txtMobile', 'text', 'WhatsApp', this.parent.current.mobile, inline);

        FloatingForm.Input('txtAddress', 'textArea', 'Endereço', this.parent.current.addressInfo.address, body);

        const inline2 = Html.append(body, 'div', ['f-sp-b']);
        FloatingForm.Input('txtPostalCode', 'text', 'CEP', this.parent.current.addressInfo.postalCode, inline2);
        FloatingForm.Input('txtCity', 'text', 'Cidade', this.parent.current.addressInfo.city, inline2);
        FloatingForm.Input('txtState', 'text', 'Estado', this.parent.current.addressInfo.state, inline2);
    }

    protected override saveOrUpdate() {
        const name   = (document.getElementById('txtName') as HTMLInputElement)?.value;
        const mobile = (document.getElementById('txtMobile') as HTMLInputElement)?.value;
        const email  = (document.getElementById('txtEmail') as HTMLInputElement)?.value;
        const street = (document.getElementById('txtAddress') as HTMLInputElement)?.value;
        const city   = (document.getElementById('txtCity') as HTMLInputElement)?.value;
        const state  = (document.getElementById('txtState') as HTMLInputElement)?.value;
        const code   = (document.getElementById('txtPostalCode') as HTMLInputElement)?.value;

        const item = { 
            name: name, 
            mobile: mobile, 
            email: email, 
            addressInfo: new Address(street, city, state, code),
            roles: ['client'],
            paths: clientItems
        };
        this.parent.saveOrUptade(item);
    }

    public override show(item : IUserData): void {
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
}