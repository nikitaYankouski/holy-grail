export interface Operation {
    id: number;
    userId: number;
    description: string;
    timestamp: Date;
    cashIn: number;
    cashOut: number;
    balance: number;
}
