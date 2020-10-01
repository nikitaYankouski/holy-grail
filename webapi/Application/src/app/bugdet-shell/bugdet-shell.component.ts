import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bugdet-shell',
  templateUrl: './bugdet-shell.component.html',
  styleUrls: ['./bugdet-shell.component.scss']
})
export class BugdetShellComponent implements OnInit {
  bankBuffer: number;

  constructor() { }

  ngOnInit(): void {
  }

  refreshBankBuffer(newValue: number) {
    this.bankBuffer = newValue;
  }
}
