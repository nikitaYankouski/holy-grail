import {Operation} from '../operation';

export interface CrudOperation {
  type: string;
  operation: Operation;
}
