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

  canActivate(): boolean {
    if(this.auth.isAuth()){
        return true
    }else {
        this.auth.logout()
        this.router.navigate(['admin/', 'login'], { queryParams: { nonAuth: true } })
        return false
    }
  }

  canActivateChild(): boolean {
    if(this.auth.isAuth()){
        return true
    }else {
        this.auth.logout()
        this.router.navigate(['admin/', 'login'], { queryParams: { nonAuth: true } })
        return false
    }
  }
}