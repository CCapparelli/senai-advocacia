import { Injectable }    from "@angular/core";
import { Observable }    from "rxjs";
import { SessaoService } from "./sessao.service";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessaoService, 
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, 
              state: RouterStateSnapshot) 
              : | Observable<boolean|UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree 
  {
    if (this.sessionService.estaLogado()) {
      return true;
    }
    return this.router.parseUrl("/login");
  }
}