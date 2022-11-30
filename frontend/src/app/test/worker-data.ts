import { WorkerModel } from "../model/Worker"
import { faker } from "@faker-js/faker";

export const createFakeWorkersData = (quantity: number) => {
    const workers: WorkerModel[] = [];
    for (let i = 0; i < quantity; i++) {
        workers.push({
            id: faker.random.numeric(2) as unknown as number,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            wage: faker.datatype.number({min: 1500, max: 60000}),
            birthday: faker.date.between("1970-01-01", "2001-01-01"),
            hiring: faker.date.between("2019-01-01", new Date().toString()),
            department: faker.commerce.department(),
            cpf: faker.random.alpha(10)
        })
    }
    return workers;
}