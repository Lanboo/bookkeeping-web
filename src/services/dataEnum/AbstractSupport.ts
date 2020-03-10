import { SelectDataEnum } from './SelectDataEnum';
import { RecordData } from '../data';

export abstract class AbstractSupport<T extends RecordData> {
  selectDataEnum: SelectDataEnum<T> = {
    selectData: new Array<T>(),
    tableEnum: new Map(),
  };

  constructor() {
    this.reload();
  }

  reload(): SelectDataEnum<T> {
    this.init();
    this.doReload();
    return this.selectDataEnum;
  }

  protected abstract async doReload(): Promise<void>;

  protected init(): void {
    this.selectDataEnum = {
      selectData: new Array<T>(),
      tableEnum: new Map(),
    };
  }
}
