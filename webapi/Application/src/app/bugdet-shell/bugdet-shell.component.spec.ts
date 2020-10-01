import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugdetShellComponent } from './bugdet-shell.component';

describe('BugdetShellComponent', () => {
  let component: BugdetShellComponent;
  let fixture: ComponentFixture<BugdetShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugdetShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugdetShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
