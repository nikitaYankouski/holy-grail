import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Operation} from '../../operation';
import {CrudOperation} from '../crud-operation';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent {

  @Input() enteredFilteredOperationsByDate: Operation[];

  @Input() enteredOperationCRUD: CrudOperation;

  @Input() bank: number;

  @Output() editedOperation = new EventEmitter<Operation>();

  constructor() { }

  enterOperation(operation: Operation): void {
    this.editedOperation.emit(operation);
  }
}
