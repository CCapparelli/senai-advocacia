import { Component } from '@angular/core';
import { DataServices } from '../../../../services/dataService';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-client',
  imports: [RouterLink],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
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