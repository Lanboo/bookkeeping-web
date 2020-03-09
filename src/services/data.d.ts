export interface RecordData {}

export interface RecordDataPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface RecordDataList<T extends RecordData> {
  list: T[];
  pagination: Partial<RecordPagination>;
}

export interface RecordDataParams {
  pageSize?: number;
  current?: number;
}
