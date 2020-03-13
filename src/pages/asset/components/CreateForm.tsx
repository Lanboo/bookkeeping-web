import { Input, Modal, Select, InputNumber, Form } from 'antd';
import React from 'react';

import { TableListParams } from '../data';

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: TableListParams) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateForm: React.FC<CreateFormProps> = props => {
  const [form] = Form.useForm();
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    fieldsValue.initialAmount = fieldsValue.initialAmount * 100;
    fieldsValue.balance = fieldsValue.initialAmount;
    handleAdd(fieldsValue);
  };

  return (
    <Modal
      destroyOnClose
      title="新建资产"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
    >
      <Form
        form={form} {...formLayout}
        initialValues={{
          assetPattern: '0',
          initialAmount: 0,
        }}
      >
        <Form.Item
          name="assetName" label="资产名称"
          rules={[{ required: true, message: '不能为空！' }]}
        >
          <Input placeholder="资产名称" allowClear />
        </Form.Item>
        <Form.Item
          name="assetPattern" label="资产模式"
          rules={[{ required: true, message: '不能为空！' }]}
        >
          <Select style={{ width: '100%' }}>
            <Select.Option value="0">资产账户</Select.Option>
            <Select.Option value="1">负债账户</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="assetType" label="资产类型"
          rules={[{ required: true, message: '不能为空！' }]}
        >
          <Input placeholder="资产类型" allowClear />
        </Form.Item>
        <Form.Item
          name="initialAmount" label="初始金额"
          rules={[{ type: 'number', required: true, message: '不能为空！' }]}
        >
          <InputNumber placeholder="初始金额" style={{ width: '100%' }} min={0} precision={2} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateForm;
