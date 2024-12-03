import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { CopyrightComponent } from './copyright/copyright.component';

@Component({
  selector: 'app-footer',
  imports: [NavbarComponent, CopyrightComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
