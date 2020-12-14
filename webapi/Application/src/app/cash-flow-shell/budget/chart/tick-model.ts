export class TickModel {
    leftMax: number;
    leftMin: number;
    stepSizeLeft: number;
    rightMax: number;
    rightMin: number;
    stepSizeRight: number;

    constructor() {
        this.leftMax = 0;
        this.leftMin = 0;
        this.stepSizeLeft = 0;
        this.rightMax = 0;
        this.rightMin = 0;
        this.stepSizeRight = 0;
    }
}
