import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal, Row, Col, Radio, InputNumber } from 'antd';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import React from 'react';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { id: number }) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

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
      title="新建字典"
      visible={modalVisible}
      width={700}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form {...formLayout}>
        <Row>
          <Col span={12}>
            <FormItem label="键值">
              {form.getFieldDecorator('dicKey', {
                rules: [{ required: true, message: '不能为空！' }],
              })(<Input placeholder="字典键值" allowClear />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="字典值">
              {form.getFieldDecorator('dicValue', {
                rules: [{ required: true, message: '不能为空！' }],
              })(<Input placeholder="字典值" allowClear />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="字典类型">
              {form.getFieldDecorator('dicType', {
                rules: [{ required: true, message: '不能为空！' }],
              })(<Input placeholder="字典类型" allowClear />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="类型描述">
              {form.getFieldDecorator('dicDesc', {
                rules: [{ required: true, message: '不能为空！' }],
              })(<Input placeholder="字典类型描述" allowClear />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="序号">
              {form.getFieldDecorator('idx', {
                rules: [{ type: 'number', message: '最小值为0', min: 0 }],
                initialValue: 0,
              })(
                <InputNumber placeholder="序号" style={{ width: '100%' }} min={0} precision={0} />,
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="父级字典">
              {form.getFieldDecorator('parentId', {})(<Input placeholder="父级字典" allowClear />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="是否有效">
              {form.getFieldDecorator('validity', {
                rules: [{ required: true, message: '不能为空！' }],
                initialValue: '1',
              })(
                <Radio.Group buttonStyle="outline">
                  <Radio.Button value="1">有效</Radio.Button>
                  <Radio.Button value="0">无效</Radio.Button>
                </Radio.Group>,
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
