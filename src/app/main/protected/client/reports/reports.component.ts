import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataServices } from '../../../../../services/session.services';

@Component({
  selector: 'client-reports',
  standalone: true,
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})

export class ReportsComponent {
  constructor(private dataService: DataServices, private router: Router) {}

  logout(): void {
    this.dataService.endSession();
    this.router.navigate(['/home']);
  }
}

