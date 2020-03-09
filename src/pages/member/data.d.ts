import { RecordData } from '@/services/data';

export interface TableListItem extends RecordData {
  id: number;
  userCode: string;
  memberName: string;
  crtTime: Date;
  uptTime: Date;
}
