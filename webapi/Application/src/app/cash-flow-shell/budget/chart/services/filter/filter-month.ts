import { Filter } from './filter';

export class FilterMonth implements Filter {
    name = 'month';
    format = 'MMM, y';

    filter(dateToFilter: Date): Date {
        return new Date(dateToFilter.getFullYear(), dateToFilter.getMonth());
    }
}
