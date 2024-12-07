import { Injectable }    from "@angular/core";
import { Observable, retryWhen }    from "rxjs";
import { DataServices } from "../../../services/session.services";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate {
  constructor(private dataServices: DataServices, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  : | Observable<boolean|UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree 
  {
    const isLogged = this.dataServices.hasData();
    const publicNav = ['signup', 'policies'];
    const requested = route.routeConfig?.path;
    const ispublic = requested && publicNav.includes(requested);

    if (!isLogged && !ispublic) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true; 
  }
}