import { RecordData } from '@/services/data';

export interface TableListItem extends RecordData {
  id: number;
  dicType: string;
  dicDesc: string;
  dicKey: string;
  dicValue: string;
  parentId: string;
  validity: string;
  idx: number;

  crtTime: Date;
  uptTime: Date;
}
