import { Routes }             from '@angular/router';
import { AppComponent }       from './app.component';
import { TeamComponent }      from './public/main/contents/team/team.component';
import { ContactUsComponent } from './public/main/contents/contact-us/contact-us.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'team', component: TeamComponent },
    { path: 'contact', component: ContactUsComponent },
];

