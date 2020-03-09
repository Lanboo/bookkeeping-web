import { RecordData, RecordDataParams } from '@/services/data';

export interface TableListItem extends RecordData {
  id: number;
  userCode: string;
  busiType: string;
  targetField: string;
  targetFieldValue: string;
  expression: string;

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

  crtTime?: Date;
  uptTime?: Date;
}
