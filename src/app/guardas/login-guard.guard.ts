import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DataViviendasService } from '../data-viviendas.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private dataVivienda: DataViviendasService, private router: Router, private cookieService: CookieService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const nombreUsuario = JSON.parse(this.cookieService.get('Usuario')).nombre;
    const contrasena = JSON.parse(this.cookieService.get('Usuario')).contrasena;

    return this.dataVivienda.comprobarUsuario(nombreUsuario, contrasena).pipe(
      map((response: string) => response === 'correcto'),
      take(1),
      map((authenticated: boolean) => {
        if (!authenticated) {
          // No autenticado, redirigir a la página de login
          this.router.navigate(['login']);
          return false;
        }
        return true;
      })
    );
  }
}
