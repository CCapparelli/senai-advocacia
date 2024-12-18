import { Injectable }    from "@angular/core";
import { Observable }    from "rxjs";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { DataServices } from "../dataService";
import { IUserData } from '../../model/user/om';

export const publicItems = ['signup', 'policies'];
export const clientItems = ['client', 'reports', 'calendar', 'pendencies'];
export const lawerItems  = ['lawer', 'clients', 'meetings'];

@Injectable({providedIn: "root"})
export class Authorizator implements CanActivate {
  constructor(private dataServices: DataServices, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  : | Observable<boolean|UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree 
  {
    const user   = this.dataServices.currentUser;
    const path   = route.routeConfig?.path;
    const result = this.canAuthorize(user, path);
    if (!result) {
      alert(`Usuário [${user?.email}] cannot access path. [${path}]`);
      return false;
    } else {
      return true;
    }
  }

  private canAuthorize(user:IUserData|null, path:string|undefined) : boolean {
    if (!user || !path) 
      return false;
    
    if (user.roles.includes('admin')) 
      return true; 

    if (user.roles.includes('lawer') && lawerItems.includes(path)) 
      return true;

    if (user.roles.includes('client') && clientItems.includes(path)) 
      return true;
    
    return false;
  }
}