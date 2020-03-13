import { Input, Modal, Select, InputNumber, Row, Col, DatePicker, Form } from 'antd';
import React, { useState } from 'react';

import { TableListItem, FormValueType } from '../data.d';
import moment from 'moment';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}

const { TextArea } = Input;

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export interface UpdateFormState {
  formVals: FormValueType;
}

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const [form] = Form.useForm();
  const { updateModalVisible, onSubmit: handleUpdate, onCancel } = props;

  const [formVals] = useState<FormValueType>({
    id: props.values.id,
    userCode: props.values.userCode,
    consumeTime: props.values.consumeTime,
    consumeTitle: props.values.consumeTitle,
    tradeNo: props.values.tradeNo,
    tradeId: props.values.tradeId,
    other: props.values.other,
    amount: props.values.amount! / 100,
    fundFlow: props.values.fundFlow,
    status: props.values.status,
    fundTool: props.values.fundTool,
    fundToolFrom: props.values.fundToolFrom,
    memo: props.values.memo,
  });

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    fieldsValue.id = formVals.id;
    fieldsValue.consumeTime = moment(fieldsValue.consumeTime).format('YYYY-MM-DD HH:mm:ss');
    fieldsValue.amount = fieldsValue.amount! * 100;
    handleUpdate(fieldsValue);
  };

  return (
    <Modal
      destroyOnClose
      title="修改支付宝账单"
      visible={updateModalVisible}
      onOk={okHandle}
      width={700}
      onCancel={() => onCancel()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          consumeTime: moment(formVals.consumeTime),
          consumeTitle: formVals.consumeTitle,
          tradeNo: formVals.tradeNo,
          tradeId: formVals.tradeId,
          other: formVals.other,
          amount: formVals.amount,
          fundFlow: formVals.fundFlow,
          status: formVals.status,
          fundTool: formVals.fundTool,
          fundToolFrom: formVals.fundToolFrom,
          memo: formVals.memo,
        }}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              name="consumeTime"
              label="消费时间"
              rules={[{ type: 'object', required: true, message: '不能为空！' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                showTime={{
                  format: 'YYYY-MM-DD HH:mm:ss',
                }}
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="消费时间"
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="consumeTitle"
              label="消费标题"
              rules={[{ required: true, message: '不能为空！' }]}
            >
              <Input placeholder="消费标题" allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name="tradeNo" label="商户订单号">
              <Input placeholder="商户订单号" allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="tradeId" label="流水号">
              <Input placeholder="流水号" allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name="other" label="对方">
              <Input placeholder="对方" allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="status"
              label="状态"
              rules={[{ required: true, message: '不能为空！' }]}
            >
              <Input placeholder="状态" allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name="fundFlow"
              label="资金流向"
              rules={[{ required: true, message: '不能为空！' }]}
            >
              <Select style={{ width: '100%' }}>
                <Select.Option value="1">收入</Select.Option>
                <Select.Option value="-1">支出</Select.Option>
                <Select.Option value="0">转账</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="amount"
              label="金额"
              rules={[{ type: 'number', required: true, message: '最小值为0', min: 0 }]}
            >
              <InputNumber placeholder="消费金额" style={{ width: '100%' }} min={0} precision={2} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name="fundTool"
              label="账户"
              rules={[{ required: true, message: '不能为空！' }]}
            >
              <Input placeholder="账户" allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="fundToolFrom" label="流出账户">
              <Input placeholder="流出账户" allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item name="memo" label="备注" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
              <TextArea style={{ width: '100%' }} rows={2} maxLength={64} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
