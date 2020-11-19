import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  enteringBank: number;

  constructor() { }

  ngOnInit(): void {
  }

  passingBank(value: string) {
    this.enteringBank = parseInt(value);
  }
}
