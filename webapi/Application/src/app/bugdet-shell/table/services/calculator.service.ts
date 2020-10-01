import { Injectable } from '@angular/core';
import { Operation } from '../operation';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  constructor() {}

  calculation(operations: Operation[], bank: number) {
    /*operations.forEach((operation, index) => {
      if (index === 1) {
        operation.balance = this.isInCome(operation, null, bank);
        debugger;
      } 
      else {
        operation.balance = this.isInCome(operation, operations[index-1], bank);
      }
    });*/

    for (let i = 0; i < operations.length; i++) {
      if (operations[i].id === 1) {
        operations[i].balance = this.isInCome(operations[i], null, bank);
      } 
      else {
        operations[i].balance = this.isInCome(operations[i], operations[i-1], bank);
      }
    }
    return operations;
  }

  isInCome(currentOperation: Operation, previousOperation: Operation, bank: number) {
    if (currentOperation.id === 1) {
      if (currentOperation.isIncome) {
        return bank + currentOperation.amountOfMoney;
      }
      else {
        return bank - currentOperation.amountOfMoney;
      }
    }
    else {
      if (currentOperation.isIncome) {
        return previousOperation.balance + currentOperation.amountOfMoney;
      }
      else {
        return previousOperation.balance - currentOperation.amountOfMoney;
      }
    }
  }
}
