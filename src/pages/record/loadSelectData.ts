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
  bookSelDate?: Book[];
  categorySelDate?: {}[];
  assetDate?: Asset[];
  memberSelDate?: Member[];
}

export interface SelectEnum {
  bookEnum?: Book[];
  categoryEnum?: Category[];
  assetEnum?: Asset[];
  memberEnum?: Member[];
}

const selectDataEnum: SelectDataEnum = {
  selectData: {},
  selectEnum: {},
};

export function loadSelectData() {
  bookQuery().then(data => {
    selectDataEnum.selectData.bookSelDate = data;
  });
  categoryQuery().then(data => {
    const queryData: Category[] = data;
    const tempData = queryData.map(item => ({
      value: item.id,
      title: item.categoryName,
      parent: item.parentId ? item.parentId : null,
    }));
    const treeDataTemp = new JsTreeList.ListToTree(tempData, {
      key_id: 'value',
      key_parent: 'parent',
      key_child: 'children',
    }).GetTree();
    selectDataEnum.selectData.categorySelDate = treeDataTemp;
  });
  assetQuery().then(data => {
    selectDataEnum.selectData.assetDate = data;
  });
  memberQuery().then(data => {
    selectDataEnum.selectData.memberSelDate = data;
  });
  return selectDataEnum;
}
