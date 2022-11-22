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

  selecteds: number[] = [];
  totalScrolled: number = 0;
  columns = ["#", "Nome", "Salário", "CPF", "Nascimento", "Contratação", "Departamento"]
  // workersProperties = [ "id", "name", "wage", "cpf", "birthday", "hiring", "department" ]
  workers: WorkerModel[] = createFakeWorkersData(100);
  workersProperties = Object.keys(this.workers[0]);
  currentPage: number = 1;
  initialRow = 0;
  workersQuantity: number = 10;
  finalRow = this.initialRow + this.workersQuantity;
  pages: number[];
  showNav = false;
  order: "asc" | "desc" = "asc";
  column: string = "wage";
  currentLanguage = navigator.language;

  constructor(private translate: TranslateService, private managerHttpService: ManagerService) {
    this.translate.setDefaultLang("pt");
    this.managerHttpService.getEmployees(1, 10).subscribe(employee => {
      this.workers = employee;
      this.workersProperties = Object.keys(this.workers[0]);
    });
    translate.use(navigator.language.slice(0, 2));
  }
  
  @ViewChild("pagination")
  pagination: ElementRef;

  ngOnInit(): void {
    this.loadPagination();
    if (window.innerWidth > 700) {
      this.showNav = true;
    }
  }

  loadPagination() {
    this.pages = new Array(Math.ceil(this.workers.length/this.workersQuantity))
      .fill(0)
      .map((value: number, index: number) => {
        return value+index+1;
      })
  }

  changeSort() {
    this.workers = orderBy(this.workers, [ this.column ], [ this.order ])
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

  rowSelected($event: Event | MouseEvent, worker: WorkerModel) {
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

  keepOrder = (a: any, b: any) => {
    return a;
  }
}
