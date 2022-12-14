import { AppForm } from "../common/form/app-form";
import { WorkerModel } from "./Worker"

export class ManagerModel {
   id: number;
   name: string;
   password: string;
   email: string;
   employees: WorkerModel[];
   token?: string;

   constructor(email?: string, password?: string, token?: string, form?: AppForm){
      this.email = email ?? "";
      this.password = password ?? "";
      this.token = token ?? ""
   }
}