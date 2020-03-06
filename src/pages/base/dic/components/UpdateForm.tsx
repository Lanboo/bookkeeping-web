import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal, Row, Col, InputNumber, Radio, AutoComplete, Typography, Select } from 'antd';
import React, { Component } from 'react';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import { TableListItem, TableListItem as Dic } from '../data.d';
import { SelectData } from '../loadSelectData';

export interface FormValueType extends Partial<TableListItem> {}

export interface UpdateFormProps extends FormComponentProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
  selectData?: SelectData;
}
const FormItem = Form.Item;
const { Text } = Typography;

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
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  constructor(props: UpdateFormProps) {
    super(props);

    this.state = {
      formVals: {
        id: props.values.id,
        dicType: props.values.dicType,
        dicDesc: props.values.dicDesc,
        dicKey: props.values.dicKey,
        dicValue: props.values.dicValue,
        parentId: props.values.parentId,
        validity: props.values.validity,
        idx: props.values.idx,
      },
    };
  }

  render() {
    const { updateModalVisible, onSubmit: handleUpdate, onCancel, form } = this.props;
    const { selectData } = this.props;
    const { formVals } = this.state;

    let tempDicTypeOptions: any[] = [];
    const dicTypeOptions = selectData?.dicData
      ?.map(record => ({
        value: record.dicType,
        label: (
          <>
            <Text type="secondary">{record.dicDesc}</Text>
            <Text> </Text>
            <Text>({record.dicType})</Text>
          </>
        ),
      }))
      .reduce((arr, current) => {
        if (!tempDicTypeOptions[current.value]) {
          tempDicTypeOptions[current.value] = current.value;
          arr.push(current);
        }
        return arr;
      }, tempDicTypeOptions);

    let tempDicDescOptions: any[] = [];
    const dicDescOptions = selectData?.dicData
      ?.map(record => ({
        value: record.dicDesc,
        label: (
          <>
            <Text>{record.dicDesc}</Text>
            <Text> </Text>
            <Text type="secondary">({record.dicType})</Text>
          </>
        ),
      }))
      .reduce((arr, current) => {
        if (!tempDicTypeOptions[current.value]) {
          tempDicTypeOptions[current.value] = current.value;
          arr.push(current);
        }
        return arr;
      }, tempDicDescOptions);

    const parentIdOptionGroups: any[] = [];
    if (selectData && selectData.dicData) {
      let optionsMap: Map<String, Dic[]> = new Map();
      selectData.dicData.forEach(record => {
        let key = record.dicDesc + '(' + record.dicType + ')';
        if (!optionsMap[key]) {
          optionsMap[key] = [];
        }
        optionsMap[key].push(record);
      });
      for (let key in optionsMap) {
        let assetOptions = optionsMap[key].map((record: Dic) => (
          <Select.Option value={record.id}>
            {record.dicValue}({record.dicKey})
          </Select.Option>
        ));
        parentIdOptionGroups.push(<Select.OptGroup label={key}>{assetOptions}</Select.OptGroup>);
      }
    }

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleUpdate({
          id: formVals.id,
          dicType: fieldsValue.dicType,
          dicDesc: fieldsValue.dicDesc,
          dicKey: fieldsValue.dicKey,
          dicValue: fieldsValue.dicValue,
          parentId: fieldsValue.parentId,
          validity: fieldsValue.validity,
          idx: fieldsValue.idx,
        });
      });
    };

    return (
      <Modal
        destroyOnClose
        title="字段修改"
        visible={updateModalVisible}
        width={700}
        onOk={okHandle}
        onCancel={() => onCancel()}
      >
        <Form {...this.formLayout}>
          <Row>
            <Col span={12}>
              <FormItem label="键值">
                {form.getFieldDecorator('dicKey', {
                  rules: [{ required: true, message: '不能为空！' }],
                  initialValue: formVals.dicKey,
                })(<Input placeholder="字典键值" allowClear />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="字典值">
                {form.getFieldDecorator('dicValue', {
                  rules: [{ required: true, message: '不能为空！' }],
                  initialValue: formVals.dicValue,
                })(<Input placeholder="字典值" allowClear />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="字典类型">
                {form.getFieldDecorator('dicType', {
                  rules: [{ required: true, message: '不能为空！' }],
                  initialValue: formVals.dicType,
                })(
                  <AutoComplete
                    allowClear
                    placeholder="字典类型"
                    options={dicTypeOptions}
                  ></AutoComplete>,
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="类型描述">
                {form.getFieldDecorator('dicDesc', {
                  rules: [{ required: true, message: '不能为空！' }],
                  initialValue: formVals.dicDesc,
                })(
                  <AutoComplete
                    allowClear
                    placeholder="类型描述"
                    options={dicDescOptions}
                  ></AutoComplete>,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="序号">
                {form.getFieldDecorator('idx', {
                  initialValue: formVals.idx,
                })(
                  <InputNumber
                    placeholder="序号"
                    style={{ width: '100%' }}
                    min={0}
                    precision={0}
                  />,
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="父级字典">
                {form.getFieldDecorator('parentId', {
                  initialValue: formVals.parentId,
                })(
                  <Select allowClear showSearch placeholder="父级字典" style={{ width: '100%' }}>
                    {parentIdOptionGroups}
                  </Select>,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="是否有效">
                {form.getFieldDecorator('validity', {
                  rules: [{ required: true, message: '不能为空！' }],
                  initialValue: formVals.validity,
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
  }
}

export default Form.create<UpdateFormProps>()(UpdateForm);
