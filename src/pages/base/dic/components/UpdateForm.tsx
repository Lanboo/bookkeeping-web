import { Modal, Form } from 'antd';
import React, { useState } from 'react';

import { TableListItem, FormValueType } from '../data.d';
import FormItems from './FromItems';

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
    dicKey: props.values.dicKey,
    dicValue: props.values.dicValue,
    dicType: props.values.dicType,
    dicDesc: props.values.dicDesc,
    parentId: props.values.parentId,
    validity: props.values.validity,
    idx: props.values.idx,
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
      <Form {...formLayout} form={form} initialValues={formVals}>
        <FormItems />
      </Form>
    </Modal>
  );
};

export default UpdateForm;
