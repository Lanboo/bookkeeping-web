import { Modal, Form } from 'antd';
import React, { useState } from 'react';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> { }

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
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const [form] = Form.useForm();
  const { updateModalVisible, onSubmit: handleUpdate, onCancel } = props;

  const [formVals] = useState<FormValueType>({
    id: props.values.id,
    busiType: props.values.busiType,
    targetField: props.values.targetField,
    targetFieldValue: props.values.targetFieldValue,
    expression: props.values.expression,
  });

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    fieldsValue.id = formVals.id;
    handleUpdate(fieldsValue);
  };


  return (
    <Modal
      destroyOnClose
      title="字段修改"
      visible={updateModalVisible}
      width={700}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
        }}
      >
      </Form >
    </Modal >
  );
}


export default UpdateForm;
