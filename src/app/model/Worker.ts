import { ManagerModel } from "./Manager"

export type WorkerModel = {
    id: number,
    firstName: string,
    email: string,
    lastName: string,
    wage: number,
    cpf: string,
    birthday: Date,
    hiring: Date,
    department: string,
    isSelected?: boolean,
    manager: ManagerModel
}