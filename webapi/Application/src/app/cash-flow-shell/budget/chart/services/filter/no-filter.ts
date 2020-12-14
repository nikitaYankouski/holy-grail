import { Filter } from './filter';

export class NoFilter implements Filter {
    name = 'noFilter';
    format = undefined;

    filter(): undefined { return undefined; }
}
