export interface TableListItem {
  id: number;
  userCode: string;
  categoryName: string;
  parentId: number;
  crtTime: Date;
  uptTime: Date;
  children: TableListItem[];
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
  categoryName?: string;
  parentId?: number;
  crtTime?: Date;
  uptTime?: Date;
  children?: TableListItem[];
  pageSize?: number;
  current?: number;
}
