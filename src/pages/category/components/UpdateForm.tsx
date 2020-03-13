import { Input, Modal, TreeSelect, Form } from 'antd';
import React, { useState } from 'react';

import { TableListItem, FormValueType } from '../data.d';
import { CategorySupport } from '../CategorySupport';

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
    categoryName: props.values.categoryName,
    parentId: props.values.parentId,
  });

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleUpdate({
      id: formVals.id,
      categoryName: fieldsValue.categoryName,
    });
  };


  return (
    <Modal
      destroyOnClose
      title="修改成员"
      visible={updateModalVisible}
      onOk={okHandle}
      onCancel={() => onCancel(false, props.values)}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          userCode: formVals.userCode,
          parentId: formVals.parentId,
          categoryName: formVals.categoryName,
        }}
      >
        <Form.Item name="userCode" label="用户代码">
          <Input placeholder="用户代码" disabled />
        </Form.Item>
        <Form.Item name="parentId" label="父级类别">
          <TreeSelect
            style={{ width: '100%' }}
            placeholder="类别"
            treeData={CategorySupport.dataEnum.selectData}
            treeDefaultExpandAll={true}
            allowClear
          />
        </Form.Item>
        <Form.Item
          name="categoryName" label="类别名称"
          rules={[{ required: true, message: '不能为空！' }]}
        >
          <Input placeholder="类别名称" allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UpdateForm;
