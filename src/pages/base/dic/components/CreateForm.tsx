import React from 'react';
import { Modal, Form } from 'antd';

import { TableListParams } from '../data';
import FormItems from './FromItems';

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: TableListParams) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

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
      title="新建字典"
      visible={modalVisible}
      width={700}
      onOk={okHandle}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
    >
      <Form
        form={form}
        {...formLayout}
        initialValues={{
          idx: 0,
          validity: '1',
        }}
      >
        <FormItems />
      </Form>
    </Modal >
  );
};

export default CreateForm;
