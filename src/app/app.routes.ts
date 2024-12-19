import { Routes }                 from '@angular/router';
import { MainComponent }          from './main/main.component';
import { TeamComponent }          from './main/public/our-team/our-team.component';
import { OurContactComponent }    from './main/public/our-contact/our-contact.component';
import { OurPoliciesComponent }   from './main/public/our-policies/our-policies.component';
import { LoginComponent }         from './main/login/login/login.component';
import { SignupComponent }        from './main/login/signup/signup.component';
import { Authenticator }          from '../services/auth/authenticator';
import { AdminComponent }         from './main/private/admin/admin.component';
import { DashboardComponent }     from './main/private/admin/dashboard/dashboard.component';
import { FirebaseComponent }      from './main/private/admin/firebase/firebase.component';
import { NextComponent }          from './main/private/admin/next/next.component';
import { ClientComponent }        from './main/protected/client/client.component';
import { ReportsComponent }       from './main/protected/client/reports/reports.component';
import { LawerComponent }         from './main/protected/lawer/lawer.component';
import { MeetingsComponent }      from './main/protected/lawer/meetings/meetings.component';
import { RecordsComponent }       from './main/private/admin/records/records.component';
import { Authorizator }           from '../services/auth/authorizator';

export const routes: Routes = [
    { path: '',          component: MainComponent },
    { path: 'contact',   component: OurContactComponent },
    { path: 'login',     component: LoginComponent },
    { path: 'signup',    component: SignupComponent },
    { path: 'policies',  component: OurPoliciesComponent }, //
    { path: 'team',      component: TeamComponent },
    { path: 'client',    component: ClientComponent,        canActivate: [Authorizator] }, 
    { path: 'reports',   component: ReportsComponent,       canActivate: [Authorizator] },
    { path: 'lawer',     component: LawerComponent,         canActivate: [Authorizator] }, 
    { path: 'meetings',  component: MeetingsComponent,      canActivate: [Authorizator] },
    { path: 'admin',     component: AdminComponent,         canActivate: [Authorizator] }, 
    { path: 'dashboard', component: DashboardComponent,     canActivate: [Authorizator] },
    { path: 'firebase',  component: FirebaseComponent,      canActivate: [Authorizator] },
    { path: 'next',      component: NextComponent,          canActivate: [Authorizator] },
    { path: 'records',   component: RecordsComponent,       canActivate: [Authorizator] },
];

