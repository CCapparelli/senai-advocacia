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

  logout(): void {
    this.dataService.endSession();
    this.router.navigate(['/home']);
  }
}
