import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataServices } from '../../../../../services/session.services';

@Component({
  selector: 'lawer-meetings',
  standalone: true,
  templateUrl: './meetings.component.html',
  styleUrl: './meetings.component.css'
})

export class MeetingsComponent {
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
