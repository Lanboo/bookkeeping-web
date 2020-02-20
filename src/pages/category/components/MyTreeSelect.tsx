import React from "react";
import { TreeSelect } from "antd";
import { queryList } from './../service';
import { TableListItem } from '../data.d';
import JsTreeList from "js-tree-list";
import { FormComponentProps } from '@ant-design/compatible/es/form';


interface FormProps extends FormComponentProps {
  treeData?: [];
}



class MyTreeSelect extends React.Component<FormProps> {
  state = {
    value: undefined,
    treeData: [],
    loadState: false
  };

  constructor(props: FormProps) {
    super(props);

    this.onLoadData();
  }

  onLoadData = async () => {
    const { treeData } = this.props;
    if (!this.state.loadState) {
      if (treeData && treeData.length > 0) {
        this.setState({
          loadState: true,
          treeData: treeData
        });
        return;
      }
      await queryList().then(data => {
        let queryData: TableListItem[] = data;
        let tempData = queryData.map(item => (
          {
            value: item.id,
            title: item.categoryName,
            parent: item.parentId
          }
        ));
        let treeData: [] = new JsTreeList.ListToTree(tempData, {
          key_id: "value",
          key_parent: "parent",
          key_child: "children",
        }).GetTree();
        this.setState({
          loadState: true,
          treeData: treeData
        });
      }).catch(err => {
        this.setState({
          loadState: false,
        });
      });
    }
  }

  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ("value" in nextProps) {
      return {
        value: nextProps.value
      };
    }
    return null;
  }

  handleChange = (changedValue: String) => {
    console.log(changedValue);
    this.setState({
      value: changedValue,
      treeData: this.state.treeData,
      loadState: this.state.loadState
    });
    this.triggerChange(changedValue);
  }

  triggerChange = (changedValue: String) => {
    const { onChange } = this.props;
    onChange && onChange(changedValue);
  };

  render() {
    return (
      <TreeSelect
        style={{ width: "100%" }}
        placeholder="父级类别"
        value={this.state.value}
        treeData={this.state.treeData}
        onChange={this.handleChange}
        allowClear />
    );
  }
}

export default MyTreeSelect;


// 不能是函数式组件
// export default () => (
//   <MyTreeSelect />
// );
