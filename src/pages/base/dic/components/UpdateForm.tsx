import {
  Input,
  Modal,
  Row,
  Col,
  InputNumber,
  Radio,
  AutoComplete,
  Typography,
  Select,
  Form,
} from 'antd';
import React, { useState } from 'react';

import { TableListItem, TableListItem as Dic, FormValueType } from '../data.d';
import { DicSupport } from '../DicSupport';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}

const { Text } = Typography;

export interface UpdateFormState {
  formVals: FormValueType;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const [form] = Form.useForm();
  const { updateModalVisible, onSubmit: handleUpdate, onCancel } = props;

  const [formVals] = useState<FormValueType>({
    id: props.values.id,
    dicKey: props.values.dicKey,
    dicValue: props.values.dicValue,
    dicType: props.values.dicType,
    dicDesc: props.values.dicDesc,
    parentId: props.values.parentId,
    validity: props.values.validity,
    idx: props.values.idx,
  });

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    fieldsValue.id = formVals.id;
    handleUpdate(fieldsValue);
  };

  let tempDicTypeOptions: any[] = [];
  const dicTypeOptions = DicSupport.dataEnum.selectData
    .map(record => ({
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
  const dicDescOptions = DicSupport.dataEnum.selectData
    .map(record => ({
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
  if (DicSupport.dataEnum.selectData) {
    let optionsMap: Map<String, Dic[]> = new Map();
    DicSupport.dataEnum.selectData.forEach(record => {
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

  return (
    <Modal
      destroyOnClose
      title="字段修改"
      visible={updateModalVisible}
      width={700}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form {...formLayout} form={form} initialValues={formVals}>
        <Row>
          <Col span={12}>
            <Form.Item
              name="dicKey"
              label="键值"
              rules={[{ required: true, message: '不能为空！' }]}
            >
              <Input placeholder="字典键值" allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="dicValue"
              label="字典值"
              rules={[{ required: true, message: '不能为空！' }]}
            >
              <Input placeholder="字典值" allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name="dicType"
              label="字典类型"
              rules={[{ required: true, message: '不能为空！' }]}
            >
              <AutoComplete
                allowClear
                placeholder="字典类型"
                options={dicTypeOptions}
              ></AutoComplete>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="dicDesc"
              label="类型描述"
              rules={[{ required: true, message: '不能为空！' }]}
            >
              <AutoComplete
                allowClear
                placeholder="类型描述"
                options={dicDescOptions}
              ></AutoComplete>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name="idx"
              label="序号"
              rules={[{ required: true, message: '最小值为0', min: 0 }]}
            >
              <InputNumber placeholder="序号" style={{ width: '100%' }} min={0} precision={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="parentId" label="父级字典">
              <Select allowClear showSearch placeholder="父级字典" style={{ width: '100%' }}>
                {parentIdOptionGroups}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name="validity"
              label="是否有效"
              rules={[{ required: true, message: '不能为空！' }]}
            >
              <Radio.Group buttonStyle="outline">
                <Radio.Button value="1">有效</Radio.Button>
                <Radio.Button value="0">无效</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
