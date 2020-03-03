import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal, Select, InputNumber, Row, Col, DatePicker } from 'antd';
import React, { Component } from 'react';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import { TableListItem } from '../data.d';
import moment from 'moment';

export interface FormValueType extends Partial<TableListItem> {}

export interface UpdateFormProps extends FormComponentProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}

const FormItem = Form.Item;
const { TextArea } = Input;

export interface UpdateFormState {
  formVals: FormValueType;
}

class UpdateForm extends Component<UpdateFormProps, UpdateFormState> {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
  };

  formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  constructor(props: UpdateFormProps) {
    super(props);

    this.state = {
      formVals: {
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
      },
    };
  }

  render() {
    const { updateModalVisible, onSubmit: handleUpdate, onCancel, form } = this.props;
    const { formVals } = this.state;

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleUpdate({
          id: formVals.id,
          consumeTime: moment(fieldsValue.consumeTime).format('YYYY-MM-DD HH:mm:ss'),
          consumeTitle: fieldsValue.consumeTitle,
          tradeNo: fieldsValue.tradeNo,
          tradeId: fieldsValue.tradeId,
          other: fieldsValue.other,
          amount: fieldsValue.amount! * 100,
          fundFlow: fieldsValue.fundFlow,
          status: fieldsValue.status,
          fundTool: fieldsValue.fundTool,
          fundToolFrom: fieldsValue.fundToolFrom,
          memo: fieldsValue.memo,
        });
      });
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
        <Form {...this.formLayout}>
          <Row>
            <Col span={12}>
              <FormItem label="消费时间">
                {form.getFieldDecorator('consumeTime', {
                  rules: [{ type: 'object', required: true, message: '不能为空！' }],
                  initialValue: moment(formVals.consumeTime),
                })(
                  <DatePicker
                    style={{ width: '100%' }}
                    showTime={{
                      format: 'YYYY-MM-DD HH:mm:ss',
                    }}
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="消费时间"
                    allowClear
                  />,
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="消费标题">
                {form.getFieldDecorator('consumeTitle', {
                  rules: [{ required: true, message: '不能为空！', min: 1 }],
                  initialValue: formVals.consumeTitle,
                })(<Input placeholder="消费标题" allowClear />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="商户订单号">
                {form.getFieldDecorator('tradeNo', {
                  initialValue: formVals.tradeNo,
                })(<Input placeholder="商户订单号" allowClear />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="流水号">
                {form.getFieldDecorator('tradeId', {
                  initialValue: formVals.tradeId,
                })(<Input placeholder="流水号" allowClear />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="对方">
                {form.getFieldDecorator('other', {
                  initialValue: formVals.other,
                })(<Input placeholder="对方" allowClear />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="状态">
                {form.getFieldDecorator('status', {
                  rules: [{ required: true, message: '不能为空！', min: 1 }],
                  initialValue: formVals.status,
                })(<Input placeholder="状态" allowClear />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="资金流向">
                {form.getFieldDecorator('fundFlow', {
                  rules: [{ required: true, message: '不能为空！', min: 1 }],
                  initialValue: formVals.fundFlow,
                })(
                  <Select style={{ width: '100%' }}>
                    <Select.Option value="1">收入</Select.Option>
                    <Select.Option value="-1">支出</Select.Option>
                    <Select.Option value="0">转账</Select.Option>
                  </Select>,
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="金额">
                {form.getFieldDecorator('amount', {
                  rules: [{ type: 'number', required: true, message: '不能为空！', min: 0 }],
                  initialValue: formVals.amount,
                })(
                  <InputNumber
                    placeholder="消费金额"
                    style={{ width: '100%' }}
                    min={0}
                    precision={2}
                  />,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="账户">
                {form.getFieldDecorator('fundTool', {
                  rules: [{ required: true, message: '不能为空！', min: 1 }],
                  initialValue: formVals.fundTool,
                })(<Input placeholder="账户" allowClear />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="流出账户">
                {form.getFieldDecorator('fundToolFrom', {
                  initialValue: formVals.fundToolFrom,
                })(<Input placeholder="流出账户" allowClear />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label="备注" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                {form.getFieldDecorator('memo', {
                  initialValue: formVals.memo,
                })(<TextArea style={{ width: '100%' }} rows={2} maxLength={64} />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default Form.create<UpdateFormProps>()(UpdateForm);
