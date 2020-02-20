import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal } from 'antd';
import React, { Component } from 'react';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import { TableListItem } from '../data.d';
import MyTreeSelect from './MyTreeSelect';

export interface FormValueType extends Partial<TableListItem> {
}

export interface UpdateFormProps extends FormComponentProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
  treeData?:[];
}
const FormItem = Form.Item;

export interface UpdateFormState {
  formVals: FormValueType;
}

class UpdateForm extends Component<UpdateFormProps, UpdateFormState> {
  static defaultProps = {
    handleUpdate: () => { },
    handleUpdateModalVisible: () => { },
    values: {},
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  constructor(props: UpdateFormProps) {
    super(props);

    this.state = {
      formVals: {
        id: props.values.id,
        userCode: props.values.userCode,
        categoryName: props.values.categoryName,
        parentId: props.values.parentId,
      },
    };
  }

  render() {
    const { updateModalVisible, onSubmit: handleUpdate, onCancel, form, treeData } = this.props;
    const { formVals } = this.state;

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleUpdate({
          id: formVals.id,
          categoryName: fieldsValue.categoryName
        });
      });
    };

    return (
      <Modal
        destroyOnClose
        title="修改成员"
        visible={updateModalVisible}
        onOk={okHandle}
        onCancel={() => onCancel()}
      >
        <FormItem key="userCode" {...this.formLayout} label="用户代码">
          {form.getFieldDecorator('userCode', {
            initialValue: formVals.userCode,
          })(<Input placeholder="用户代码" disabled />)}
        </FormItem>
        <FormItem key="parentId" {...this.formLayout} label="父级类别">
          {form.getFieldDecorator('parentId', {
            initialValue: formVals.parentId,
          })
            (<MyTreeSelect treeData={treeData} />)
          }
        </FormItem>
        <FormItem key="categoryName" {...this.formLayout} label="类别名称">
          {form.getFieldDecorator('categoryName', {
            rules: [{ required: true, message: '不能为空！', min: 1 }],
            initialValue: formVals.categoryName,
          })(<Input placeholder="类别名称" allowClear />)}
        </FormItem>
      </Modal>
    );
  }
}

export default Form.create<UpdateFormProps>()(UpdateForm);
