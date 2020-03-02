export interface TableListItem {
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

  crtTime: Date;
  uptTime: Date;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
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

  pageSize?: number;
  current?: number;
}
