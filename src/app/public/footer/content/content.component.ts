import { Component } from '@angular/core';
import { NavbarComponent } from '../contents/navbar/navbar.component';
import { CopyrightComponent } from '../contents/copyright/copyright.component';

@Component({
  selector: 'app-footer',
  imports: [NavbarComponent, CopyrightComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class FooterContentComponent {

}
