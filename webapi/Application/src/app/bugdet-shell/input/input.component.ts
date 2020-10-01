import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Output() bank = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onKey(value: string) {
    this.bank.emit(parseInt(value));
  }
}
