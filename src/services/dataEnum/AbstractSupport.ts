import { SelectDataEnum } from './SelectDataEnum';
import { RecordData } from '../data';

export abstract class AbstractSupport<T extends RecordData> {
  selectDataEnum: SelectDataEnum<T> = {
    selectData: new Array<T>(),
    selectEnum: new Map(),
  };

  reload(): SelectDataEnum<T> {
    this.doReload();
    return this.selectDataEnum;
  }

  protected abstract async doReload(): Promise<void>;
}
