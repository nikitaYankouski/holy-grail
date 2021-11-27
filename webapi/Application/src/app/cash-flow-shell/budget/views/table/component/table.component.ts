import {Component, ElementRef, EventEmitter, Input, Output, Renderer2, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

import { TableService } from '../services/table.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Operation } from '../../../../operation';
import { ViewOperationTable } from '../view-operation-table';
import { DatePipe } from '@angular/common';
import { BudgetService } from '../../../budget.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {fromEvent, Subscription} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {CrudOperation} from '../../../crud-operation';
import {MatDialog} from '@angular/material/dialog';
import {EditoperationDialogComponent} from './editoperation-dialog/editoperation-dialog.component';
import {DialogData} from '../../../../dialog-edit-data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  private _bank;

  get bank(): number {
    return this._bank;
  }

  @Input() set bank(value: number) {
    this._bank = value;
    this.refreshDataInTable();
  }

  private _operations: Operation[];

  get operations(): Operation[] {
    return this._operations;
  }

  @Input() set operations(value: Operation[]) {
    this._operations = value;
    this.refreshDataInTable();
  }

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('userMenu') userMenu: TemplateRef<any>;

  @Output() updatedOperation = new EventEmitter<CrudOperation>();

  dataSource = new MatTableDataSource<ViewOperationTable>();

  sub: Subscription;

  overlayRef: OverlayRef | null;

  displayedColumns: string[] = [
    'description',
    'timestamp',
    'cashIn',
    'cashOut',
    'balance'
  ];

  @Input() templateRef: TemplateRef<any>;

  constructor(
    private tableService: TableService,
    private budgetService: BudgetService,
    public datePipe: DatePipe,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    public dialog: MatDialog
  ) { }

  refreshDataInTable(): void {
    if (typeof this.operations !== 'undefined') {
      this.calculateBalance(this.operations);
      this.dataSource.data = this.tableService.castToViewModel(this.operations);
    }
  }

  sortData(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.connect().subscribe(elements => {
      this.operations = this.tableService.castToOperations(elements);
    });

    /*this.refreshData();*/
    this.calculateBalance(this.operations);
    this.dataSource.data = this.tableService.castToViewModel(this.operations);
  }

  calculateBalance(operations: Operation[]): Operation[] {
    if ((typeof this.bank !== 'undefined') && (typeof this.bank !== 'string')) {
      return this.budgetService.calculateBalance(operations, this.bank);
    }
  }

  onDrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.operations, event.previousIndex, event.currentIndex);
    if (event.currentIndex !== event.previousIndex) {
      this.tableService.timeChange(this.operations, event.currentIndex);
      this.refreshDataInTable();
      this.updatedOperation.emit({
        type: 'update',
        operation: this.operations[event.currentIndex]
      });
    }
  }

  deleteOperation(operation: Operation): void {
    this.operations = this.operations.filter(operationFilter => operationFilter.id !== operation.id);
    this.refreshDataInTable();
    this.updatedOperation.emit({
      type: 'delete',
      operation: operation
    });
    this.closeUserMenu();
  }

  editOperation(viewOperation: ViewOperationTable): void {
    const operation = this.operations.find(it => it.id === viewOperation.id);
    const dialogRef = this.dialog.open(EditoperationDialogComponent, {
      width: '400px',
      data: {
        description: operation.description,
        date: operation.timestamp,
        isCome: typeof operation.cashIn !== 'undefined',
        amount: typeof operation.cashIn !== 'undefined' ? operation.cashIn : operation.cashOut
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (typeof result !== undefined) {
        operation.description = result.description;
        operation.timestamp = result.date;
        if (result.isCome) {
          operation.cashIn = result.amount;
        } else {
          operation.cashOut = result.amount;
        }
        this.refreshDataInTable();
        this.updatedOperation.emit({
          type: 'update',
          operation: operation
        });
        this.closeUserMenu();
      }
    });
  }

  openUserMenu(event: MouseEvent, user): void {
    event.preventDefault();
    this.closeUserMenu();

    const x = event.clientX;
    const y = event.clientY;

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({x, y})
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    this.overlayRef.attach(new TemplatePortal(this.userMenu, this.viewContainerRef, {
      $implicit: user
    }));

    this.sub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter(event => {
          const clickTarget = event.target as HTMLElement;
          return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
        }),
        take(1)
      ).subscribe(() => this.closeUserMenu())
  }

  closeUserMenu(): void {
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
