import {RecordData, RecordDataParams} from '@/services/data';
import {TableListItem as Detail, TableListParams as DetailParams} from './data.detail';

export interface TableListItem extends RecordData {
  id: number;
  userCode: string;
  busiType: string;
  targetField: string;
  targetFieldValue: string;
  expression: string;
  details: Detail[];

  crtTime: Date;
  uptTime: Date;
}

export interface TableListParams extends RecordDataParams {
  id?: number;
  userCode?: string;
  busiType?: string;
  targetField?: string;
  targetFieldValue?: string;
  expression?: string;
  details?: DetailParams[];

  crtTime?: Date;
  uptTime?: Date;
}

export interface FormValueType extends Partial<TableListParams> {}
