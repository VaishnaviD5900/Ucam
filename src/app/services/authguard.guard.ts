import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate{
  superToken:string = ''
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean | UrlTree 
    {
      const   authToken=sessionStorage.getItem('token')
      // this.authService.Stoken.subscribe(data=>{
      //  this.superToken=data
      // })
     
       return authToken?true:this.router.createUrlTree(['./login'])
      
      
  }}
  
