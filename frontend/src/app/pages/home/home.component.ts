import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { faker } from '@faker-js/faker';
import { TranslateService } from '@ngx-translate/core';
import { AppForm } from 'src/app/common/form/app-form';
import { WorkerModel } from 'src/app/model/Worker';
import { ManagerService } from 'src/app/services/http/manager.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @HostListener('window:resize')
  resize() {
    if (window.innerWidth > 700) {
      this.showNav = true;
    }
  }

  @ViewChild('addWorkerPopup')
  addWorkerPopup: any;

  @ViewChild('deleteWorker')
  deleteWorker: any;

  @ViewChild('mustSelectWorker')
  mustSelectWorker: any;

  private alreadyClicked = false;
  private clickTimer: ReturnType<typeof setTimeout> | null = null;

  worker: WorkerModel = {} as WorkerModel;
  totalSelected: number = 0;
  totalScrolled: number = 0;
  selectedWorkers: WorkerModel[] = [];
  workers: WorkerModel[][] = [];
  workersProperties: string[];
  currentPage: number = 1;
  workersQuantity: number = 10;
  pages: number[];
  showNav = false;
  order: 'ASC' | 'DESC' | 'A-Z' | 'Z-A' = 'ASC';
  column: string = 'wage';
  currentLanguage = navigator.language;
  totalEmployees: number;

  form: AppForm[] = [
    {
      htmlFor: 'firstName',
      type: 'text',
      placeholder: 'HOME.ADD_WORKER.FIRST_NAME',
      title: 'HOME.FIRST_NAME',
      model: this.worker,
      name: 'firstName',
      requirements: [
        {
          text: this.translate.instant(
            'SIGNUP.INPUTS.REQUIREMENTS.NAME.MINIMUM_LENGTH'
          ),
          validation: (value: string) => value.length >= 2,
        },
        {
          text: this.translate.instant(
            'SIGNUP.INPUTS.REQUIREMENTS.NAME.MAXIMUM_LENGTH'
          ),
          validation: (value: string) => value.length < 32,
        },
      ],
    },
    {
      htmlFor: 'lastName',
      type: 'text',
      placeholder: 'HOME.ADD_WORKER.LAST_NAME',
      title: 'HOME.LAST_NAME',
      model: this.worker,
      name: 'lastName',
      requirements: [
        {
          text: this.translate.instant(
            'SIGNUP.INPUTS.REQUIREMENTS.NAME.MINIMUM_LENGTH'
          ),
          validation: (value: string) => value.length >= 2,
        },
        {
          text: this.translate.instant(
            'SIGNUP.INPUTS.REQUIREMENTS.NAME.MAXIMUM_LENGTH'
          ),
          validation: (value: string) => value.length < 32,
        },
      ],
    },
    {
      htmlFor: 'email',
      type: 'email',
      placeholder: 'HOME.ADD_WORKER.EMAIL',
      title: 'HOME.EMAIL',
      model: this.worker,
      name: 'email',
      requirements: [
        {
          text: this.translate.instant(
            'SIGNUP.INPUTS.REQUIREMENTS.EMAIL.IS_VALID'
          ),
          validation: (value: string) =>
            value.match(
              new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
            ) !== null,
        },
      ],
    },
    {
      htmlFor: 'wage',
      type: 'number',
      placeholder: 'HOME.ADD_WORKER.WAGE',
      title: 'HOME.WAGE',
      model: this.worker,
      name: 'wage',
    },
    {
      htmlFor: 'cpf',
      type: 'text',
      placeholder: 'HOME.ADD_WORKER.CPF',
      title: 'HOME.CPF',
      model: this.worker,
      name: 'cpf',
      requirements: [
        {
          text: 'CPF deve ser no formato XXX.XXX.XXX-XX',
          validation: (value: string) =>
            value.match(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}/) !== null,
        },
      ],
      transform: (value: string) => `${value.slice(0, 2)}`,
    },
    {
      htmlFor: 'birthday',
      type: 'date',
      placeholder: 'HOME.ADD_WORKER.BIRTHDAY',
      title: 'HOME.BIRTHDAY',
      model: this.worker,
      name: 'birthday',
    },
    {
      htmlFor: 'hiring',
      type: 'date',
      placeholder: 'HOME.ADD_WORKER.HIRING',
      title: 'HOME.HIRING',
      model: this.worker,
      name: 'hiring',
    },
    {
      htmlFor: 'department',
      type: 'text',
      placeholder: 'HOME.ADD_WORKER.DEPARTMENT',
      title: 'HOME.DEPARTMENT',
      model: this.worker,
      name: 'department',
    },
  ];

  constructor(
    private translate: TranslateService,
    private managerHttpService: ManagerService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.translate.setDefaultLang('pt');
    this.loadPagination();
    translate.use(navigator.language.slice(0, 2));
    faker.setLocale(
      `${navigator.language.slice(0, 2)}_${navigator.language.slice(3, 5)}`
    );
  }

  @ViewChild('pagination')
  pagination: ElementRef;

  ngOnInit(): void {
    if (window.innerWidth > 700) {
      this.showNav = true;
    }
  }
  ngAfterViewInit(): void {
    this.getEmployees(0);
  }

  private getEmployees(page: number) {
    this.managerHttpService
      .getEmployees(page, this.workersQuantity)
      .subscribe((employee) => {
        this.workers[0] = employee;
        this.workersProperties = [
          'id',
          'firstName',
          'lastName',
          'email',
          'cpf',
          'wage',
          'department',
          'birthday',
          'hiring',
        ];
      });
  }

  loadPagination() {
    this.managerHttpService.getTotalEmployees().subscribe((total) => {
      this.totalEmployees = total;
      const pages = Math.ceil(total / this.workersQuantity - 1) + 1;
      this.workers = new Array(Math.ceil(total / this.workersQuantity))
        .fill(0)
        .map(() => []);
      this.pages = new Array(pages < 0 ? 0 : pages)
        .fill(0)
        .map((value: number, index: number) => {
          return value + index + 1;
        });
    });
  }

  isFormValid() {
    for (const input of this.form) {
      const allRequirementsValid = input.requirements?.every(
        (requirement) => requirement.isValid
      );
      if (allRequirementsValid === false) {
        Swal.fire({
          title: this.translate.instant('SIGNUP.ERROR.CONFLICT.TITLE'),
          text: this.translate.instant('SIGNUP.ERROR.INVALID.DESCRIPTION'),
          icon: 'error',
        });
        return false;
      }
    }
    return true;
  }

  changeSort() {
    // this.workers = orderBy(this.workers, [ this.column ], [ this.order ])
    this.changePage(1);
    this.workers = new Array(
      Math.ceil(this.totalEmployees / this.workersQuantity)
    )
      .fill(0)
      .map(() => []);
    if (this.isColumnNumber() && this.order === 'A-Z') {
      this.order = 'ASC';
    } else if (this.isColumnNumber() && this.order === 'Z-A') {
      this.order = 'DESC';
    } else if (this.isColumnAlpha() && this.order === 'ASC') {
      this.order = 'A-Z';
    } else if (this.isColumnAlpha() && this.order === 'DESC') {
      this.order = 'Z-A';
    }
    this.managerHttpService.sort(this.order, this.column);
    this.managerHttpService
      .getEmployees(0, this.workersQuantity)
      .subscribe((workers) => {
        this.workers[0] = workers;
      });
  }

  erase() {
    this.managerHttpService.delete(this.selectedWorkers).subscribe(() => {
      this.selectedWorkers = [];
      this.totalSelected = 0;
      this.reloadTable();
    });
  }

  reloadTable() {
    this.loadPagination();
    this.changePage(1, true);
  }

  changePage(page: number, reload?: boolean) {
    if (page > 0 && page <= this.pages.length) {
      this.currentPage = page;
      if (this.workers[this.currentPage - 1].length === 0 || reload) {
        this.managerHttpService
          .getEmployees(1, this.workersQuantity)
          .subscribe((workers) => {
            console.log(workers);
            this.workers[this.currentPage - 1] = workers;
          });
      }
    }
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
        }, 300);
      } else {
        clearTimeout(this.clickTimer!);
        this.alreadyClicked = false;
        worker.isSelected = !worker.isSelected;
        worker.isSelected ? this.totalSelected++ : this.totalSelected--;
      }
    }
    if (worker.isSelected) {
      this.selectedWorkers.push(worker);
    } else {
      this.selectedWorkers = this.selectedWorkers.filter(
        (selectedWorker) => selectedWorker.id !== worker.id
      );
    }
  }

  isColumnNumber() {
    return ['wage', 'birthday', 'hiring', 'id'].includes(this.column);
  }

  isColumnAlpha() {
    return ['firstName', 'lastName', 'email', 'department', 'manager'].includes(
      this.column
    );
  }

  keepOrder = (a: any, b: any) => {
    return a;
  };

  eraseWorkerPopup() {
    if (this.selectedWorkers.length === 0) {
      this.mustSelectWorker.fire();
    } else {
      this.deleteWorker.fire();
    }
  }

  addNewWorker() {
    if (this.isFormValid()) {
      this.managerHttpService.createWorker(this.worker).subscribe(
        (worker) => {
          this.getEmployees(0);
          Swal.fire({
            text: this.translate.instant('HOME.ADD_WORKER.SUCCESS_TEXT', {
              firstName: worker.firstName,
              lastName: worker.lastName,
            }),
            confirmButtonColor: '#28a745',
            color: 'black',
            icon: 'success',
          });
        },
        (error) => {
          if (error.status === 500) {
            Swal.fire({
              title: this.translate.instant('HOME.ERRORS.ADD_WORKER.TITLE'),
              text: this.translate.instant(
                'HOME.ERRORS.ADD_WORKER.INVALID_DATA'
              ),
              icon: 'error',
            });
          } else if (error.status === 409) {
            Swal.fire({
              title: this.translate.instant(
                'HOME.ERRORS.ADD_WORKER.CONFLICT.TITLE'
              ),
              text: this.translate.instant('HOME.ERRORS.ADD_WORKER.CONFLICT'),
              icon: 'error',
              confirmButtonColor: '#dc3545',
            });
          }
        }
      );
    } else {
      Swal.fire({
        title: this.translate.instant('HOME.ERRORS.ADD_WORKER.TITLE'),
        text: this.translate.instant('HOME.ERRORS.UNKNOWN'),
        icon: 'error',
      });
    }
  }

  getLang() {
    return this.translate.currentLang;
  }

  changeLang() {
    this.translate.use(this.translate.currentLang === 'pt' ? 'en' : 'pt');
    this.cdr.detectChanges();
  }

  randomWorkerData() {
    this.worker.firstName = faker.name.firstName();
    this.worker.lastName = faker.name.lastName();
    (this.worker.email = faker.internet
      .email(this.worker.firstName, this.worker.lastName)
      .toLowerCase()),
      (this.worker.wage = faker.datatype.number({ min: 1500, max: 60000 })),
      (this.worker.birthday = faker.date.between('1970-01-01', '2001-01-01')),
      (this.worker.hiring = faker.date.between(
        '2019-01-01',
        new Date().toString()
      )),
      (this.worker.department = faker.commerce.department()),
      (this.worker.cpf = faker.helpers.regexpStyleStringParse(
        '[0-9][0-9][0-9].[0-9][0-9][0-9].[0-9][0-9][0-9]-[0-9][0-9]'
      ));
  }

  logout() {
    this.managerHttpService.reset();
    this.router.navigate(['/login'], {
      queryParams: {
        logout: true,
      },
    });
  }
}
