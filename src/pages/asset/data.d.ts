import { RecordData, RecordDataParams } from '@/services/data';

export interface TableListItem extends RecordData {
  id: number;
  userCode: string;
  assetName: string;
  assetPattern: string;
  assetType: string;
  initialAmount: number;
  balance: number;

  crtTime: Date;
  uptTime: Date;
}

export interface TableListParams extends RecordDataParams {
  id?: number;
  userCode?: string;
  assetName?: string;
  assetPattern?: string;
  assetType?: string;
  initialAmount?: number;
  balance?: number;
}

export interface FormValueType extends Partial<TableListParams> {}
