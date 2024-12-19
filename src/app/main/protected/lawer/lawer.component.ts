import { Component } from '@angular/core';
import { DataServices } from '../../../../services/dataService';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-lawer',
  imports: [RouterLink],
  templateUrl: './lawer.component.html',
  styleUrl: './lawer.component.css'
})
export class LawerComponent {
  constructor(private dataService: DataServices, private router: Router) 
  {
    this.currentName = dataService.currentUser?.name;
  }

  expanded: boolean = false;
  currentName : string|undefined = 'Advogado'

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
