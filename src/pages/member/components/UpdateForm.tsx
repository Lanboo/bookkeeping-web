import { Input, Modal, Form } from 'antd';
import React, { useState } from 'react';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {}

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
    memberName: props.values.memberName,
  });

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleUpdate({
      id: formVals.id,
      memberName: fieldsValue.memberName,
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
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          userCode: formVals.userCode,
          bookName: formVals.memberName,
        }}
      >
        <Form.Item name="userCode" label="用户代码">
          <Input placeholder="用户代码" disabled />
        </Form.Item>
        <Form.Item
          name="memberName"
          label="成员名称"
          rules={[{ required: true, message: '不能为空！' }]}
        >
          <Input placeholder="成员名称" allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
