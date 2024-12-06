import { Routes }                 from '@angular/router';
import { MainComponent }          from './main/main.component';
import { TeamComponent }          from './main/public/our-team/our-team.component';
import { ContactUsComponent }     from './main/public/contact-us/contact-us.component';
import { OurPoliciesComponent }   from './main/public/our-policies/our-policies.component';
import { LoginComponent }         from './main/login/login.component';
import { SignupComponent }        from './main/login/signup/signup.component';
import { AuthGuard }              from './main/login/auth.guard';
import { AdminComponent }         from './main/private/admin/admin.component';
import { DashboardComponent }     from './main/private/admin/dashboard/dashboard.component';
import { ClientComponent }        from './main/protected/client/client.component';
import { ReportsComponent }       from './main/protected/client/reports/reports.component';
import { LawerComponent }         from './main/protected/lawer/lawer.component';
import { MeetingsComponent }      from './main/protected/lawer/meetings/meetings.component';

export const routes: Routes = [
    { path: '',          component: MainComponent },
    { path: 'contact',   component: ContactUsComponent },
    { path: 'login',     component: LoginComponent },
    { path: 'signup',    component: SignupComponent },
    { path: 'policies',  component: OurPoliciesComponent },
    { path: 'team',      component: TeamComponent,       canActivate: [AuthGuard] },
    { path: 'client',    component: ReportsComponent,    canActivate: [AuthGuard] },
    { path: 'reports',   component: ReportsComponent,    canActivate: [AuthGuard] },
    { path: 'lawer',     component: MeetingsComponent,   canActivate: [AuthGuard] },
    { path: 'meetings',  component: MeetingsComponent,   canActivate: [AuthGuard] },
    { path: 'admin',     component: DashboardComponent,  canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent,  canActivate: [AuthGuard] },
];

