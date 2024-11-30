import { Component } from '@angular/core';
import { BannerComponent } from '../contents/banner/banner.component';
import { TeamComponent } from '../contents/team/team.component';
import { OurServicesComponent } from '../contents/our-services/our-services.component';
import { ContactUsComponent } from '../contents/contact-us/contact-us.component';

@Component({
  selector: 'main-content',
  imports: [BannerComponent, TeamComponent, OurServicesComponent, ContactUsComponent ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class MainContentComponent {

}
