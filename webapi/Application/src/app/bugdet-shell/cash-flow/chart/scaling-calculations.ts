import { TickModel } from './tick-model';

export class ScalingCalculations {

  // clear code
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

    do { leftMin++; } while (!Number.isInteger(leftMin/numberSteps));

    console.log('leftMin', leftMin);

    return leftMin;
  }

  private static getStep(scale: number): number {
    const step = 7;
    const numberDigits = Math.round(scale / step).toString().length;
    return Number((this.getDigitFromNumber(Math.round(scale / step), 0)) +
      (this.concateZeros(numberDigits - 1)));
  }

  private static getDigitFromNumber(number: number, index: number): number {
    return Number(number.toString().charAt(index));
  }

  private static concateZeros(number: number): string {
    let zeros: string = '';
    for (let count = 0; count < number; count++) { zeros += '0'; }
    return zeros;
  }
}
