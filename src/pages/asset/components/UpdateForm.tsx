import { Input, Modal, Select, InputNumber, Form } from 'antd';
import React, { useState } from 'react';

import { TableListItem, FormValueType } from '../data.d';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}

export interface UpdateFormState {
  formVals: FormValueType;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const [form] = Form.useForm();
  const { updateModalVisible, onSubmit: handleUpdate, onCancel } = props;

  const [formVals] = useState<FormValueType>({
    id: props.values.id,
    userCode: props.values.userCode,
    assetName: props.values.assetName,
    assetPattern: props.values.assetPattern,
    assetType: props.values.assetType,
    initialAmount: props.values.initialAmount! / 100,
    balance: props.values.balance! / 100,
  });

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    fieldsValue.id = formVals.id;
    fieldsValue.balance =
      (formVals.balance! - (formVals.initialAmount! - fieldsValue.initialAmount)) * 100;
    fieldsValue.initialAmount = fieldsValue.initialAmount! * 100;
    handleUpdate(fieldsValue);
  };

  return (
    <Modal
      destroyOnClose
      title="修改资产"
      visible={updateModalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          userCode: formVals.userCode,
          assetName: formVals.assetName,
          assetPattern: formVals.assetPattern,
          assetType: formVals.assetType,
          initialAmount: formVals.initialAmount,
          balance: formVals.balance,
        }}
      >
        <Form.Item name="userCode" label="用户代码">
          <Input placeholder="用户代码" disabled />
        </Form.Item>
        <Form.Item
          name="assetName"
          label="资产名称"
          rules={[{ required: true, message: '不能为空！' }]}
        >
          <Input placeholder="资产名称" allowClear />
        </Form.Item>
        <Form.Item
          name="assetPattern"
          label="资产模式"
          rules={[{ required: true, message: '不能为空！' }]}
        >
          <Select style={{ width: '100%' }}>
            <Select value="0">资产账户</Select>
            <Select value="1">负债账户</Select>
          </Select>
        </Form.Item>
        <Form.Item
          name="assetType"
          label="资产类型"
          rules={[{ required: true, message: '不能为空！' }]}
        >
          <Input placeholder="支付宝" allowClear />
        </Form.Item>
        <Form.Item
          name="initialAmount"
          label="初始金额"
          rules={[{ required: true, message: '不能为空！' }]}
        >
          <InputNumber placeholder="初始金额" style={{ width: '100%' }} min={0} precision={2} />
        </Form.Item>
        <Form.Item name="balance" label="余额" rules={[{ required: true, message: '不能为空！' }]}>
          <InputNumber disabled placeholder="余额" style={{ width: '100%' }} precision={2} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
