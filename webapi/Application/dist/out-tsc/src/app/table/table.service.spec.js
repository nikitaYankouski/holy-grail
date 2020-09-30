import { TestBed } from '@angular/core/testing';
import { TableService } from './table.service';
describe('TableService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TableService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=table.service.spec.js.map