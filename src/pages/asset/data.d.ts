import { RecordData } from '@/services/data';

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
