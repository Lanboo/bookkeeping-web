import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal, Select, InputNumber, Row, Col, DatePicker, Radio, TreeSelect } from 'antd';
import React, { Component } from 'react';
import moment from 'moment';
import { FormComponentProps } from '@ant-design/compatible/es/form';

import { TableListItem } from '../data.d';
import { TableListItem as Asset } from '../../asset/data';
import { BookSupport } from '@/pages/book/BookSupport';
import { AssetSupport } from '@/pages/asset/AssetSupport';
import { MemberSupport } from '@/pages/member/MemberSupport';
import { CategorySupport } from '@/pages/category/CategorySupport';

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
        busiType: props.values.busiType,
        accountBook: props.values.accountBook,
        amount: props.values.amount! / 100,
        flow: props.values.flow,
        category: props.values.category,
        asset: props.values.asset,
        recordTime: props.values.recordTime,
        recordDesc: props.values.recordDesc,
        familyMember: props.values.familyMember,
        alipayRecordId: props.values.alipayRecordId,
      },
    };
  }

  render() {
    const { updateModalVisible, onSubmit: handleUpdate, onCancel, form } = this.props;
    const { formVals } = this.state;

    const bookOptions = BookSupport.dataEnum.selectData.map(book => (
      <Select.Option value={book.id}>{book.bookName}</Select.Option>
    ));

    const assetOptionGroups: any[] = [];
    if (AssetSupport.dataEnum.selectData) {
      let assetOptionsMap: Map<String, Asset[]> = new Map();
      AssetSupport.dataEnum.selectData.forEach(asset => {
        if (!assetOptionsMap[asset.assetType]) {
          assetOptionsMap[asset.assetType] = [];
        }
        assetOptionsMap[asset.assetType].push(asset);
      });
      for (let assetType in assetOptionsMap) {
        let assetOptions = assetOptionsMap[assetType].map((asset: Asset) => (
          <Select.Option value={asset.id}>{asset.assetName}</Select.Option>
        ));
        assetOptionGroups.push(<Select.OptGroup label={assetType}>{assetOptions}</Select.OptGroup>);
      }
    }

    const memberOptions = MemberSupport.dataEnum.selectData.map(member => (
      <Select.Option value={member.id}>{member.memberName}</Select.Option>
    ));

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleUpdate({
          id: formVals.id,

          busiType: fieldsValue.busiType,
          accountBook: fieldsValue.accountBook,
          amount: fieldsValue.amount! * 100,
          flow: fieldsValue.flow,
          category: fieldsValue.category,
          asset: fieldsValue.asset,
          recordTime: moment(fieldsValue.recordTime).format('YYYY-MM-DD HH:mm:ss'),
          recordDesc: fieldsValue.recordDesc,
          familyMember: ((fieldsValue.familyMember as unknown) as String[]).join(','),
          alipayRecordId: fieldsValue.alipayRecordId,
        });
      });
    };

    return (
      <Modal
        destroyOnClose
        title="修改账单"
        visible={updateModalVisible}
        onOk={okHandle}
        width={700}
        onCancel={() => onCancel()}
      >
        <Form {...this.formLayout}>
          <Row>
            <Col span={12}>
              <FormItem label="消费时间">
                {form.getFieldDecorator('recordTime', {
                  rules: [{ type: 'object', required: true, message: '不能为空！' }],
                  initialValue: moment(formVals.recordTime),
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
                  initialValue: formVals.accountBook,
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
                {form.getFieldDecorator('flow', {
                  rules: [{ required: true, message: '不能为空' }],
                  initialValue: formVals.flow,
                })(
                  <Radio.Group buttonStyle="outline">
                    <Radio.Button value="1" style={{ color: '#389e0d' }}>
                      收入
                    </Radio.Button>
                    <Radio.Button value="-1" style={{ color: '#cf1322' }}>
                      支出
                    </Radio.Button>
                  </Radio.Group>,
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
                    placeholder="金额"
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
                {form.getFieldDecorator('asset', {
                  rules: [{ required: true, message: '不能为空！' }],
                  initialValue: formVals.asset,
                })(
                  <Select allowClear placeholder="账户" style={{ width: '100%' }}>
                    {assetOptionGroups}
                  </Select>,
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="分类">
                {form.getFieldDecorator('category', {
                  rules: [{ required: true, message: '不能为空！' }],
                  initialValue: formVals.category,
                })(
                  <TreeSelect
                    style={{ width: '100%' }}
                    placeholder="类别"
                    treeData={CategorySupport.dataEnum.selectData}
                    treeDefaultExpandAll={true}
                    allowClear
                  />,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label="成员" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                {form.getFieldDecorator('familyMember', {
                  rules: [{ required: true, message: '不能为空！' }],
                  initialValue: formVals.familyMember?.split(','),
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
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label="备注" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                {form.getFieldDecorator('recordDesc', {
                  initialValue: formVals.recordDesc,
                })(<TextArea style={{ width: '100%' }} rows={2} maxLength={128} />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default Form.create<UpdateFormProps>()(UpdateForm);
