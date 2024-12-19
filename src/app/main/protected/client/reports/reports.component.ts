import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataServices } from '../../../../../services/dataService';

@Component({
  selector: 'client-reports',
  imports: [RouterLink],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})

export class ReportsComponent {
  constructor(private dataService: DataServices, private router: Router) 
  {
    this.currentName = dataService.currentUser?.name;
  }

  expanded: boolean = false;
  currentName : string|undefined = 'Cliente'

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

