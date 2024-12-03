import { Routes }                 from '@angular/router';
import { MainComponent }          from './main/main.component';
import { TeamComponent }          from './main/public/our-team/our-team.component';
import { ContactUsComponent }     from './main/public/contact-us/contact-us.component';
import { LoginComponent }         from './main/auth/login/login/login.component';
import { AuthGuard }              from './main/auth/auth.guard';
import { AdminComponent }         from './main/private/admin/admin.component';
import { ReportsComponent }       from './main/private/reports/reports.component';
import { ClientComponent }        from './main/protected/client/client.component';
import { DashboardComponent }     from './main/protected/dashboard/dashboard.component';
import { LawerComponent }         from './main/protected/lawer/lawer.component';
import { MeetingComponent }       from './main/protected/meeting/meeting.component';

export const routes: Routes = [
    { path: '',          component: MainComponent },
    { path: 'contact',   component: ContactUsComponent },
    { path: 'login',     component: LoginComponent },
    { path: 'team',      component: TeamComponent,      canActivate: [AuthGuard] },
    { path: 'client',    component: ClientComponent,    canActivate: [AuthGuard] },
    { path: 'lawer',     component: LawerComponent,     canActivate: [AuthGuard] },
    { path: 'meeting',   component: MeetingComponent,   canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'admin',     component: AdminComponent,     canActivate: [AuthGuard] },
    { path: 'reports',   component: ReportsComponent,   canActivate: [AuthGuard] },
];

