import { Filter } from './filter';

export class FilterYear implements Filter {
    name = 'year';
    format = 'yyyy';

    filter(dateToFilter: Date): Date {
        return new Date(dateToFilter.getFullYear().toString());
    }
}