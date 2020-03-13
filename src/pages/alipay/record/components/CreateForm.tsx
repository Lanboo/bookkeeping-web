import { Input, Modal, Select, InputNumber, DatePicker, Row, Col, Form } from 'antd';
import moment from 'moment';
import React from 'react';

import { TableListParams } from '../data';

const { TextArea } = Input;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: TableListParams) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16, },
};

const CreateForm: React.FC<CreateFormProps> = props => {
  const [form] = Form.useForm();
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    fieldsValue.consumeTime = moment(fieldsValue.consumeTime).format('YYYY-MM-DD HH:mm:ss');
    fieldsValue.amount = fieldsValue.amount * 100;
    handleAdd(fieldsValue);
  };

  return (
    <Modal
      destroyOnClose
      title="新建支付宝账单"
      visible={modalVisible}
      width={700}
      onOk={okHandle}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
    >
      <Form form={form} {...formLayout}
        initialValues={{
          consumeTime: moment(),
          fundFlow: '1',
          amount: 0,
        }}
      >
        <Row>
          <Col span={12}>
            <Form.Item name="consumeTime" label="消费时间" rules={[{ type: 'object', required: true, message: '不能为空！' }]} >
              <DatePicker
                style={{ width: '100%' }}
                showTime={{
                  format: 'YYYY-MM-DD HH:mm:ss',
                }}
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="消费时间"
                allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="consumeTitle" label="消费标题" rules={[{ required: true, message: '不能为空！' }]} >
              <Input placeholder="消费标题" allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name="tradeNo" label="商户订单号" >
              <Input placeholder="商户订单号" allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="tradeId" label="流水号" >
              <Input placeholder="流水号" allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name="other" label="对方" >
              <Input placeholder="对方" allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="status" label="状态" rules={[{ required: true, message: '不能为空！' }]} >
              <Input placeholder="状态" allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name="fundFlow" label="资金流向" rules={[{ required: true, message: '不能为空！' }]} >
              <Select style={{ width: '100%' }}>
                <Select.Option value="1">收入</Select.Option>
                <Select.Option value="-1">支出</Select.Option>
                <Select.Option value="0">转账</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='amount' label="金额" rules={[{ type: 'number', required: true, message: '最小值为0', min: 0 }]}>
              <InputNumber
                placeholder="消费金额"
                style={{ width: '100%' }}
                min={0}
                precision={2}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name="fundTool" label="账户" rules={[{ required: true, message: '不能为空！' }]} >
              <Input placeholder="账户" allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="fundToolFrom" label="流出账户" >
              <Input placeholder="流出账户" allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item name="memo" label="备注" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
              <TextArea
                style={{ width: '100%' }}
                rows={2}
                maxLength={64}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form >
    </Modal>
  );
};

export default CreateForm;
