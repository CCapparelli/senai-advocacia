import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserLocalContext } from '../../../../data/model/contexts/users/userContext';
import { UserTableManager } from '../../../../data/model/contexts/users/guiUserTable';
import { UserModalManager } from '../../../../data/model/contexts/users/guiUserModal';
import { IUserData, emptyUserData } from "../../../../data/model/entities/omUser";
import { IModal, ITable } from '../../../../data/model/guiOM';

@Component({
  selector: 'app-records',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})
export class RecordsComponent implements ITable<IUserData>, IModal<IUserData>, AfterViewInit {
  list: IUserData[] = [];
  tableContainer: HTMLElement|null = null;

  current: IUserData;
  modalContainer: HTMLElement|null = null;

  public modalBuilder : UserModalManager;
  public tableBuilder : UserTableManager<IUserData>;

  constructor(private usersContext: UserLocalContext) {
    this.list           = this.usersContext.list;
    this.current        = emptyUserData;
    
    this.tableBuilder   = new UserTableManager(this, this.usersContext);
    this.modalBuilder   = new UserModalManager(this);
  }

  ngAfterViewInit(): void {
    // this.formContainer = document.getElementById('divLoginForm');
    // this.form = new LoginForm(this);
    // this.form.load(emptyLogin);

    this.tableContainer = document.getElementById('table-container');
    this.tableBuilder = new UserTableManager(this, this.usersContext);
    this.tableBuilder.list();

    this.modalContainer = document.getElementById('modal-container');
    this.modalBuilder = new UserModalManager(this);
    // this.modalBuilder.load(emptyUserData);

  }

  add() {
    this.current = emptyUserData;
    this.modalBuilder.show(this.current);
  }

  // ITable
  edit(user: IUserData) {
    this.current = user;
    this.modalBuilder.show(user);
  } 
  remove(item: IUserData) {
    const goOn = confirm(`Você tem certeza que quer deletar ${item.name}?`);
    if(goOn) {
      this.usersContext.remove(item);
      this.tableBuilder.list();
    }
  }

  // IModal
  saveOrUptade(item: IUserData): void {
    this.usersContext.saveOrUptade(item);
    this.tableBuilder.list();
    this.modalBuilder.hide();
  }



  expanded: boolean = false;
  toogleMenu() {
    this.expanded = !this.expanded;
    const btn = document.getElementById('btnToogle');
    const bar = document.getElementById('sideBar');
    if (btn && bar) {
      if (this.expanded) {
        bar.style.width = '300px';
        btn.className = 'menu-x fa-solid fa-x';
      } else {
        bar.style.width = '45px';
        btn.className = 'menu-bars fa-solid fa-bars';

      }
    }
  }
}
