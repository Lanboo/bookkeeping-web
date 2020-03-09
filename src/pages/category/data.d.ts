import { RecordData, RecordDataParams } from '@/services/data';

export interface TableListItem extends RecordData {
  id: number;
  userCode: string;
  categoryName: string;
  parentId: number;
  crtTime: Date;
  uptTime: Date;
  children: TableListItem[];
}

export interface TableListParams extends RecordDataParams {
  id?: number;
  userCode?: string;
  categoryName?: string;
  parentId?: number;
  crtTime?: Date;
  uptTime?: Date;
  children?: TableListItem[];
}
