import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AppForm } from './app-form';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input()
  form: AppForm[];

  constructor() { 
  }

  ngOnInit(): void {
  }

  closeRequirements() {
    for (const input of this.form) {
      if (input.requirements?.every(requirement => requirement.isValid)) {
        input.showAllRequirements = false;
      }
      input.model[input.name] = input.transform ? input.transform(input.model[input.name]) : input.model[input.name];
    }
  }
}
