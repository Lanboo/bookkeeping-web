import { RecordData, RecordDataParams } from '@/services/data';

export interface TableListItem extends RecordData {
  id: number;
  userCode: string;
  bookName: string;
  crtTime: Date;
  uptTime: Date;
}

export interface TableListParams extends RecordDataParams {
  id?: number;
  userCode?: string;
  bookName?: string;
  crtTime?: Date;
  uptTime?: Date;
  pageSize?: number;
  current?: number;
}
