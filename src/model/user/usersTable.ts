import { Html } from "../../services/ui/html";
import { ICRUD } from "../data.contracts";
import { Table } from "../ui";
import { ITable } from "../ui.contracts";
import { IUserData } from "./om";

export class UsersTable extends Table<IUserData> { 
  constructor(component : ITable<IUserData>, context: ICRUD<IUserData>, isDark: boolean) {
    super(component, context, ['Email','Nome','WhatsApp','Endereço'], isDark);
    super.fill();
  }

  protected override addRow(i:number, list: IUserData[], body : HTMLElement) {
    let tr = Html.append(body, 'tr', []);
    const user = list[i] as IUserData;
    Html.appendBodyCell(tr, Object(user)['email']);
    Html.appendBodyCell(tr, Object(user)['name']);
    Html.appendBodyCell(tr, Object(user)['mobile']);
    Html.appendBodyCell(tr, Object(user)['addressInfo']);

    let td = Html.append(tr, 'td', []);
    let div = Html.append(td, 'div', ['buttons'])

    let btn1 = Html.append(div, 'button', ['btn','m-0','p-0']);
    btn1.addEventListener('click', () => this.component.edit(user));
    let i1 = Html.append(btn1, 'i',  ['fa-solid', 'fa-pen-to-square', 'edit']);
    i1.setAttribute('title', 'Editar');
    
    let btn2 = Html.append(div, 'button', ['btn','m-0','p-0']);
    btn2.addEventListener('click', () => this.component.remove(user));
    let i2 = Html.append(btn2, 'i', ['fa-solid', 'fa-trash', 'trash']);
    i2.setAttribute('title', 'Remover');
  }
}

