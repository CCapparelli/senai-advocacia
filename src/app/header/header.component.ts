import { Component }   from '@angular/core';
import { RouterLink }  from '@angular/router';
import { Router }      from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  navRequested(pathName:string) {
    localStorage.setItem('pathRequested', pathName);
    this.router.navigate([pathName]);
  }
}
