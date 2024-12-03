import { Component } from '@angular/core';
import { BannerComponent } from './public/main-banner/main-banner.component';
import { TeamComponent } from './public/our-team/our-team.component';
import { OurServicesComponent } from './public/our-services/our-services.component';
import { ContactUsComponent } from './public/contact-us/contact-us.component';

@Component({
  selector: 'main-content',
  imports: [BannerComponent, TeamComponent, OurServicesComponent, ContactUsComponent ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
