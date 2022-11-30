import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppForm } from 'src/app/common/form/app-form';
import { ManagerModel } from 'src/app/model/Manager';
import { ManagerService } from 'src/app/services/http/manager.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  backgrounds = {
    mobile: ["welcome-1", "welcome-2", "welcome-3"],
    desktop: ["welcome-1", "welcome-2", "welcome-3"]
  }
  manager: ManagerModel = new ManagerModel();
  confirmPassword = {
    "confirm-password": ""
  };

  constructor(private managerService: ManagerService, private translate: TranslateService, private router: Router) { 
    this.loadTranslations();
  }

  form: AppForm[] = [];

  loadTranslations() {
    setTimeout(() => {
      this.form = [
        { htmlFor: "name",  model: this.manager, name: "name", placeholder: "SIGNUP.NAME", type: "text", title: "SIGNUP.NAME", 
        requirements: [ 
          { text: this.translate.instant("SIGNUP.INPUTS.REQUIREMENTS.NAME.MINIMUM_LENGTH"), validation: (value: string) => value.length >= 2, }, 
          { text: this.translate.instant("SIGNUP.INPUTS.REQUIREMENTS.NAME.MAXIMUM_LENGTH"), validation: (value: string) => value.length < 32 }
        ]},
        { htmlFor: "email",  model: this.manager, name: "email", placeholder: "SIGNUP.EMAIL", type: "email", title: "SIGNUP.EMAIL",
          requirements: [
            { text: this.translate.instant("SIGNUP.INPUTS.REQUIREMENTS.EMAIL.IS_VALID"), validation: (value: string) => value.match(new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) !== null }
        ]},
        { htmlFor: "password",  model: this.manager, name: "password", placeholder: "SIGNUP.PASSWORD", type: "password", title: "SIGNUP.PASSWORD", 
          requirements: [
            { text: this.translate.instant("SIGNUP.INPUTS.REQUIREMENTS.PASSWORD.MINIMUM_LENGTH"), validation: (value: string) => value.length >= 8 },
            { text: this.translate.instant("SIGNUP.INPUTS.REQUIREMENTS.PASSWORD.MINIMUM_LOWERCASE_CHARACTER"), validation: (value: string) => value.match(/[a-z]/g) !== null },
            { text: this.translate.instant("SIGNUP.INPUTS.REQUIREMENTS.PASSWORD.MINIMUM_UPPERCASE_CHARACTER"), validation: (value: string) => value.match(/[A-Z]/g) !== null },
            { text: this.translate.instant("SIGNUP.INPUTS.REQUIREMENTS.PASSWORD.HAS_SPECIAL_CHARACTER"), validation: (value: string) => value.match(/[!@#$%&]/g) !== null }
          ]
        },
        { htmlFor: "confirm-password", model: this.confirmPassword, name: "confirm-password", placeholder: "SIGNUP.CONFIRM_PASSWORD", type: "password", title: "SIGNUP.CONFIRM_PASSWORD",
          requirements: [
            { text: this.translate.instant("SIGNUP.INPUTS.REQUIREMENTS.CONFIRM_PASSWORD"), validation: (value: string) => value === this.manager.password && value != '' }
          ]
        },
      ]
    }, 10);
  }


  ngOnInit(): void {
  }

  isFormValid() {
    for (const input of this.form) {
      const allRequirementsValid = input.requirements?.every((requirement) => requirement.isValid);
      if (allRequirementsValid === false) {
        Swal.fire({
          title: this.translate.instant("SIGNUP.ERROR.CONFLICT.TITLE"),
          text: this.translate.instant("SIGNUP.ERROR.INVALID.DESCRIPTION"),
          icon: "error"
        })
        return false;
      }
    }
    return true;
  }

  signup() {
    if (this.isFormValid()) {
      this.managerService.signup(this.manager).subscribe(() => {
        this.router.navigate(['/login'], 
          {
            queryParams: {
              created: true
            }
          }
        )
      }, error => {
        if (error.status === 409) {
          Swal.fire({
            title: this.translate.instant("SIGNUP.ERROR.CONFLICT.TITLE"),
            text: this.translate.instant("SIGNUP.ERROR.CONFLICT.DESCRIPTION"),
            icon: "error"
          })
        }
      });
    }
  }
}
