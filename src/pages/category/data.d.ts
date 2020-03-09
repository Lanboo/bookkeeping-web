import { RecordData } from '@/services/data';

export interface TableListItem extends RecordData {
  id: number;
  userCode: string;
  categoryName: string;
  parentId: number;
  crtTime: Date;
  uptTime: Date;
  children: TableListItem[];
}
