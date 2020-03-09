import { SelectDataEnum } from './SelectDataEnum';
import { RecordData } from '../data';

export abstract class AbstractSupport<T extends RecordData> {
  protected selectDataEnum: SelectDataEnum<T> = {
    selectData: new Array<T>(),
    selectEnum: new Map(),
  };

  //抽象方法 ，不包含具体实现，要求子类中必须实现此方法
  abstract reload(): SelectDataEnum<T>;
}
