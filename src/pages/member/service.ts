import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function query(params?: TableListParams) {
  return request('/api/member/query', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function remove(params: number[]) {
  return request('/api/member/remove', {
    method: 'POST',
    data: params,
  });
}

export async function save(params: TableListParams) {
  return request('/api/member/save', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function update(params: TableListParams) {
  return request('/api/member/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
