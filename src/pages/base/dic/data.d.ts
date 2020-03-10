import { RecordData, RecordDataParams } from '@/services/data';

export interface TableListItem extends RecordData {
  id: number;
  dicKey: string;
  dicValue: string;
  dicType: string;
  dicDesc: string;
  parentId: string;
  validity: string;
  idx: number;

  crtTime: Date;
  uptTime: Date;
}

export interface TableListParams extends RecordDataParams {
  id?: number;
  dicKey?: string;
  dicValue?: string;
  dataType?: string;
  dicType?: string;
  dicDesc?: string;
  parentId?: string;
  validity?: string;
  idx?: number;

  crtTime?: Date;
  uptTime?: Date;
}
