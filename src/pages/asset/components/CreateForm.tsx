import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal, Select, InputNumber } from 'antd';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import React from 'react';
import { TableListItem } from '../data';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: TableListItem) => void;
  onCancel: () => void;
}


const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, onSubmit: handleAdd, onCancel } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue: TableListItem) => {
      if (err) return;
      form.resetFields();
      fieldsValue.balance = fieldsValue.balance * 100;
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="新建资产"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <FormItem {...formLayout} label="资产名称">
        {form.getFieldDecorator('assetName', {
          rules: [{ required: true, message: '不能为空！', min: 1 }],
        })(<Input placeholder="资产名称" allowClear />)}
      </FormItem>
      <FormItem {...formLayout} label="资产模式">
        {form.getFieldDecorator('assetPattern', {
          rules: [{ required: true, message: '不能为空！', min: 1 }],
          initialValue: '0',
        })(
          <Select style={{ width: '100%' }}>
            <Select.Option value="0">资产账户</Select.Option>
            <Select.Option value="1">负债账户</Select.Option>
          </Select>
        )}
      </FormItem>
      <FormItem {...formLayout} label="资产类型">
        {form.getFieldDecorator('assetType', {
          rules: [{ required: true, message: '不能为空！', min: 1 }],
        })(<Input placeholder="资产类型" allowClear />)}
      </FormItem>
      <FormItem {...formLayout} label="余额">
        {form.getFieldDecorator('balance', {
          rules: [{ required: true, message: '不能为空！', min: 1 }],
          initialValue: '0',
        })(
          <InputNumber
            placeholder="初始金额"
            style={{ width: '100%' }}
            min={0}
            precision={2}
          />
        )}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
