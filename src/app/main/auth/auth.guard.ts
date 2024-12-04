import { Injectable }    from "@angular/core";
import { Observable }    from "rxjs";
import { SessaoService } from "./sessao.service";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessaoService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  : | Observable<boolean|UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree 
  {
    if (this.sessionService.isLogged()) {
      const data = this.sessionService.safe.get();
      if (!data || !data.paths) {
        return false;
      }
      const target = route.routeConfig?.path; 
      if (target && data.paths.includes(target)) {
        this.router.navigate([`/${target}`]);
        return true;
      } else {
        this.router.navigate(["/"]);
        return false;
      }
    }
    this.router.navigate(["/login"]);
    return false;
  }
}