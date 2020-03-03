export interface TableListItem {
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
  busiType?: string;
  accountBook?: string;
  amount?: number;
  flow?: string;
  category?: string;
  asset?: string;
  recordTime?: string;
  recordDesc?: string;
  familyMember?: string;
  alipayRecordId?: string;

  pageSize?: number;
  current?: number;
}
