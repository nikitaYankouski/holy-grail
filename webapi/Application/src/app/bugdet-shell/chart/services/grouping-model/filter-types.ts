import { Filter } from './filter';

export class FilterTypes {
    static year: Filter = { 
        from: 0, 
        length: 4,
        name: 'year'
    };

    static month: Filter = { 
        from: 0, 
        length: 7,
        name: 'month'
    };
    
    static day: Filter = { 
        from: 0, 
        length: 10,
        name: 'day'
    };
    
    static noFilter: Filter = {
        from: null,
        length: null,
        name: 'noFilter'
    }
} 