import { Routes }                 from '@angular/router';
import { MainContentComponent }   from './main/main.component';
import { TeamComponent }          from './main/public/our-team/our-team.component';
import { ContactUsComponent }     from './main/public/contact-us/contact-us.component';

export const routes: Routes = [
    { path: '', component: MainContentComponent },
    { path: 'team', component: TeamComponent },
    { path: 'contact', component: ContactUsComponent },
];

