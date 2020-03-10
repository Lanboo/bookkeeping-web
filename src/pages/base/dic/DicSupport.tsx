import React from 'react';
import { Typography } from 'antd';
const { Text } = Typography;

import { AbstractSupport } from '@/services/dataEnum/AbstractSupport';
import { SelectDataEnum } from '@/services/dataEnum/SelectDataEnum';

import { TableListItem } from './data';
import { queryList } from './service';

export interface DicSelectDataEnum extends SelectDataEnum<TableListItem> {
  selectTypeData: Map<String, TableListItem[]>;
}

export class DicSupport extends AbstractSupport<TableListItem> {
  static type: String = 'dic';
  static support: DicSupport = new DicSupport();
  static dataEnum: DicSelectDataEnum = DicSupport.support.selectDataEnum;

  selectDataEnum: DicSelectDataEnum = {
    selectData: new Array<TableListItem>(),
    tableEnum: new Map(),
    selectTypeData: new Map(),
  };

  protected async doReload(): Promise<void> {
    await queryList().then(data => {
      this.selectDataEnum.selectData = data;
      this.selectDataEnum.selectData.forEach(record => {
        this.selectDataEnum.tableEnum[record.id] = (
          <>
            <Text>{record.dicValue}</Text>
            <Text> </Text>
            <Text type="secondary">{record.dicDesc}</Text>
          </>
        );

        if (!this.selectDataEnum.selectTypeData[record.dicType]) {
          this.selectDataEnum.selectTypeData[record.dicType] = new Array<TableListItem>();
        }
        this.selectDataEnum.selectTypeData[record.dicType].push(record);
      });
    });
    DicSupport.dataEnum = this.selectDataEnum;
  }

  protected init(): void {
    this.selectDataEnum = {
      selectData: new Array<TableListItem>(),
      tableEnum: new Map(),
      selectTypeData: new Map(),
    };
  }
}
