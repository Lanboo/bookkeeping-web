import { RecordData, RecordDataParams } from '@/services/data';

export interface TableListItem extends RecordData {
  id: number;
  userCode: string;
  memberName: string;
  crtTime: Date;
  uptTime: Date;
}

export interface TableListParams extends RecordDataParams {
  id?: number;
  userCode?: string;
  memberName?: string;
  crtTime?: Date;
  uptTime?: Date;
}

export interface FormValueType extends Partial<TableListParams> {}
