import { TestBed } from '@angular/core/testing';

import { BugdetShellService } from './bugdet-shell.service';

describe('BugdetShellService', () => {
  let service: BugdetShellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BugdetShellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
