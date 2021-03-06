import { AbstractSupport } from '@/services/dataEnum/AbstractSupport';
import { SelectDataEnum } from '@/services/dataEnum/SelectDataEnum';

import { TableListItem } from './data';
import { queryList } from './service';

export class MemberSupport extends AbstractSupport<TableListItem> {
  static type: String = 'member';
  static support: MemberSupport = new MemberSupport();
  static dataEnum: SelectDataEnum<TableListItem> = MemberSupport.support.selectDataEnum;

  protected async doReload(): Promise<void> {
    queryList().then(data => {
      this.selectDataEnum.selectData = data;

      this.selectDataEnum.selectData.forEach(record => {
        this.selectDataEnum.tableEnum[record.id] = record.memberName;
      });
    });

    MemberSupport.dataEnum = this.selectDataEnum;
  }
}
