import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate} from '@angular/router';
import {Observable} from 'rxjs';

export interface CanDeactivateMyComponent {
  confirm(): boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ExitConfirmGuard implements CanDeactivate<CanDeactivateMyComponent> {
  canDeactivate(
    component: CanDeactivateMyComponent,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return component.confirm();
  }
}
