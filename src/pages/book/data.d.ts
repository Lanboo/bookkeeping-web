export interface TableListItem {
  id: number;
  userCode: string;
  bookName: string;
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
  bookName?: string;
  crtTime?: Date;
  uptTime?: Date;
  pageSize?: number;
  current?: number;
}
