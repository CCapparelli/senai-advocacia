import { Html } from "../../services/ui/html";
import { IContext } from "../data.contracts";
import { ITable } from "../ui.contracts";

export class UserTableManager<IUserData> {
  private component: ITable<IUserData>;

  cols : string[];
  context: IContext<IUserData>;
  container: HTMLElement|null;

  constructor(component : ITable<IUserData>, context: IContext<IUserData>) {
    this.cols = ['Email','Nome','WhatsApp','Endereço','']; // última coluna para os botões

    this.component = component;
    this.context = context;
    this.container = component.tableContainer;
  }

  list() { 
    if (!this.container) return;

    this.container.innerHTML = '';

    let table  = Html.append(this.container, 'table', ['table','table-striped','table-hover', 'table-dark']);
    let header = Html.append(table, 'thead', []);
    let headerRow = Html.appendHeaderRow(header);
    for (let i = 0; i < this.cols.length; i++) {
      Html.appendHeaderCell(headerRow, this.cols[i]);
    }

    let body = Html.append(table, 'tbody', []);
    let list = this.context.list();
    for (let i = 0; i < list.length; i++) {
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
      let i2 = DHtmlM.append(btn2, 'i', ['fa-solid', 'fa-trash', 'trash']);
      i2.setAttribute('title', 'Remover');
    }
  }
}