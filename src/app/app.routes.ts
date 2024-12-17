import { Routes }                 from '@angular/router';
import { MainComponent }          from './main/main.component';
import { TeamComponent }          from './main/public/our-team/our-team.component';
import { OurContactComponent }    from './main/public/our-contact/our-contact.component';
import { OurPoliciesComponent }   from './main/public/our-policies/our-policies.component';
import { LoginComponent }         from './main/login/login/login.component';
import { SignupComponent }        from './main/login/signup/signup.component';
import { AuthGuard }              from '../services/auth.guard';
import { AdminComponent }         from './main/private/admin/admin.component';
import { DashboardComponent }     from './main/private/admin/dashboard/dashboard.component';
import { FirebaseComponent }      from './main/private/admin/firebase/firebase.component';
import { NextComponent }          from './main/private/admin/next/next.component';
import { ClientComponent }        from './main/protected/client/client.component';
import { ReportsComponent }       from './main/protected/client/reports/reports.component';
import { LawerComponent }         from './main/protected/lawer/lawer.component';
import { MeetingsComponent }      from './main/protected/lawer/meetings/meetings.component';
import { RecordsComponent }       from './main/private/admin/records/records.component';

export const routes: Routes = [
    { path: '',          component: MainComponent },
    { path: 'contact',   component: OurContactComponent },
    { path: 'login',     component: LoginComponent },
    { path: 'signup',    component: SignupComponent },
    { path: 'policies',  component: OurPoliciesComponent },
    { path: 'team',      component: TeamComponent },
    { path: 'client',    component: ClientComponent,     canActivate: [AuthGuard] }, 
    { path: 'reports',   component: ReportsComponent,    canActivate: [AuthGuard] },
    { path: 'lawer',     component: LawerComponent,      canActivate: [AuthGuard] }, 
    { path: 'meetings',  component: MeetingsComponent,   canActivate: [AuthGuard] },
    { path: 'admin',     component: AdminComponent,      canActivate: [AuthGuard] }, 
    { path: 'dashboard', component: DashboardComponent,  canActivate: [AuthGuard] },
    { path: 'firebase',  component: FirebaseComponent,   canActivate: [AuthGuard] },
    { path: 'next',      component: NextComponent,       canActivate: [AuthGuard] },
    { path: 'records',   component: RecordsComponent,    canActivate: [AuthGuard] },
];

