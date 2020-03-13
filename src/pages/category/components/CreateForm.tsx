import { Input, Modal, TreeSelect, Form } from 'antd';
import React from 'react';

import { TableListParams } from '../data';
import { CategorySupport } from '../CategorySupport';

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
    handleAdd(fieldsValue);
  };

  return (
    <Modal
      destroyOnClose
      title="新建类别"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
    >
      <Form
        form={form}
        {...formLayout}
      >
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
};

export default CreateForm;
