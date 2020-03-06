import React, { ReactNode } from 'react';
import { StatusType } from '@ant-design/pro-table/lib/component/status';
import { Typography } from 'antd';

import { TableListItem as Dic } from './data';
import { queryList as dicQuery } from './service';

const { Text } = Typography;

export interface SelectDataEnum {
  selectData: SelectData;
  selectEnum: SelectEnum;
}

export interface SelectData {
  dicData?: Dic[];
}

export interface SelectEnum {
  dicEnum?: Map<String, { text: ReactNode; status: StatusType } | ReactNode>;
}

const selectDataEnum: SelectDataEnum = {
  selectData: {},
  selectEnum: {},
};

export function loadSelectData() {
  dicQuery().then(data => {
    selectDataEnum.selectData.dicData = data;
    let mapEnum: Map<String, {} | ReactNode> = new Map();
    selectDataEnum.selectData.dicData?.forEach(record => {
      mapEnum[record.id] = (
        <>
          <Text>{record.dicValue}</Text>
          <Text> </Text>
          <Text type="secondary">{record.dicDesc}</Text>
        </>
      );
    });
    selectDataEnum.selectEnum.dicEnum = mapEnum;
  });
  return selectDataEnum;
}
