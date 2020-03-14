import { Modal, Form } from 'antd';
import moment from 'moment';

import React from 'react';
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
    fieldsValue.busiType = 'AddByUser';
    fieldsValue.recordTime = moment(fieldsValue.recordTime).format('YYYY-MM-DD HH:mm:ss');
    fieldsValue.amount = fieldsValue.amount * 100;
    fieldsValue.familyMember = ((fieldsValue.familyMember as unknown) as String[]).join(',');
    handleAdd(fieldsValue);
  };

  return (
    <Modal
      destroyOnClose
      title="新建账单"
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
          recordTime: moment(),
          flow: '1',
        }}
      >
        <FormItems />
      </Form>
    </Modal>
  );
};

export default CreateForm;
