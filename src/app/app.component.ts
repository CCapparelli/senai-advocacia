import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MasterComponent } from './master/master.component';
import { SignupComponent } from './signup/signup.component';
import { ReportsComponent } from './reports/reports.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ClientComponent } from './client/client.component';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent, 
    HomeComponent, 
    ClientComponent,
    LoginComponent, 
    MasterComponent, 
    SignupComponent, 
    ReportsComponent,
    FooterComponent, 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'senai-advocacia';
}
