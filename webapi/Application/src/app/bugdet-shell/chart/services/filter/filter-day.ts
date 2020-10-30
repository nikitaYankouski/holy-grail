import { Filter } from './filter';

export class FilterDay implements Filter {
    name = 'day';
    format = 'yyyy/MM/dd';

    filter(dateToFilter: Date): Date {
        return dateToFilter;
    }
} 