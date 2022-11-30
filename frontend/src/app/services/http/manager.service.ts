import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { ManagerModel } from 'src/app/model/Manager';
import { WorkerModel } from 'src/app/model/Worker';
import { environment } from 'src/environments/environment';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private headers = new HttpHeaders({});
  order: string = "asc";
  by: string = "wage";
  data: ManagerModel;

  constructor(private http: HttpClient, private messageService: MessageService) {
    const token = localStorage.getItem("you-manage-manager");
    if (token !== null) {
      const lastTimeLoggedIn = new Date(JSON.parse(localStorage.getItem("you-manage-token-time")!));
      const tokenExpiration = new Date(lastTimeLoggedIn).getTime() + 60*60*24*1000;
      if (lastTimeLoggedIn < new Date(tokenExpiration)) {
        this.data = JSON.parse(token) as ManagerModel;
      }
    }
  }

  login(manager: ManagerModel) {
    return this.http.post<ManagerModel>(environment.baseServerUrl+"/manager/login", manager);
  }

  reset() {
    this.data = new ManagerModel();
    localStorage.removeItem("you-manage-token-time");
    localStorage.removeItem("you-manage-manager");
  }

  setData(manager: ManagerModel) {
    localStorage.setItem("you-manage-manager", JSON.stringify(manager));
    localStorage.setItem("you-manage-token-time", JSON.stringify(new Date()));
    this.data = manager;
  }

  sort(order: string, by: string) {
    this.order = order;
    this.by = by;
  }

  getEmployees(page: number, employeesPerPage: number) {
    return this.http.get<WorkerModel[]>(
      environment.baseServerUrl+`/manager/${this.data.id}/employees?page=${page}&size=${employeesPerPage}&order=${this.order ?? "ASC"}&by=${this.by ?? "wage"}`, 
      { headers: { Authorization: this.data.token! }}
    );
  }

  delete(workers: WorkerModel[]) {
    return this.http.delete<WorkerModel[]>(environment.baseServerUrl+`/employee`, {
      headers: {
        Authorization: this.data.token!
      },
      body: workers
    })
  }

  getTotalEmployees() {
    return this.http.get<number>(
      environment.baseServerUrl+`/manager/${this.data.id}/employees/total`,
      { headers: { Authorization: this.data.token! }}
    )
  }
  
  createWorker(worker: WorkerModel) {
    worker.manager = new ManagerModel();
    worker.manager.id = this.data.id;
    return this.http.post<WorkerModel>(environment.baseServerUrl+`/employee`, worker, {
      headers: {
        Authorization: this.data.token!
      },
    })
  }

  isTokenValid() {
    return this.http.get(environment.baseServerUrl+`/manager?token=${this.data.token}`);
  }

  signup(manager: ManagerModel) {
    return this.http.post(environment.baseServerUrl+`/manager/signup`, manager);
  }
}
