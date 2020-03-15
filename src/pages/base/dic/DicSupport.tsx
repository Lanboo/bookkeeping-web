import React, {ReactNode} from 'react';
import {Typography} from 'antd';
const {Text} = Typography;

import {AbstractSupport} from '@/services/dataEnum/AbstractSupport';
import {SelectDataEnum} from '@/services/dataEnum/SelectDataEnum';

import {TableListItem} from './data';
import {queryList} from './service';
import {StatusType} from '@ant-design/pro-table/lib/component/status';

export interface DicSelectDataEnum extends SelectDataEnum<TableListItem> {
  selectTypeData: Map<String, TableListItem[]>;
  typeMap: Map<String, Map<String, TableListItem>>;
}

export class DicSupport extends AbstractSupport<TableListItem> {
  static type: String = 'dic';
  static support: DicSupport = new DicSupport();
  static dataEnum: DicSelectDataEnum = DicSupport.support.selectDataEnum;

  selectDataEnum: DicSelectDataEnum = {
    selectData: new Array<TableListItem>(),
    tableEnum: new Map(),
    selectTypeData: new Map(),
    typeMap: new Map(),
  };

  static list2TbEnum(records: TableListItem[]): Map<String, {text: ReactNode; status: StatusType} | ReactNode> {
    let tableEnum: Map<string, {text: ReactNode; status: StatusType} | ReactNode> = new Map();
    records?.forEach(record => {
      tableEnum[record.dicKey] = record.dicValue;
    });
    return tableEnum;
  }

  protected async doReload(): Promise<void> {
    await queryList().then(data => {
      let tempData: TableListItem[] = data;
      this.selectDataEnum.selectData = tempData.sort((a, b) => {
        if (a.idx != b.idx) {
          return a.idx - b.idx;
        }
        else {
          return a.id - b.id;
        }
      });
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

        if (!this.selectDataEnum.typeMap[record.dicType]) {
          this.selectDataEnum.typeMap[record.dicType] = new Map();
        }
        this.selectDataEnum.typeMap[record.dicType][record.dicKey] = record;
      });
    });
    DicSupport.dataEnum = this.selectDataEnum;
  }

  protected init(): void {
    this.selectDataEnum = {
      selectData: new Array<TableListItem>(),
      tableEnum: new Map(),
      selectTypeData: new Map(),
      typeMap: new Map(),
    };
  }
}
