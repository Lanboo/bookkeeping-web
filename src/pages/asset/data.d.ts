export interface TableListItem {
  id: number;
  userCode: string;
  assetName: string;
  assetPattern: string;
  assetType: string;
  balance: number;

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
  assetName?: string;
  assetPattern?: string;
  assetType?: string;
  balance?: number;

  pageSize?: number;
  current?: number;
}
