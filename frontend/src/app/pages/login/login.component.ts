import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppForm } from 'src/app/common/form/app-form';
import { ManagerModel } from 'src/app/model/Manager';
import { ManagerService } from 'src/app/services/http/manager.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  backgrounds = {
    mobile: ['welcome-1', 'welcome-2', 'welcome-3'],
    desktop: ['welcome-1', 'welcome-2', 'welcome-3'],
  };
  manager: ManagerModel = new ManagerModel();

  toastOptions: SweetAlertOptions = {
    timer: 8000,
    allowEscapeKey: true,
    toast: true,
    timerProgressBar: true,
    showConfirmButton: false,
    color: 'white',
    showCloseButton: true,
    position: 'top',
  };

  constructor(
    private translate: TranslateService,
    private managerService: ManagerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    console.log(navigator.language);
    translate.use(navigator.language.slice(0, 2));
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      setTimeout(() => {
        if (params['authenticated'] === 'false') {
          Swal.fire({
            title: this.translate.instant('LOGIN.ERROR.NO_TOKEN.TITLE'),
            text: this.translate.instant('LOGIN.ERROR.NO_TOKEN.DESCRIPTION'),
            background: '#dc3545',
            ...this.toastOptions,
          });
        } else if (params['created'] === 'true') {
          Swal.fire({
            title: this.translate.instant('LOGIN.REDIRECT.SIGNUP.TITLE'),
            background: '#28a745',
            ...this.toastOptions,
          });
        } else if (params['logout'] === 'true') {
          Swal.fire({
            title: this.translate.instant('LOGOUT.TITLE'),
            background: '#28a745',
            ...this.toastOptions,
          });
        }
      }, 10);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      console.log(this.translate.instant('LOGIN.ERROR.UNKNOWN.TITLE'));
    }, 10);
  }

  form: AppForm[] = [
    {
      htmlFor: 'email',
      type: 'email',
      placeholder: 'LOGIN.EMAIL',
      title: 'LOGIN.EMAIL',
      model: this.manager,
      name: 'email',
    },
    {
      htmlFor: 'password',
      type: 'password',
      placeholder: 'LOGIN.PASSWORD',
      title: 'LOGIN.PASSWORD',
      model: this.manager,
      name: 'password',
    },
  ];

  login() {
    this.managerService.login(this.manager).subscribe(
      (manager) => {
        if (manager.token !== undefined) {
          this.managerService.setData(manager);
          this.router.navigate(['/']);
        }
      },
      (error) => {
        if (error.status === 0) {
          Swal.fire({
            title: this.translate.instant('LOGIN.ERROR.UNKNOWN.TITLE'),
            text: this.translate.instant('LOGIN.ERROR.UNKNOWN.DESCRIPTION'),
            background: '#dc3545',
            ...this.toastOptions,
          });
        } else if (error.status === 401) {
          Swal.fire({
            title: this.translate.instant('LOGIN.ERROR.UNAUTHORIZED.TITLE'),
            text: this.translate.instant(
              'LOGIN.ERROR.UNAUTHORIZED.DESCRIPTION'
            ),
            background: '#dc3545',
            ...this.toastOptions,
          });
        }
      }
    );
  }
}
