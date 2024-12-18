import { Html } from "../services/ui/html";
import { ICRUD } from "./data.contracts";
import { IModal, ITable } from "./ui.contracts";

export enum CrudMode {
  NotSet,
  Adding,
  Editing,
  Removing,
}

// Contato (Contacte-nos)
export interface IContactMessage {
    ourEmail:string;
    senderEmail:string;
    senderName: string;
    senderMobile: string;
    messageTitle: string;
    messageText: string;
}
export const emptyContactMessage : IContactMessage = { messageText: '', messageTitle: '', ourEmail: '', senderEmail: '', senderMobile: '', senderName: ''};

// Login e signup (login, auth, etc.)
export interface ILogin {
    email:string;
    password:string;
}
export const emptyLogin :ILogin = { email: '', password: ''};

export interface ISignup extends ILogin {
    name:string;
    confirmPassword:string;
}
export const emptySignup :ISignup = { email: '', name: '', password: '', confirmPassword: ''};

export class Table<T> {
    protected component: ITable<T>;
  
    protected cols : string[];
    protected context: ICRUD<T>;
    protected container: HTMLElement|null;
    protected isDark: boolean;
  
    constructor(component : ITable<T>, context: ICRUD<T>, cols: string[], isDark: boolean) {
      this.cols = cols; 
      this.cols.push(''); // última coluna para os botões
  
      this.component = component;
      this.context = context;
      this.container = component.tableContainer;
  
      this.isDark = isDark;
    }
  
    public fill() { 
      if (!this.container) return;
  
      this.container.innerHTML = '';
  
      let css = ['table','table-striped','table-hover'];
      if(this.isDark)
        css.push('table-dark');
  
      let table  = Html.append(this.container, 'table', css);
      let header = Html.append(table, 'thead', []);
      let headerRow = Html.appendHeaderRow(header);
  
      for (let i = 0; i < this.cols.length; i++) {
        Html.appendHeaderCell(headerRow, this.cols[i]);
      }
  
      let body = Html.append(table, 'tbody', []);
      let list = this.context.list();
      for (let i = 0; i < list.length; i++) {
        this.addRow(i, list, body); 
      }
    }
  
    protected addRow(i:number, list : T[], body : HTMLElement) {}
}

export class Modal<T> {
  protected parent: IModal<T>;
  protected isDark: boolean;
  
  constructor(parent : IModal<T>, isDark: boolean) {
      this.parent = parent;
      this.isDark = isDark;
  }

  public init(title:string) {
      if (!this.parent.modalContainer) return;

      this.parent.modalContainer.innerHTML = '';

      let css = ['modal-dialog'];
      if(this.isDark)
          css.push('dark'); 

      let dialog  = Html.append(this.parent.modalContainer, 'div', css);
      let content = Html.append(dialog, 'div', ['modal-content']);

      this.addHeader(content, title); 
      this.addBody(content); 
      this.addFooter(content);
  }

  protected addHeader(content: HTMLElement, title:string) {
      let header = Html.append(content, 'div', ['modal-header']);
      Html.appendText(header, 'h4', ['modal-title'], title);

      const btnX = Html.appendType(header, 'button', 'button', ['btn-close'], null);
      btnX.addEventListener('click', () => this.hide());
  }

  //  https://getbootstrap.com/docs/5.0/forms/floating-labels/ 
  protected addBody(content: HTMLElement) {
      let body   = Html.append(content, 'div', ['modal-body']);
  }

  protected addFooter(content: HTMLElement) {
      let footer = Html.append(content, 'div', ['modal-footer']);
      let spaced = Html.append(footer, 'div', ['f-sp-b']);
      
      const btnCancel = Html.appendType(spaced, 'button', 'button', ['btn', 'btn-danger'], 'Cancelar');
      btnCancel.addEventListener('click', () => this.hide());

      const btnSave = Html.appendType(spaced, 'button', 'button', ['btn', 'btn-primary'], 'Salvar');
      btnSave.addEventListener('click', () => this.saveOrUpdate());
  }

  protected saveOrUpdate() {
  }

  public show(item : T): void {
      if (this.parent.modalContainer) 
          this.parent.modalContainer.style.display = 'block';
  }

  public hide() {
      if (this.parent.modalContainer) 
          this.parent.modalContainer.style.display = 'none';
  }
}
