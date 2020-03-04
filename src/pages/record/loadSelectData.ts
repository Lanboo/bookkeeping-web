import { ReactNode } from 'react';
import { StatusType } from '@ant-design/pro-table/lib/component/status';
import JsTreeList from 'js-tree-list';

import { TableListItem as Book } from '../book/data';
import { TableListItem as Category } from '../category/data';
import { TableListItem as Asset } from '../asset/data';
import { TableListItem as Member } from '../member/data';

import { queryList as bookQuery } from '../book/service';
import { queryList as categoryQuery } from '../category/service';
import { queryList as assetQuery } from '../asset/service';
import { queryList as memberQuery } from '../member/service';
export interface SelectDataEnum {
  selectData: SelectData;
  selectEnum: SelectEnum;
}

export interface SelectData {
  bookData?: Book[];
  categoryData?: {}[];
  assetData?: Asset[];
  memberData?: Member[];
}

export interface SelectEnum {
  bookEnum?: Map<String, { text: ReactNode; status: StatusType } | ReactNode>;
  categoryEnum?: Map<String, { text: ReactNode; status: StatusType } | ReactNode>;
  assetEnum?: Map<String, { text: ReactNode; status: StatusType } | ReactNode>;
  memberEnum?: Map<String, { text: ReactNode; status: StatusType } | ReactNode>;
}

const selectDataEnum: SelectDataEnum = {
  selectData: {},
  selectEnum: {},
};

export function loadSelectData() {
  bookQuery().then(data => {
    selectDataEnum.selectData.bookData = data;
    let mapEnum: Map<String, {} | ReactNode> = new Map();
    selectDataEnum.selectData.bookData?.forEach(record => {
      mapEnum[record.id] = record.bookName;
    });
    selectDataEnum.selectEnum.bookEnum = mapEnum;
  });
  categoryQuery().then(data => {
    let queryData: Category[] = data;
    let tempData = queryData.map(item => ({
      value: item.id,
      title: item.categoryName,
      parent: item.parentId ? item.parentId : null,
    }));
    let treeDataTemp = new JsTreeList.ListToTree(tempData, {
      key_id: 'value',
      key_parent: 'parent',
      key_child: 'children',
    }).GetTree();
    selectDataEnum.selectData.categoryData = treeDataTemp;

    let mapEnum: Map<String, {} | ReactNode> = new Map();
    queryData.forEach(record => {
      mapEnum[record.id] = record.categoryName;
    });
    selectDataEnum.selectEnum.categoryEnum = mapEnum;
  });
  assetQuery().then(data => {
    selectDataEnum.selectData.assetData = data;
    let mapEnum: Map<String, {} | ReactNode> = new Map();
    selectDataEnum.selectData.assetData?.forEach(record => {
      mapEnum[record.id] = record.assetName;
    });
    selectDataEnum.selectEnum.assetEnum = mapEnum;
  });
  memberQuery().then(data => {
    selectDataEnum.selectData.memberData = data;
    let mapEnum: Map<String, {} | ReactNode> = new Map();
    selectDataEnum.selectData.memberData?.forEach(record => {
      mapEnum[record.id] = record.memberName;
    });
    selectDataEnum.selectEnum.memberEnum = mapEnum;
  });
  return selectDataEnum;
}
