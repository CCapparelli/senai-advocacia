import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IModal, ITable } from '../../../../../model/ui.contracts';
import { IUserData, emptyUserData } from '../../../../../model/user/om';
import { UserModal } from '../../../../../model/user/userModal';
import { UsersTable } from '../../../../../model/user/usersTable';
import { UsersContext } from '../../../../../model/user/context';
import { DataServices } from '../../../../../services/dataService';


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
  currentName : string|undefined = 'Admin'

  public modalBuilder : UserModal;
  public tableBuilder : UsersTable;

  constructor(private dataService: DataServices, private usersContext: UsersContext) {
    this.list           = this.usersContext.list();
    this.current        = emptyUserData;
    
    this.tableBuilder   = new UsersTable(this, this.usersContext, true);
    this.modalBuilder   = new UserModal(this, true);
    this.currentName    = this.dataService.currentUser?.name;
  }

  ngAfterViewInit(): void {
    this.tableContainer = document.getElementById('table-container');
    this.tableBuilder = new UsersTable(this, this.usersContext, true);
    
    this.modalContainer = document.getElementById('modal-container');
    this.modalBuilder = new UserModal(this, true);
  }

  add() {
    this.current = emptyUserData;
    this.modalBuilder.init('Incluindo...');
    this.modalBuilder.show(this.current);
  }

  // ITable
  edit(user: IUserData) {
    this.current = user;
    this.modalBuilder.init('Editando...');
    this.modalBuilder.show(user);
  } 
  remove(item: IUserData) {
    const goOn = confirm(`Você tem certeza que quer deletar ${item.name}?`);
    if(goOn) {
      this.usersContext.remove(item);
      this.tableBuilder.fill();
    }
  }

  // IModal
  saveOrUptade(item: IUserData): void {
    if (item.email.length > 0) {
      this.usersContext.saveOrUptade(item);
      this.tableBuilder.fill();
      this.modalBuilder.hide();
    }
  }

  expanded: boolean = false;
  toogleMenu() {
    this.expanded = !this.expanded;
    const btn = document.getElementById('btnToogle');
    const bar = document.getElementById('sideBar');
    if (btn && bar) {
      if (this.expanded) {
        bar.style.width = '260px';
        btn.className = 'menu-x fa-solid fa-x';
      } else {
        bar.style.width = '45px';
        btn.className = 'menu-bars fa-solid fa-bars';
      }
    }
  }
}
