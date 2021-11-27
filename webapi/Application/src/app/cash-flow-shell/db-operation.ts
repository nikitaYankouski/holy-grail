export interface DbOperation {
    id: number;
    userId: number;
    description: string;
    inCome: boolean;
    timeStamp: string;
    amountOfMoney: number;
}
