import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../../../../../dialog-edit-data';

@Component({
  selector: 'app-addoperation-dialog',
  templateUrl: './addoperation-dialog.component.html',
  styleUrls: ['./addoperation-dialog.component.scss']
})
export class AddoperationDialogComponent implements OnInit {

  descriptionInput: string;

  dateInput: Date;

  isCome: string;

  amountOfMoney: number;

  constructor(public dialogRef: MatDialogRef<AddoperationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
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
