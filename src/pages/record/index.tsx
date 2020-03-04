import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Divider, message, Modal, DatePicker, Tag } from 'antd';
import moment from 'moment';
import React, { useState, useRef } from 'react';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType, RequestData } from '@ant-design/pro-table';
import { UseFetchDataAction } from '@ant-design/pro-table/lib/useFetchData';
import 'antd/dist/antd.css';

import { TableListItem } from './data.d';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { query, update, save, remove } from './service';
import { loadSelectData, SelectDataEnum } from './loadSelectData';

const { RangePicker } = DatePicker;

interface TableListProps extends FormComponentProps {}

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

const selectDataEnum: SelectDataEnum = loadSelectData();

const TableList: React.FC<TableListProps> = () => {
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
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '消费时间',
      dataIndex: 'consumeTimeArray',
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
            config.onChange(value);
          }}
        />
      ),
    },
    {
      title: '账本',
      dataIndex: 'accountBook',
      filters: undefined,
      valueEnum: { ...selectDataEnum.selectEnum.bookEnum },
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
      valueEnum: { ...selectDataEnum.selectEnum.categoryEnum },
    },
    {
      title: '账户',
      dataIndex: 'asset',
      filters: undefined,
      valueEnum: { ...selectDataEnum.selectEnum.assetEnum },
    },
    {
      title: '成员',
      filters: undefined,
      dataIndex: 'familyMember',
      render: (_text, record, _index, _action) => {
        return record.familyMember
          .split(',')
          .map(memberId => (
            <Tag style={{ marginRight: '4px' }}>
              {selectDataEnum.selectEnum.memberEnum &&
                selectDataEnum.selectEnum.memberEnum[memberId]}
            </Tag>
          ));
      },
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
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '修改时间',
      dataIndex: 'uptTime',
      sorter: true,
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
    <PageHeaderWrapper>
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
        selectData={selectDataEnum.selectData}
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

export default Form.create<TableListProps>()(TableList);
