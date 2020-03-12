import React from 'react';
import { Input, Modal, Form } from 'antd';

import { TableListParams } from '../data';

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: TableListParams) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const [form] = Form.useForm();
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd(fieldsValue);
  };
  return (
    <Modal
      destroyOnClose
      title="新建账本"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <Form.Item
          name="bookName"
          label="账本名称"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          rules={[{ required: true, message: '不能为空！', min: 1 }]}
        >
          <Input placeholder="账本名称" allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateForm;
