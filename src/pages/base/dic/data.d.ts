export interface TableListItem {
  id: number;
  dicType: string;
  dicDesc: string;
  dicKey: string;
  dicValue: string;
  parentId: string;
  validity: string;
  idx: number;

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
  dicType?: string;
  dicDesc?: string;
  dicKey?: string;
  dicValue?: string;
  parentId?: string;
  validity?: string;
  idx?: number;

  crtTime?: Date;
  uptTime?: Date;

  pageSize?: number;
  current?: number;
}
