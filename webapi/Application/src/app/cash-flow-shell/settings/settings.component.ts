import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  enteringBank: number;

  constructor() { }

  passingBank(value: string): void {
    this.enteringBank = parseInt(value);
  }
}
