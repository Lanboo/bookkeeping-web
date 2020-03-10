import JsTreeList from 'js-tree-list';

import { AbstractSupport } from '@/services/dataEnum/AbstractSupport';
import { SelectDataEnum } from '@/services/dataEnum/SelectDataEnum';

import { TableListItem as Category } from './data';
import { queryList } from './service';

export class CategorySupport extends AbstractSupport<Category> {
  static type: String = 'category';
  static support: CategorySupport = new CategorySupport();
  static dataEnum: SelectDataEnum<Category> = CategorySupport.support.selectDataEnum;

  protected async doReload(): Promise<void> {
    queryList().then(data => {
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
      this.selectDataEnum.selectData = treeDataTemp;

      queryData.forEach(record => {
        this.selectDataEnum.tableEnum[record.id] = record.categoryName;
      });
    });

    CategorySupport.dataEnum = this.selectDataEnum;
  }
}
