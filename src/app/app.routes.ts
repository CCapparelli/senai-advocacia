import { Routes }                 from '@angular/router';
import { MainComponent }          from './main/main.component';
import { TeamComponent }          from './main/public/our-team/our-team.component';
import { ContactUsComponent }     from './main/public/contact-us/contact-us.component';
import { LoginComponent }         from './main/auth/login/login/login.component';
import { SignupComponent }        from './main/auth/login/signup/signup.component';
import { AuthGuard }              from './main/auth/auth.guard';
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
    { path: 'team',      component: TeamComponent,      canActivate: [AuthGuard] },
    { path: 'client',    component: ClientComponent,    canActivate: [AuthGuard] },
    { path: 'reports',   component: ReportsComponent,   canActivate: [AuthGuard] },
    { path: 'lawer',     component: LawerComponent,     canActivate: [AuthGuard] },
    { path: 'meetings',  component: MeetingsComponent,  canActivate: [AuthGuard] },
    { path: 'admin',     component: AdminComponent,     canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];

