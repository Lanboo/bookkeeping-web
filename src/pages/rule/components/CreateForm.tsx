import React, { useState } from 'react';
import { Input, Modal, Row, Col, Select, Form, Button, Tooltip, Tag } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import { DicSupport } from '@/pages/base/dic/DicSupport';
import { TableListItem as Dic } from '@/pages/base/dic/data';
import TargetValueInput from './TargetValueInput';
import { TableListParams } from '../data';
import { TableListItem as Detail } from '../data.detail'
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';


interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: TableListParams) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const CreateForm: React.FC<CreateFormProps> = props => {
  const [form] = Form.useForm();
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;

  const [busiType, setBusiType] = useState<string>('');
  const [targetField, setTargetField] = useState<string>('');
  const [detailsCount, setDetailsCount] = useState<number>(0);

  let addFormItemOp: () => void = () => { };
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    (fieldsValue.details as Detail[])?.forEach((detail, index) => {
      detail.idx = index;
    });
    handleAdd(fieldsValue);
  };

  return (
    <Modal
      destroyOnClose
      title="新建规则"
      visible={modalVisible}
      width={760}
      onOk={okHandle}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
    >
      <Form form={form} {...formLayout}>
        <Row>
          <Col span={12}>
            <Form.Item
              name='busiType' label="业务场景"
              rules={[{ required: true, message: '不能为空！' }]}
            >
              <Select<string>
                allowClear
                placeholder="业务场景"
                style={{ width: '100%' }}
                onChange={value => setBusiType(value)}
              >
                {DicSupport.dataEnum.selectTypeData['busiType']?.filter((record: Dic) => record.dicKey != "AddByUser").map((record: Dic) => (
                  <Select.Option value={record.dicKey}>{record.dicValue}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name='targetField' label="目标字段"
              dependencies={['busiType']}
              rules={[{ required: true, message: '不能为空！' }]}
            >
              <Select<string>
                allowClear
                placeholder="目标字段"
                style={{ width: '100%' }}
                onChange={value => setTargetField(value)}
              >
                {DicSupport.dataEnum.selectTypeData[busiType]?.map((record: Dic) => (
                  <Select.Option value={record.dicKey}>{record.dicValue}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='targetFieldValue' label="目标值"
              dependencies={['targetField']}
              rules={[{ required: true, message: '不能为空！' }]}
            >
              <TargetValueInput busiType={busiType} targetField={targetField} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={18}>
            <Form.Item
              name='expression' label="明细表达式"
              labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}
              rules={[{ required: detailsCount > 0, message: '不能为空！' }]}
            >
              <TextArea rows={1} maxLength={256} allowClear style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={4} offset={2}>
            <Tooltip title="添加规则明细">
              <Button
                type="dashed"
                onClick={() => {
                  addFormItemOp();
                }}
                style={{ width: '100%' }}>
                <PlusCircleOutlined />
              </Button>
            </Tooltip>
          </Col>
        </Row>
        <Form.List name='details'>
          {(fields, { add, remove }) => {
            addFormItemOp = add;
            fields && setDetailsCount(fields.length);
            return (
              <>
                {fields && fields.length > 0 && (
                  <Row>
                    <Col span={2}>序号</Col>
                    <Col span={8}>源字段</Col>
                    <Col span={4}>关系</Col>
                    <Col span={8}>值</Col>
                    <Col span={2}></Col>
                  </Row>
                )}
                {fields.map((field, index) => {
                  return (
                    <Row>
                      <Col span={2}>
                        <Form.Item
                          name={[field.name, 'idx']}
                          wrapperCol={{ span: 24 }} style={{ paddingRight: '3px' }}
                        >
                          <Tag style={{ width: '100%', height: '32px', lineHeight: '30px', fontSize: '14px' }}> {index} </Tag>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name={[field.name, 'originField']}
                          wrapperCol={{ span: 24 }} style={{ paddingRight: '3px' }}
                          rules={[{ required: true, message: '不能为空！' }]}
                        >
                          <Select<string>
                            allowClear
                            placeholder="源字段"
                            style={{ width: '100%' }}
                          >
                            {DicSupport.dataEnum.selectTypeData['AlipayRecord']?.map((record: Dic) => (
                              <Select.Option value={record.dicKey}>{record.dicValue}</Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          name={[field.name, 'originOperator']}
                          wrapperCol={{ span: 24 }} style={{ paddingRight: '3px' }}
                          rules={[{ required: true, message: '不能为空！' }]}
                        >
                          <Select<string>
                            allowClear
                            placeholder="比较关系"
                            style={{ width: '100%' }}
                          >
                            {DicSupport.dataEnum.selectTypeData['compare']?.map((record: Dic) => (
                              <Select.Option value={record.dicKey}>{record.dicValue}</Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name={[field.name, 'originFieldValue']}
                          wrapperCol={{ span: 24 }} style={{ paddingRight: '3px' }}
                          rules={[{ required: true, message: '不能为空！' }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <Button type="dashed" onClick={() => remove(index)} style={{ width: '100%' }}>
                          <MinusCircleOutlined />
                        </Button>
                      </Col>
                    </Row>
                  )
                })}
              </>
            )
          }}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default CreateForm;
