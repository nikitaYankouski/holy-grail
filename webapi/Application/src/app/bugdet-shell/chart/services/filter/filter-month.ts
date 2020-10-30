import { Filter } from './filter';

export class FilterMonth implements Filter {
    name = 'month';
    format = 'yyyy/MM';

    filter(dateToFilter: Date): Date {
        return new Date(dateToFilter.getFullYear(), dateToFilter.getMonth());
    }
} 