import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../../../../../dialog-edit-data';

@Component({
  selector: 'app-editoperation-dialog',
  templateUrl: './editoperation-dialog.component.html',
  styleUrls: ['./editoperation-dialog.component.scss']
})
export class EditoperationDialogComponent implements OnInit {

  descriptionInput: string;

  dateInput: Date;

  isCome: string;

  amountOfMoney: number;

  constructor(public dialogRef: MatDialogRef<EditoperationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.descriptionInput = this.data.description;
    this.dateInput = this.data.date;
    this.isCome = this.data.isCome ? 'Cash in' : 'Cash out';
    this.amountOfMoney = this.data.amount;
  }

  onNoClick(typeButton: string): void {
    const dataDialog: DialogData = {
      description: this.descriptionInput,
      date: this.dateInput,
      isCome: this.isCome === 'Cash in',
      amount: this.amountOfMoney
    };

    this.dialogRef.close(typeButton !== 'close' ?
      dataDialog : undefined);
  }
}
