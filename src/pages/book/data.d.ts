import { RecordData } from '@/services/data';

export interface TableListItem extends RecordData {
  id: number;
  userCode: string;
  bookName: string;
  crtTime: Date;
  uptTime: Date;
}
