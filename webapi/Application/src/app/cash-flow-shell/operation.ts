export interface Operation {
    id: number;
    budgetId: number;
    description: string;
    timestamp: Date;
    cashIn: number;
    cashOut: number;
    balance: number;
}
