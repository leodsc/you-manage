import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ManagerModel } from 'src/app/model/Manager';
import { WorkerModel } from 'src/app/model/Worker';
import { environment } from 'src/environments/environment';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private headers = new HttpHeaders({});
  data: ManagerModel;

  constructor(private http: HttpClient, private messageService: MessageService) {}

  set token(value: string) {
    this.headers = this.headers.set("Authorization", value);
  }

  login(manager: ManagerModel) {
      return this.http.post<ManagerModel>(environment.baseServerUrl+"/manager/login", manager);
  }

  getEmployees(page: number, employeesPerPage: number) {
    return this.http.post<WorkerModel[]>(
      environment.baseServerUrl+`/manager/${this.data.id}/employees?page=${page}&size=${employeesPerPage}&order=ASC&by=wage`, 
      { headers: this.headers }
    );
  }

  isTokenValid() {
    return this.http.get(`/manager?token=${this.data.token}`);
  }
}
