import { ReactNode } from 'react';
import { StatusType } from '@ant-design/pro-table/lib/component/status';

import { RecordData } from '../data';

export interface SelectDataEnum<T extends RecordData> {
  selectData: T[];
  selectEnum: Map<String, { text: ReactNode; status: StatusType } | ReactNode>;
}
