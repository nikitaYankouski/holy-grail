export interface Filter {
    readonly name: string;
    readonly format: string;

    filter(dateToFilter: Date): Date;
}