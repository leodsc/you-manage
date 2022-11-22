import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ManagerModel } from 'src/app/model/Manager';
import { ManagerService } from 'src/app/services/http/manager.service';
import { MessageService } from 'src/app/services/message.service';
import { Label } from 'src/app/types/form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  backgrounds = {
    mobile: ["welcome-1", "welcome-2", "welcome-3"],
    desktop: ["welcome-1", "welcome-2", "welcome-3"]
  }
  manager: ManagerModel = new ManagerModel();

  constructor(private translate: TranslateService, private managerService: ManagerService, private router: Router, private messageService: MessageService) {
    translate.use(navigator.language.slice(0, 2));
  }

  ngOnInit(): void {
  }

  login() {
    this.managerService.login(this.manager).subscribe(manager => {
      if (manager.token !== undefined) {
        this.managerService.data = manager;
        this.router.navigate([ "/" ]);
      }
    }, error => {
      if (error.status === 0) {
        this.messageService.send("login-page", {
          title: "Erro no servidor",
          description: "Um erro desconhecido foi detectado e reportado. Desculpe!",
          timeout: 8000,
          level: "danger"
        })
      } else if (error.status === 401) {
        this.messageService.send("login-page", {
          title: "Não foi possível entrar.",
          description: "Email ou senha incorretos.",
          timeout: 6000,
          level: "danger",
        })
      }
    })
  }
}
