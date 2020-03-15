import React from 'react';
import { TreeSelect, Input, Select, Radio } from 'antd';

import { BookSupport } from '@/pages/book/BookSupport';
import { MemberSupport } from '@/pages/member/MemberSupport';
import { CategorySupport } from '@/pages/category/CategorySupport';
import { AssetSupport } from '@/pages/asset/AssetSupport';
import { TableListItem as Asset } from '@/pages/asset/data';

interface FormProps {
  busiType?: string;
  targetField?: string;
  onChange?: (value: String) => void;
}

class TargetValueInput extends React.Component<FormProps> {
  handleChange = (changedValue: String) => {
    this.setState({
      value: changedValue,
    });
    this.triggerChange(changedValue);
  };

  triggerChange = (changedValue: String) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  render() {
    const { busiType, targetField } = this.props;

    const assetOptionGroups: any[] = [];
    if (AssetSupport.dataEnum.selectData) {
      let assetOptionsMap: Map<String, Asset[]> = new Map();
      AssetSupport.dataEnum.selectData.forEach(asset => {
        if (!assetOptionsMap[asset.assetType]) {
          assetOptionsMap[asset.assetType] = [];
        }
        assetOptionsMap[asset.assetType].push(asset);
      });
      for (let assetType in assetOptionsMap) {
        let assetOptions = assetOptionsMap[assetType].map((asset: Asset) => (
          <Select.Option value={asset.id}>{asset.assetName}</Select.Option>
        ));
        assetOptionGroups.push(<Select.OptGroup label={assetType}>{assetOptions}</Select.OptGroup>);
      }
    }

    let targetValueInput: JSX.Element = (
      <Input placeholder="目标值" allowClear onChange={e => this.handleChange(e.target.value)} />
    );
    if ('ALIPAY2RECORD' === busiType) {
      if ('accountBook' === targetField) {
        targetValueInput = (
          <Select<string>
            allowClear
            placeholder="目标值-账本"
            style={{ width: '100%' }}
            onChange={value => this.handleChange(value)}
          >
            {BookSupport.dataEnum.selectData.map(record => (
              <Select.Option value={record.id}>{record.bookName}</Select.Option>
            ))}
          </Select>
        );
      } else if ('flow' === targetField) {
        targetValueInput = (
          <Radio.Group buttonStyle="outline" onChange={e => this.handleChange(e.target.value)}>
            <Radio.Button value="1" style={{ color: '#389e0d' }}>
              收入
            </Radio.Button>
            <Radio.Button value="-1" style={{ color: '#cf1322' }}>
              支出
            </Radio.Button>
          </Radio.Group>
        );
      } else if ('category' === targetField) {
        targetValueInput = (
          <TreeSelect<string>
            allowClear
            style={{ width: '100%' }}
            placeholder="目标值-类别"
            treeData={CategorySupport.dataEnum.selectData}
            treeDefaultExpandAll={true}
            onChange={value => this.handleChange(value)}
          />
        );
      } else if ('asset' === targetField) {
        targetValueInput = (
          <Select<string>
            allowClear
            placeholder="目标值-账户"
            style={{ width: '100%' }}
            onChange={value => this.handleChange(value)}
          >
            {assetOptionGroups}
          </Select>
        );
      } else if ('familyMember' === targetField) {
        targetValueInput = (
          <Select<string[]>
            allowClear
            mode="multiple"
            placeholder="目标值-成员"
            style={{ width: '100%' }}
            onChange={value => this.handleChange(value.join(','))}
          >
            {MemberSupport.dataEnum.selectData.map(record => (
              <Select.Option value={record.id}>{record.memberName}</Select.Option>
            ))}
          </Select>
        );
      }
    }
    return targetValueInput;
  }
}

export default TargetValueInput;