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

export async function remove(params: { key: number[] }) {
  return request('/api/book/remove', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function add(params: TableListParams) {
  return request('/api/book/add', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function update(params: TableListParams) {
  return request('/api/book/update', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
