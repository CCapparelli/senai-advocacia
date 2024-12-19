import { Component } from '@angular/core';
import { BannerComponent } from './public/main-banner/main-banner.component';
import { TeamComponent } from './public/our-team/our-team.component';
import { OurServicesComponent } from './public/our-services/our-services.component';
import { OurContactComponent } from './public/our-contact/our-contact.component';

@Component({
  selector: 'main-content',
  imports: [BannerComponent, TeamComponent, OurServicesComponent, OurContactComponent], 
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
