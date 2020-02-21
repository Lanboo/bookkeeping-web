import React from 'react';
import { TreeSelect } from 'antd';
import JsTreeList from 'js-tree-list';

import { TableListItem } from '../data.d';
import { queryList } from '../service';

interface FormProps {
  treeData?: [];
  onChange?: (value: String) => void;
  treeDefaultExpandAll?: boolean;
}

class MyTreeSelect extends React.Component<FormProps> {
  static defaultProps = {
    treeDefaultExpandAll: true,
  };

  state = {
    value: undefined,
  };

  treeData: [] = [];

  constructor(props: FormProps) {
    super(props);

    this.onLoadData();
  }

  onLoadData = async () => {
    const { treeData } = this.props;
    if (treeData && treeData.length > 0) {
      this.treeData = treeData;
      return;
    }
    await queryList().then(data => {
      const queryData: TableListItem[] = data;
      const tempData = queryData.map(item => ({
        value: item.id,
        title: item.categoryName,
        parent: item.parentId,
      }));
      this.treeData = new JsTreeList.ListToTree(tempData, {
        key_id: 'value',
        key_parent: 'parent',
        key_child: 'children',
      }).GetTree();
    });
  };

  static getDerivedStateFromProps(nextProps: any) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        value: nextProps.value,
      };
    }
    return null;
  }

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
    const { treeData, treeDefaultExpandAll } = this.props;
    return (
      <TreeSelect
        style={{ width: '100%' }}
        placeholder="父级类别"
        value={this.state.value}
        treeData={treeData}
        treeDefaultExpandAll={treeDefaultExpandAll}
        onChange={this.handleChange}
        allowClear
      />
    );
  }
}

export default MyTreeSelect;

// 不能是函数式组件
// export default () => (
//   <MyTreeSelect />
// );
