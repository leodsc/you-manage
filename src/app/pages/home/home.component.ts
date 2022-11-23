import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { orderBy }from "lodash";
import { WorkerModel } from 'src/app/model/Worker';
import { ManagerService } from 'src/app/services/http/manager.service';
import { createFakeWorkersData } from 'src/app/test/worker-data';
import  { keys } from "ts-transformer-keys";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @HostListener("window:resize")
  resize() {
    if (window.innerWidth > 700) {
      this.showNav = true;
    }
  }

  private alreadyClicked = false;
  private clickTimer: ReturnType<typeof setTimeout> | null = null;

  totalSelected: number = 0;
  totalScrolled: number = 0;
  columns = ["#", "Nome", "Salário", "CPF", "Nascimento", "Contratação", "Departamento"]
  // workersProperties = [ "id", "name", "wage", "cpf", "birthday", "hiring", "department" ]
  workers: WorkerModel[][] = [];
  workersProperties: string[];
  currentPage: number = 1;
  initialRow = 0;
  workersQuantity: number = 10;
  finalRow = this.initialRow + this.workersQuantity;
  pages: number[];
  showNav = false;
  order: "asc" | "desc" = "asc";
  column: string = "wage";
  currentLanguage = navigator.language;
  totalEmployees: number;

  constructor(private translate: TranslateService, private managerHttpService: ManagerService) {
    this.translate.setDefaultLang("pt");
    this.loadPagination();
    this.managerHttpService.getEmployees(1, 10).subscribe(employee => {
      this.workers[0] = employee;
      this.workersProperties = Object.keys(this.workers[0][0]);
    });
    translate.use(navigator.language.slice(0, 2));
  }
  
  @ViewChild("pagination")
  pagination: ElementRef;

  ngOnInit(): void {
    if (window.innerWidth > 700) {
      this.showNav = true;
    }
  }

  loadPagination() {
    this.managerHttpService.getTotalEmployees().subscribe(total => {
      this.totalEmployees = total;
      this.workers = new Array(Math.ceil(total/this.workersQuantity)).fill(0).map(() => []);
      this.pages = new Array(Math.ceil(total/this.workersQuantity-1))
        .fill(0)
        .map((value: number, index: number) => {
          return value+index+1;
        })
    })
  }

  changeSort() {
    // this.workers = orderBy(this.workers, [ this.column ], [ this.order ])
    this.changePage(1);
    this.managerHttpService.getEmployees(1, this.workersQuantity, this.order, this.column).subscribe(employees => {
      
    })
  }

  reloadTable() {
    this.loadPagination();
    this.changePage(1);
    this.managerHttpService.getEmployees(1, this.workersQuantity).subscribe(employee => {
      this.workers[0] = employee;
    });
  }

  changePage(page: number) {
    if (page > 0 && page <= this.pages.length) {
      this.currentPage = page;
      this.initialRow = this.workersQuantity*(this.currentPage-1);
      this.finalRow = this.initialRow + this.workersQuantity;
      if (this.workers[this.currentPage-1].length === 0) {
        this.managerHttpService.getEmployees(page, this.workersQuantity).subscribe(workers => {
          this.workers[this.currentPage-1] = workers;
        });
      }
    }
  }

  onScrollTable($event: Event) {
    const elem = $event.target as HTMLTableSectionElement;
    //this.totalScrolled = elem.scrollTop;
  }

  rowSelected($event: Event | MouseEvent, worker: WorkerModel) {
    const isRowInputSelected = $event.target instanceof HTMLInputElement;
    const isRowSelected = $event.currentTarget instanceof HTMLTableRowElement;
    if (isRowInputSelected) {
      worker.isSelected = !worker.isSelected;
      worker.isSelected ? this.totalSelected++ : this.totalSelected--;
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
        worker.isSelected ? this.totalSelected++ : this.totalSelected--;
      }
    }
  }

  keepOrder = (a: any, b: any) => {
    return a;
  }
}
