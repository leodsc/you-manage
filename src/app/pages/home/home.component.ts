import { ArrayType } from '@angular/compiler';
import { Component, OnInit, Output } from '@angular/core';
import { orderBy }from "lodash";
import { Worker } from 'src/app/model/Worker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private alreadyClicked = false;
  private clickTimer: ReturnType<typeof setTimeout> | null = null;
  test: string;

  selecteds: number[] = [];
  totalScrolled: number = 0;
  columns = ["#", "Nome", "Salário", "CPF", "Nascimento", "Contratação", "Departamento"]
  workers: Worker[] = [
    { id: 1, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 2, name: "Leonardo", wage: 1000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 3, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 4, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 5, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 6, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 7, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 8, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 9, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 10, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 11, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 12, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 13, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 14, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 15, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 16, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 17, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 18, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 19, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 20, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 21, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 22, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 23, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 24, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 25, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 26, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 27, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 28, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 29, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 30, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 1, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 1, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 1, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 1, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 1, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 1, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 1, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 1, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 1, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 1, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 1, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 1, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 1, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 1, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 1, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 1, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false },
    { id: 1, name: "Leonardo", wage: 10000, cpf: "243.232.233-22", birthday: new Date(), hiring: new Date(), department: "TI", isSelected: false }
  ]
  currentPage: number = 1;
  initialRow = 0;
  workersQuantity: number = 10;
  finalRow = this.initialRow + this.workersQuantity;
  pages: number[];
  showNav = true;
  order: "asc" | "desc" = "asc";
  column: string = "wage";

  toDate(value: any) {
    return new Date(value);
  }

  constructor() { }

  ngOnInit(): void {
    this.loadPagination();
  }

  loadPagination() {
    this.pages = new Array(Math.ceil(this.workers.length/this.workersQuantity))
      .fill(0)
      .map((value: number, index: number) => {
        return value+index+1;
      })
  }

  changeOrder(column: string, order: "asc" | "desc") {
    this.workers = orderBy(this.workers, [ column ], [ order ])
    console.log(this.workers);
  }

  reloadTable() {
    this.loadPagination();
    this.changePage(1);
    this.finalRow = this.initialRow + this.workersQuantity;
  }

  changePage(page: number) {
    if (page > 0 && page <= this.pages.length) {
      this.currentPage = page;
      this.initialRow = this.workersQuantity*(this.currentPage-1);
      this.finalRow = this.initialRow + this.workersQuantity;
    }
  }

  onScrollTable($event: Event) {
    const elem = $event.target as HTMLTableSectionElement;
    //this.totalScrolled = elem.scrollTop;
  }

  rowSelected($event: Event | MouseEvent, worker: Worker) {
    const isRowInputSelected = $event.target instanceof HTMLInputElement;
    const isRowSelected = $event.currentTarget instanceof HTMLTableRowElement;
    if (isRowInputSelected) {
      worker.isSelected = !worker.isSelected;
    } else if (isRowSelected) {
      if (this.alreadyClicked === false) {
        this.alreadyClicked = true;
        this.clickTimer = setTimeout(() => {
          this.alreadyClicked = false;
        }, 300)
      } else {
        clearTimeout(this.clickTimer!);
        this.alreadyClicked = false;
        worker.isSelected = !worker.isSelected;
      }
    }
  }

  keepOrder(a: any, b: any) {
    return a;
  }
}
