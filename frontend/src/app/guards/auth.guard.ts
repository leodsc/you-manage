import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Message } from '../common/message/Message';
import { ManagerService } from '../services/http/manager.service';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private managerService: ManagerService, private messageService: MessageService, private translate: TranslateService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.managerService.data === undefined || this.managerService.data.token === undefined) {
      this.router.navigate(["/login"], {
        queryParams: {
          authenticated: false
        },
      });
      return false;
    } else {
      return true;
    }
  }
  
}
