import { Filter } from './filter';

export class FilterDay implements Filter {
    name = 'day';
    format = 'MMM d, y';

    filter(dateToFilter: Date): Date {
        return dateToFilter;
    }
}
