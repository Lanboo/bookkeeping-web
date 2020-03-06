import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function query(params?: TableListParams) {
  return request('/api/dic/query', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryList(params?: TableListParams) {
  return request('/api/dic/query/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function remove(params: number[]) {
  return request('/api/dic/remove', {
    method: 'POST',
    data: params,
  });
}

export async function save(params: TableListParams) {
  return request('/api/dic/save', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function update(params: TableListParams) {
  return request('/api/dic/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
