import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal, TreeSelect } from 'antd';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import React from 'react';

import { CategorySupport } from '../CategorySupport';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { id: number }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, onSubmit: handleAdd, onCancel } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="新建类别"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="父级类别">
        {form.getFieldDecorator(
          'parentId',
          {},
        )(
          <TreeSelect
            style={{ width: '100%' }}
            placeholder="类别"
            treeData={CategorySupport.dataEnum.selectData}
            treeDefaultExpandAll={true}
            allowClear
          />,
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类别名称">
        {form.getFieldDecorator('categoryName', {
          rules: [{ required: true, message: '不能为空！', min: 1 }],
        })(<Input placeholder="类别名称" allowClear />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
