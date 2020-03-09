import { AbstractSupport } from '@/services/dataEnum/AbstractSupport';
import { SelectDataEnum } from '@/services/dataEnum/SelectDataEnum';

import { TableListItem } from './data';
import { queryList } from './service';

export class AssetSupport extends AbstractSupport<TableListItem> {
  static type: String = 'asset';
  static support: AssetSupport = new AssetSupport();
  static dataEnum: SelectDataEnum<TableListItem> = AssetSupport.support.reload();

  protected async doReload(): Promise<void> {
    queryList().then(data => {
      this.selectDataEnum.selectData = data;

      this.selectDataEnum.selectData.forEach(record => {
        this.selectDataEnum.selectEnum[record.id] = record.assetName;
      });
    });
  }
}
