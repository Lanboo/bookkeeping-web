import { Input, Modal, Form } from 'antd';
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
  const { onSubmit: handleUpdate, onCancel, updateModalVisible } = props;

  const [formVals] = useState<FormValueType>({
    id: props.values.id,
    userCode: props.values.userCode,
    bookName: props.values.bookName,
  });

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleUpdate({
      id: formVals.id,
      bookName: fieldsValue.bookName,
    });
  };

  return (
    <Modal
      destroyOnClose
      title="修改账本"
      visible={updateModalVisible}
      onOk={okHandle}
      onCancel={() => onCancel(false, values)}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          userCode: formVals.userCode,
          bookName: formVals.bookName,
        }}
      >
        <Form.Item name="userCode" label="用户代码">
          <Input placeholder="用户代码" disabled />
        </Form.Item>
        <Form.Item
          name="bookName"
          label="账本名称"
          rules={[{ required: true, message: '不能为空！' }]}
        >
          <Input placeholder="账本名称" allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
