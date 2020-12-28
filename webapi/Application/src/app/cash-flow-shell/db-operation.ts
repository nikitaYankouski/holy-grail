export interface DbOperation {
    id: number;
    budgetId: number;
    description: string;
    isIncome: boolean;
    timestamp: string;
    amountOfMoney: number;
}
