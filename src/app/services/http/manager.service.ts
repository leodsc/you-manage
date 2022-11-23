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

  login(manager: ManagerModel) {
    return this.http.post<ManagerModel>(environment.baseServerUrl+"/manager/login", manager);
  }

  setData(manager: ManagerModel) {
    this.data = manager;
  }

  getEmployees(page: number, employeesPerPage: number, order?: string, by?: string) {
    return this.http.get<WorkerModel[]>(
      environment.baseServerUrl+`/manager/${this.data.id}/employees?page=${page}&size=${employeesPerPage}&order=${order ?? "ASC"}&by=${by ?? "wage"}`, 
      { headers: { Authorization: this.data.token! }}
    );
  }

  getTotalEmployees() {
    return this.http.get<number>(
      environment.baseServerUrl+`/manager/${this.data.id}/employees/total`,
      { headers: { Authorization: this.data.token! }}
    )
  }

  isTokenValid() {
    return this.http.get(`/manager?token=${this.data.token}`);
  }
}
