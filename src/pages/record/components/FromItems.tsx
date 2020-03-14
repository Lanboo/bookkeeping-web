import React from 'react';
import { Input, Select, InputNumber, DatePicker, Row, Col, TreeSelect, Radio, Form } from 'antd';

import { BookSupport } from '@/pages/book/BookSupport';
import { AssetSupport } from '@/pages/asset/AssetSupport';
import { TableListItem as Asset } from '@/pages/asset/data';
import { MemberSupport } from '@/pages/member/MemberSupport';
import { CategorySupport } from '@/pages/category/CategorySupport';

const { TextArea } = Input;

const FormItems: React.FC<{}> = _props => {
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

  return (
    <>
      <Row>
        <Col span={12}>
          <Form.Item
            name="recordTime"
            label="消费时间"
            rules={[{ type: 'object', required: true, message: '不能为空！' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              showTime={{ format: 'YYYY-MM-DD HH:mm:ss' }}
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="消费时间"
              allowClear
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="accountBook"
            label="账本"
            rules={[{ required: true, message: '不能为空！' }]}
          >
            <Select allowClear placeholder="账本" style={{ width: '100%' }}>
              {bookOptions}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            name="flow"
            label="资金流向"
            rules={[{ required: true, message: '不能为空！' }]}
          >
            <Radio.Group buttonStyle="outline">
              <Radio.Button value="1" style={{ color: '#389e0d' }}>
                收入
              </Radio.Button>
              <Radio.Button value="-1" style={{ color: '#cf1322' }}>
                支出
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="amount"
            label="金额"
            rules={[{ type: 'number', required: true, message: '不能为空！', min: 0 }]}
          >
            <InputNumber placeholder="金额" style={{ width: '100%' }} min={0} precision={2} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item name="asset" label="账户" rules={[{ required: true, message: '不能为空！' }]}>
            <Select allowClear placeholder="账户" style={{ width: '100%' }}>
              {assetOptionGroups}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="category"
            label="分类"
            rules={[{ required: true, message: '不能为空！' }]}
          >
            <TreeSelect
              style={{ width: '100%' }}
              placeholder="类别"
              treeData={CategorySupport.dataEnum.selectData}
              treeDefaultExpandAll={true}
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            name="familyMember"
            label="成员"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
            rules={[{ required: true, message: '不能为空！' }]}
          >
            <Select allowClear mode="multiple" placeholder="多成员平摊" style={{ width: '100%' }}>
              {memberOptions}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}></Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            name="recordDesc"
            label="备注"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
          >
            <TextArea style={{ width: '100%' }} rows={2} maxLength={128} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default FormItems;
