import { __decorate } from "tslib";
import { Component } from "@angular/core";
import { moveItemInArray } from "@angular/cdk/drag-drop";
let TableComponent = class TableComponent {
    constructor(operationsApi) {
        this.operationsApi = operationsApi;
    }
    ngOnInit() {
        this.getOperations();
    }
    getOperations() {
        this.operationsApi.getOperations().subscribe(operations => {
            this.operations = operations;
        });
    }
    onDrop(event) {
        moveItemInArray(this.operations, event.previousIndex, event.currentIndex);
        this.operations.forEach((operation, idx) => {
            operation.id = idx + 1;
        });
    }
};
TableComponent = __decorate([
    Component({
        selector: 'app-table',
        templateUrl: './table.component.html',
        styleUrls: ['./table.component.scss']
    })
], TableComponent);
export { TableComponent };
//# sourceMappingURL=table.component.js.map