export class ScalingCalculations {
    static percentageOfNumberCalculation(number: number, percent: number): number {
        return number * (percent / 100);
    }

    static percentageCalculation(numberFrom: number, numberTo: number): number {
        return (numberTo / numberFrom) * 100;
    }

    static roundUpToNextDigit(number: number): number {
        let numberOfDigits = (Math.log10((number ^ (number >> 31)) - (number >> 31)) | 0);
        
        let divider = '1';
        for (let i = 0; i < numberOfDigits; i++) { 
          divider += '0';
        }
    
        let numberRank = 1;
          let secondPosition = number.toString().charAt(1);
          if (secondPosition !== "") {
          numberRank = Number(secondPosition) >= 5 ? 0 : 1;
        }
    
        let valueToReturn = (Math.round(number / Number(divider)) + numberRank).toString();
        for (let i = 0; i < numberOfDigits; i++) { 
          valueToReturn += '0';
        }
    
        return Number(valueToReturn);
    }
}