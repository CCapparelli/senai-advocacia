import { Component } from '@angular/core';

import { NavbarComponent } from './public/header/navbar/navbar.component';
import { MainContentComponent as MainComponent } from './public/main/content/content.component';
import { FooterContentComponent as Footer } from './public/footer/content/content.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
    imports: [NavbarComponent, MainComponent, Footer, RouterOutlet 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'senai-advocacia';
}
