import { Injectable }    from "@angular/core";
import { Observable, retryWhen }    from "rxjs";
import { DataServices } from "../../../services/session.services";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate {
  constructor(private dataServices: DataServices, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  : | Observable<boolean|UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree 
  {
    const requested = route.routeConfig?.path;
    if (requested) {
      
      const publicItems = ['signup', 'policies'];
      const isPublic    = publicItems.includes(requested);
      if (isPublic) {
        return true;
      }

      const user = this.dataServices.currentUser;
      if (user) {
        const isAdmin     = user.roles.includes('admin');
        if (isAdmin) return true; 

        const clientItems = ['reports', 'calendar', 'pendencies'];
        const lawerItems  = ['meetings', 'clients'];

        const isClient    = user.roles.includes('client');
        const client      = isClient && clientItems.includes(requested);
        if (client) return true;
     
        const isLawer     = user.roles.includes('lawer');
        const lawer       = isLawer && (lawerItems.includes(requested) ||
                                        clientItems.includes(requested));
        if (lawer) return true;
      }
    }
    this.router.navigate(["/login"]);
    return false;
  }
}