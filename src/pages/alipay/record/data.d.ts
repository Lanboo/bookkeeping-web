import { RecordData, RecordDataParams } from '@/services/data';

export interface TableListItem extends RecordData {
  id: number;
  userCode: string;
  consumeTime: string;
  consumeTitle: string;
  tradeNo: string;
  tradeId: string;
  other: string;
  amount: number;
  fundFlow: string;
  status: string;
  fundTool: string;
  fundToolFrom: string;
  memo: string;

  consumeTimeStart?: string;
  consumeTimeEnd?: string;
  consumeTimeArray?: string[];

  operator: String;

  crtTime: Date;
  uptTime: Date;
}

export interface TableListParams extends RecordDataParams {
  id?: number;
  userCode?: string;
  consumeTime?: string;
  consumeTitle?: string;
  tradeNo?: string;
  tradeId?: string;
  other?: string;
  amount?: number;
  fundFlow?: string;
  status?: string;
  fundTool?: string;
  fundToolFrom?: string;
  memo?: string;

  consumeTimeStart?: string;
  consumeTimeEnd?: string;
  consumeTimeArray?: string[];

  operator?: String;
}

export interface FormValueType extends Partial<TableListParams> {}
