import React, { useState } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal, Row, Col, Select } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import TextArea from 'antd/lib/input/TextArea';

import { DicSupport } from '@/pages/base/dic/DicSupport';
import { TableListItem as Dic } from '@/pages/base/dic/data';
import TargetValueInput from './TargetValueInput';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { id: number }) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, onSubmit: handleAdd, onCancel } = props;
  const [busiType, setBusiType] = useState<string>('');
  const [targetField, setTargetField] = useState<string>('');
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
      title="新建规则"
      visible={modalVisible}
      width={760}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form {...formLayout}>
        <Row>
          <Col span={12}>
            <FormItem label="业务场景">
              {form.getFieldDecorator('busiType', {
                rules: [{ required: true, message: '不能为空！' }],
              })(
                <Select<string>
                  allowClear
                  placeholder="业务场景"
                  style={{ width: '100%' }}
                  onChange={value => setBusiType(value)}
                >
                  {DicSupport.dataEnum.selectTypeData['busiType']?.map((record: Dic) => (
                    <Select.Option value={record.dicKey}>{record.dicValue}</Select.Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="目标字段">
              {form.getFieldDecorator('targetField', {
                rules: [{ required: true, message: '不能为空！' }],
              })(
                <Select<string>
                  allowClear
                  placeholder="目标字段"
                  style={{ width: '100%' }}
                  onChange={value => setTargetField(value)}
                >
                  {DicSupport.dataEnum.selectTypeData[busiType]?.map((record: Dic) => (
                    <Select.Option value={record.dicKey}>{record.dicValue}</Select.Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="目标值">
              {form.getFieldDecorator('targetFieldValue', {
                rules: [{ required: true, message: '不能为空！' }],
              })(<TargetValueInput busiType={busiType} targetField={targetField} />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label="明细表达式" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
              {form.getFieldDecorator('expression', {
                rules: [{ required: true, message: '不能为空！' }],
              })(<TextArea style={{ width: '100%' }} rows={1} maxLength={256} />)}
            </FormItem>
          </Col>
        </Row>
        <Form.List>
          {fields => (
            <div>
              {fields.map(field => (
                <Form.Item {...field}>
                  <Input />
                </Form.Item>
              ))}
            </div>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
