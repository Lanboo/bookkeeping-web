import '@ant-design/compatible/assets/index.css';
import { Modal, Form } from 'antd';
import React, { useState } from 'react';
import moment from 'moment';

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
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const [form] = Form.useForm();
  const { updateModalVisible, onSubmit: handleUpdate, onCancel } = props;

  const [formVals] = useState<FormValueType>({
    id: props.values.id,
    userCode: props.values.userCode,
    busiType: props.values.busiType,
    accountBook: props.values.accountBook,
    amount: props.values.amount! / 100,
    flow: props.values.flow,
    category: props.values.category,
    asset: props.values.asset,
    recordTime: props.values.recordTime,
    recordDesc: props.values.recordDesc,
    familyMember: props.values.familyMember,
    alipayRecordId: props.values.alipayRecordId,
  });

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    fieldsValue.id = formVals.id;
    fieldsValue.amount = fieldsValue.amount! * 100;
    fieldsValue.recordTime = moment(fieldsValue.recordTime).format('YYYY-MM-DD HH:mm:ss');
    fieldsValue.familyMember = ((fieldsValue.familyMember as unknown) as String[]).join(',');
    handleUpdate(fieldsValue);
  };

  return (
    <Modal
      destroyOnClose
      title="修改账单"
      visible={updateModalVisible}
      onOk={okHandle}
      width={700}
      onCancel={() => onCancel()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          recordTime: moment(formVals.recordTime),
          accountBook: formVals.accountBook,
          flow: formVals.flow,
          amount: formVals.amount,
          asset: formVals.asset,
          category: formVals.category,
          familyMember: formVals.familyMember?.split(','),
          recordDesc: formVals.recordDesc,
        }}
      >
        <FormItems />
      </Form>
    </Modal>
  );
};

export default UpdateForm;
