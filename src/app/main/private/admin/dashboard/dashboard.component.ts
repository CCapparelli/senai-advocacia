import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataServices } from '../../../../../services/session.services';

@Component({
  selector: 'admin-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  constructor(private dataService: DataServices, private router: Router) {}

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
