import { RecordData } from '@/services/data';

export interface TableListItem extends RecordData {
  id: number;
  userCode: string;
  busiType: string;
  accountBook: string;
  amount: number;
  flow: string;
  category: string;
  asset: string;
  recordTime: string;
  recordDesc: string;
  familyMember: string;
  alipayRecordId: string;

  recordTimeStart?: string;
  recordTimeEnd?: string;
  recordTimeArray?: string[];

  operator: String;

  crtTime: Date;
  uptTime: Date;
}
