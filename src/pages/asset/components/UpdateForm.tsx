import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal, Select, InputNumber } from 'antd';
import React, { Component } from 'react';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
}

export interface UpdateFormProps extends FormComponentProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
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
        assetName: props.values.assetName,
        assetPattern: props.values.assetPattern,
        assetType: props.values.assetType,
        balance: props.values.balance,
      },
    };
  }

  render() {
    const { updateModalVisible, onSubmit: handleUpdate, onCancel, form } = this.props;
    const { formVals } = this.state;

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleUpdate({
          id: formVals.id,
          userCode: fieldsValue.userCode,
          assetName: fieldsValue.assetName,
          assetPattern: fieldsValue.assetPattern,
          assetType: fieldsValue.assetType,
          balance: fieldsValue.balance! * 100,
        });
      });
    };

    return (
      <Modal
        destroyOnClose
        title="修改资产"
        visible={updateModalVisible}
        onOk={okHandle}
        onCancel={() => onCancel()}
      >
        <Form {...this.formLayout}>
          <FormItem key="userCode" {...this.formLayout} label="用户代码">
            {form.getFieldDecorator('userCode', {
              initialValue: formVals.userCode,
            })(<Input placeholder="用户代码" disabled />)}
          </FormItem>
          <FormItem key="assetName" label="资产名称">
            {form.getFieldDecorator('assetName', {
              rules: [{ required: true, message: '不能为空！', min: 1 }],
              initialValue: formVals.assetName,
            })(<Input placeholder="资产名称" allowClear />)}
          </FormItem>
          <FormItem key="assetPattern" label="资产模式">
            {form.getFieldDecorator('assetPattern', {
              rules: [{ required: true, message: '不能为空！', min: 1 }],
              initialValue: formVals.assetPattern,
            })(
              <Select style={{ width: '100%' }}>
                <Select value="0">资产账户</Select>
                <Select value="1">负债账户</Select>
              </Select>
            )}
          </FormItem>
          <FormItem key="assetType" label="资产类型">
            {form.getFieldDecorator('assetType', {
              rules: [{ required: true, message: '不能为空！', min: 1 }],
              initialValue: formVals.assetType,
            })(<Input placeholder="支付宝" allowClear />)}
          </FormItem>
          <FormItem key="balance" label="资产名称">
            {form.getFieldDecorator('balance', {
              rules: [{ required: true, message: '不能为空！' }],
              initialValue: formVals.balance! / 100,
            })(
              <InputNumber
                placeholder="初始金额"
                style={{ width: '100%' }}
                min={0}
                precision={2}
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create<UpdateFormProps>()(UpdateForm);
