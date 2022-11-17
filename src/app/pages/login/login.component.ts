import { Component, OnInit } from '@angular/core';
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

  public labels: Label[] = [
    { title: "Email", name: "email", placeholder: "Digite seu e-mail", data: "email" },
    { title: "Senha", name: "password", placeholder: "Digite sua senha", data: "password"}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
