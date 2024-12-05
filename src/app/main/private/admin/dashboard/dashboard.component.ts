import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataServices } from '../../../../../services/session.services';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  constructor(private dataService: DataServices, private router: Router) {}

  logout(): void {
    this.dataService.endSession();
    this.router.navigate(['/home']);
  }
}
