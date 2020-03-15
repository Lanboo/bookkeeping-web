import {RecordData, RecordDataParams} from '@/services/data';

export interface TableListItem extends RecordData {
  ruleId: number;
  idx: number;
  originField: string;
  originOperator: string;
  originFieldValue: string;
}

export interface TableListParams extends RecordDataParams {
  ruleId?: number;
  idx?: number;
  originField?: string;
  originOperator?: string;
  originFieldValue?: string;
}

export interface FormValueType extends Partial<TableListParams> {}
