import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal, Select, InputNumber, DatePicker, Row, Col, TreeSelect } from 'antd';
import moment from 'moment';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import React from 'react';
import { TableListItem } from '../data';
import { SelectData } from '../loadSelectData';

const FormItem = Form.Item;
const { TextArea } = Input;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: TableListItem) => void;
  onCancel: () => void;
  selectData?: SelectData;
}

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, onSubmit: handleAdd, onCancel } = props;
  const { selectData } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue: TableListItem) => {
      if (err) return;
      form.resetFields();
      fieldsValue.recordTime = moment(fieldsValue.recordTime).format('YYYY-MM-DD HH:mm:ss');
      fieldsValue.amount = fieldsValue.amount * 100;
      handleAdd(fieldsValue);
    });
  };

  const bookOptions =
    selectData &&
    selectData.bookSelDate &&
    selectData.bookSelDate.map(book => (
      <Select.Option value={book.id}>{book.bookName}</Select.Option>
    ));

  const assetOptions =
    selectData &&
    selectData.assetDate &&
    selectData.assetDate.map(asset => (
      <Select.Option value={asset.id}>{asset.assetName}</Select.Option>
    ));

  const memberOptions =
    selectData &&
    selectData.memberSelDate &&
    selectData.memberSelDate.map(member => (
      <Select.Option value={member.id}>{member.memberName}</Select.Option>
    ));

  return (
    <Modal
      destroyOnClose
      title="新建账单"
      visible={modalVisible}
      width={700}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form {...formLayout}>
        <Row>
          <Col span={12}>
            <FormItem label="消费时间">
              {form.getFieldDecorator('recordTime', {
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
                  allowClear
                />,
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="账本">
              {form.getFieldDecorator('accountBook', {
                rules: [{ required: true, message: '不能为空！' }],
              })(
                <Select allowClear placeholder="账本" style={{ width: '100%' }}>
                  {bookOptions}
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="资金流向">
              {form.getFieldDecorator('fundFlow', {
                rules: [{ required: true, message: '不能为空！' }],
                initialValue: '1',
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
                initialValue: 0,
              })(
                <InputNumber placeholder="金额" style={{ width: '100%' }} min={0} precision={2} />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="分类">
              {form.getFieldDecorator('category', {
                rules: [{ required: true, message: '不能为空！' }],
              })(
                <TreeSelect
                  style={{ width: '100%' }}
                  placeholder="类别"
                  treeData={selectData!.categorySelDate}
                  treeDefaultExpandAll={true}
                  allowClear
                />,
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="账户">
              {form.getFieldDecorator('asset', {
                rules: [{ required: true, message: '不能为空！' }],
              })(
                <Select allowClear placeholder="账户" style={{ width: '100%' }}>
                  {assetOptions}
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label="成员" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
              {form.getFieldDecorator('familyMember', {
                rules: [{ required: true, message: '不能为空！' }],
              })(
                <Select
                  allowClear
                  mode="multiple"
                  placeholder="多成员平摊"
                  style={{ width: '100%' }}
                >
                  {memberOptions}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={12}></Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem label="备注" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
              {form.getFieldDecorator(
                'recordDesc',
                {},
              )(<TextArea style={{ width: '100%' }} rows={2} maxLength={128} />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
