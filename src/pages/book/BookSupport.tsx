import { AbstractSupport } from '@/services/dataEnum/AbstractSupport';
import { SelectDataEnum } from '@/services/dataEnum/SelectDataEnum';

import { TableListItem } from './data';
import { queryList } from './service';

export class BookSupport extends AbstractSupport<TableListItem> {
  static type: String = 'book';
  static support: BookSupport = new BookSupport();
  static dataEnum: SelectDataEnum<TableListItem> = BookSupport.support.reload();

  protected async doReload(): Promise<void> {
    queryList().then(data => {
      this.selectDataEnum.selectData = data;

      this.selectDataEnum.selectData.forEach(record => {
        this.selectDataEnum.tableEnum[record.id] = record.bookName;
      });
    });
  }
}
