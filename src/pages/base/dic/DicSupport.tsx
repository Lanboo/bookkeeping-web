import React from 'react';
import { Typography } from 'antd';
const { Text } = Typography;

import { AbstractSupport } from '@/services/dataEnum/AbstractSupport';
import { SelectDataEnum } from '@/services/dataEnum/SelectDataEnum';

import { TableListItem } from './data';
import { queryList } from './service';

export class DicSupport extends AbstractSupport<TableListItem> {
  static type: String = 'dic';
  static support: DicSupport = new DicSupport();
  static dataEnum: SelectDataEnum<TableListItem> = DicSupport.support.reload();

  protected async doReload(): Promise<void> {
    queryList().then(data => {
      this.selectDataEnum.selectData = data;

      this.selectDataEnum.selectData.forEach(record => {
        this.selectDataEnum.selectEnum[record.id] = (
          <>
            <Text>{record.dicValue}</Text>
            <Text> </Text>
            <Text type="secondary">{record.dicDesc}</Text>
          </>
        );
      });
    });
  }
}
