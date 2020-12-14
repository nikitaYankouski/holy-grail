import { TickModel } from './tick-model';

export class ScalingCalculations {

  static roundUpNext(scaleMax: number, scaleMin: number, type: string): TickModel {
    const roundScales: TickModel = new TickModel();

    const scale = Math.abs(scaleMax) + Math.abs(scaleMin);
    const step = this.getStep(scale);

    const numberStepInPositiveArea = Math.floor(Math.abs(scaleMax) / step) + 1;
    const numberStepInNegativeArea = Math.floor(Math.abs(scaleMin) / step) + 1;

    if (type === 'right') {
      roundScales.rightMax = step * numberStepInPositiveArea;
      roundScales.rightMin = scaleMin === 0 ? 0 : -Math.abs(step * numberStepInNegativeArea);
      roundScales.stepSizeRight = step;
      return roundScales;
    }

    roundScales.leftMax = step * numberStepInPositiveArea;
    roundScales.leftMin = scaleMin === 0 ? 0 : -Math.abs(step * numberStepInNegativeArea);
    roundScales.stepSizeLeft = step;
    return roundScales;
  }

  static roundLastDigit(leftMin: number, numberSteps): number {
    if (numberSteps === 1) {
      return Math.round(leftMin);
    }

    leftMin = Math.round(leftMin);
    do { leftMin++; } while (!Number.isInteger(leftMin / numberSteps));

    return leftMin;
  }

  private static getStep(scale: number): number {
    const step = 7;
    const numberDigits = Math.round(scale / step).toString().length;
    return Number((this.getDigitFromNumber(Math.round(scale / step), 0)) +
      (this.concatZeros(numberDigits - 1)));
  }

  private static getDigitFromNumber(value: number, index: number): number {
    return Number(value.toString().charAt(index));
  }

  private static concatZeros(value: number): string {
    let zeros = '';
    for (let count = 0; count < value; count++) { zeros += '0'; }
    return zeros;
  }
}
