import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router"
import { AuthService } from "./auth.service"

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService, 
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if(this.auth.isAuth()){
        return true
    }else {
        this.auth.logout()
        this.router.navigate(['admin/', 'login'])
        return false
    }
    
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if(this.auth.isAuth()){
        return true
    }else {
        this.auth.logout()
        this.router.navigate(['admin/', 'login'])
        return false
    }
  }
}