import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Modal, DatePicker, Tag, Select, TreeSelect } from 'antd';
import moment from 'moment';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType, RequestData } from '@ant-design/pro-table';
import { UseFetchDataAction } from '@ant-design/pro-table/lib/useFetchData';
import 'antd/dist/antd.css';

import { TableListItem, FormValueType } from './data.d';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { query, update, save, remove } from './service';
import { BookSupport } from '../book/BookSupport';
import { CategorySupport } from '../category/CategorySupport';
import { AssetSupport } from '../asset/AssetSupport';
import { TableListItem as Asset } from '../asset/data';
import { MemberSupport } from '../member/MemberSupport';

const { RangePicker } = DatePicker;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await save({
      busiType: fields.busiType,
      accountBook: fields.accountBook,
      amount: fields.amount,
      flow: fields.flow,
      category: fields.category,
      asset: fields.asset,
      recordTime: fields.recordTime,
      recordDesc: fields.recordDesc,
      familyMember: fields.familyMember,
      alipayRecordId: fields.alipayRecordId,
    });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在修改');
  try {
    await update({
      id: fields.id,

      busiType: fields.busiType,
      accountBook: fields.accountBook,
      amount: fields.amount,
      flow: fields.flow,
      category: fields.category,
      asset: fields.asset,
      recordTime: fields.recordTime,
      recordDesc: fields.recordDesc,
      familyMember: fields.familyMember,
      alipayRecordId: fields.alipayRecordId,
    });
    hide();

    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = (
  selectedRows: TableListItem[] | undefined,
  action: UseFetchDataAction<RequestData<TableListItem>>,
) => {
  if (!selectedRows || selectedRows.length === 0) return true;
  try {
    Modal.confirm({
      title: '确认删除?',
      okType: 'danger',
      async onOk() {
        const hide = message.loading('正在删除');
        await remove(selectedRows.map(row => row.id));
        hide();
        message.success('删除成功，即将刷新');
        action.reload();
      },
      onCancel() {},
    });
    return true;
  } catch (error) {
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '用户代码',
      dataIndex: 'userCode',
      hideInSearch: true,
    },
    {
      title: '消费时间',
      dataIndex: 'recordTime',
      width: 160,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '消费时间',
      dataIndex: 'recordTimeArray',
      valueType: 'dateTime',
      hideInTable: true,
      renderFormItem: (
        _item: ProColumns<TableListItem>,
        config: {
          onChange?: (value: any) => void;
        },
      ) => (
        <RangePicker
          style={{ width: '100%' }}
          showTime={{
            format: 'HH:mm:ss',
            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
          }}
          ranges={{
            今天: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
            昨天: [
              moment('00:00:00', 'HH:mm:ss').add(-1, 'days'),
              moment('23:59:59', 'HH:mm:ss').add(-1, 'days'),
            ],
            最近7天: [
              moment('00:00:00', 'HH:mm:ss').add(-7, 'days'),
              moment('23:59:59', 'HH:mm:ss'),
            ],
            最近一个月: [
              moment('00:00:00', 'HH:mm:ss').add(-1, 'month'),
              moment('23:59:59', 'HH:mm:ss'),
            ],
          }}
          format="YYYY-MM-DD HH:mm:ss"
          placeholder={['Start Time', 'End Time']}
          onChange={(value: any) => {
            config.onChange && config.onChange(value);
          }}
        />
      ),
    },
    {
      title: '账本',
      dataIndex: 'accountBook',
      filters: undefined,
      formItemProps: {
        allowClear: 'allowClear',
      },
      valueEnum: { ...BookSupport.dataEnum.tableEnum },
    },
    {
      title: '金额',
      dataIndex: 'amount',
      valueType: 'money',
      hideInSearch: true,
      renderText: (text: number) => text / 100 + '',
    },
    {
      title: '收/支',
      dataIndex: 'flow',
      filters: undefined,
      formItemProps: {
        allowClear: 'allowClear',
      },
      valueEnum: {
        '1': { text: '收入', status: 'Success' },
        '-1': { text: '支出', status: 'Error' },
      },
    },
    {
      title: '分类',
      dataIndex: 'category',
      filters: undefined,
      valueEnum: { ...CategorySupport.dataEnum.tableEnum },
      renderFormItem: (
        _item: ProColumns<TableListItem>,
        config: { onChange?: (value: any) => void },
      ) => (
        <TreeSelect
          style={{ width: '100%' }}
          placeholder="类别"
          treeData={CategorySupport.dataEnum.selectData}
          treeDefaultExpandAll={true}
          allowClear
          onChange={(value: any) => config.onChange && config.onChange(value)}
        />
      ),
    },
    {
      title: '账户',
      dataIndex: 'asset',
      filters: undefined,
      valueEnum: { ...AssetSupport.dataEnum.tableEnum },
      renderFormItem: (
        _item: ProColumns<TableListItem>,
        config: { onChange?: (value: any) => void },
      ) => {
        let assetOptionGroups: any[] = [];

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
            assetOptionGroups.push(
              <Select.OptGroup label={assetType}>{assetOptions}</Select.OptGroup>,
            );
          }
        }
        return (
          <Select
            allowClear
            placeholder="账户"
            style={{ width: '100%' }}
            onChange={(value: any) => config.onChange && config.onChange(value)}
          >
            {assetOptionGroups}
          </Select>
        );
      },
    },
    {
      title: '成员',
      filters: undefined,
      dataIndex: 'familyMember',
      render: (_text, record, _index, _action) => {
        return record.familyMember.split(',').map(memberId => (
          <Tag color="blue" style={{ marginRight: '4px' }} key={memberId}>
            {MemberSupport.dataEnum.tableEnum[memberId]}
          </Tag>
        ));
      },
      renderFormItem: (
        _item: ProColumns<TableListItem>,
        config: { onChange?: (value: any) => void },
      ) => (
        <Select
          allowClear
          style={{ width: '100%' }}
          onChange={(value: any) => config.onChange && config.onChange(value)}
        >
          {MemberSupport.dataEnum.selectData.map(member => (
            <Select.Option value={member.id}>{member.memberName}</Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: '备注',
      dataIndex: 'recordDesc',
      hideInSearch: true,
    },
    {
      title: '支付宝账单ID',
      dataIndex: 'alipayRecordId',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'crtTime',
      width: 160,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '修改时间',
      dataIndex: 'uptTime',
      width: 160,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作人',
      dataIndex: 'operator',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record, index, action) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleRemove([record], action);
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  const deleteBtnState = { disabled: true };

  return (
    <PageHeaderWrapper title={false}>
      <ProTable<TableListItem>
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, { selectedRows }) => [
          <Button icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
            新建
          </Button>,
          <Button
            icon={<DeleteFilled />}
            type="danger"
            disabled={deleteBtnState.disabled}
            onClick={() => {
              handleRemove(selectedRows, action);
            }}
          >
            删除
          </Button>,
        ]}
        tableAlertRender={() => false}
        request={params => query(params)}
        columns={columns}
        rowSelection={{
          onChange: (_selectedRowKeys, selectedRows) => {
            if (selectedRows && selectedRows.length > 0) {
              deleteBtnState.disabled = false;
            } else {
              deleteBtnState.disabled = true;
            }
          },
        }}
        search={{ span: 6 }}
        beforeSearchSubmit={params => {
          if (params.recordTimeArray && params.recordTimeArray.length >= 2) {
            params.recordTimeStart = params.recordTimeArray[0];
            params.recordTimeEnd = params.recordTimeArray[1];
            params.recordTimeArray = undefined;
          }
          return params;
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '50'],
        }}
      />
      <CreateForm
        onSubmit={async value => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await handleUpdate(value);
            if (success) {
              handleModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
