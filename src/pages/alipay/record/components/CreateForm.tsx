import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal, Select, InputNumber, DatePicker, Row, Col } from 'antd';
import moment from 'moment';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import React from 'react';
import { TableListItem } from '../data';

const FormItem = Form.Item;
const { TextArea } = Input;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: TableListItem) => void;
  onCancel: () => void;
}


const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16, },
};

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, onSubmit: handleAdd, onCancel } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue: TableListItem) => {
      if (err) return;
      form.resetFields();
      fieldsValue.consumeTime = moment(fieldsValue.consumeTime).format('YYYY-MM-DD HH:mm:ss');
      fieldsValue.amount = fieldsValue.amount * 100;
      handleAdd(fieldsValue);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="新建支付宝账单"
      visible={modalVisible}
      width={700}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form {...formLayout}>
        <Row>
          <Col span={12}>
            <FormItem label="消费时间">
              {form.getFieldDecorator('consumeTime', {
                rules: [{ type: 'object', required: true, message: '不能为空！' }],
                initialValue: moment(),
              })(
                <DatePicker
                  style={{ width: '100%' }}
                  showTime={{
                    format: 'YYYY-MM-DD HH:mm:ss',
                  }}
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="消费时间"
                  allowClear />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="消费标题">
              {form.getFieldDecorator('consumeTitle', {
                rules: [{ required: true, message: '不能为空！', min: 1 }],
              })(
                <Input placeholder="消费标题" allowClear />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="商户订单号">
              {form.getFieldDecorator('tradeNo', {})(
                <Input placeholder="商户订单号" allowClear />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="流水号">
              {form.getFieldDecorator('tradeId', {})(
                <Input placeholder="流水号" allowClear />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="对方">
              {form.getFieldDecorator('other', {})(
                <Input placeholder="对方" allowClear />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="状态">
              {form.getFieldDecorator('status', {
                rules: [{ required: true, message: '不能为空！', min: 1 }],
              })(
                <Input placeholder="状态" allowClear />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="资金流向">
              {form.getFieldDecorator('fundFlow', {
                rules: [{ required: true, message: '不能为空！', min: 1 }],
                initialValue: '1',
              })(
                <Select style={{ width: '100%' }}>
                  <Select.Option value="1">收入</Select.Option>
                  <Select.Option value="-1">支出</Select.Option>
                  <Select.Option value="0">转账</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="金额">
              {form.getFieldDecorator('amount', {
                rules: [{ type: 'number', required: true, message: '不能为空！', min: 0 }],
                initialValue: 0,
              })(
                <InputNumber
                  placeholder="消费金额"
                  style={{ width: '100%' }}
                  min={0}
                  precision={2}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="账户">
              {form.getFieldDecorator('fundTool', {
                rules: [{ required: true, message: '不能为空！', min: 1 }],
              })(
                <Input placeholder="账户" allowClear />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="流出账户">
              {form.getFieldDecorator('fundToolFrom', {
              })(
                <Input placeholder="流出账户" allowClear />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label="备注" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
              {form.getFieldDecorator('memo', {
              })(
                <TextArea
                  style={{ width: '100%' }}
                  rows={2}
                  maxLength={64}
                />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form >
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
