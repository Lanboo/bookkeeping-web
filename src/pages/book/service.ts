import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function query(params?: TableListParams) {
  return request('/api/book/query', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryList(params?: TableListParams) {
  return request('/api/book/query/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function remove(params: number[]) {
  return request('/api/book/remove', {
    method: 'POST',
    data: params,
  });
}

export async function save(params: TableListParams) {
  return request('/api/book/save', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function update(params: TableListParams) {
  return request('/api/book/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
