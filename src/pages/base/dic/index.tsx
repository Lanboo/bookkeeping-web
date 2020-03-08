import { DeleteFilled, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Divider, message, Modal, Tooltip } from 'antd';
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

interface TableListProps extends FormComponentProps {}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await save({
      dicType: fields.dicType,
      dicDesc: fields.dicDesc,
      dicKey: fields.dicKey,
      dicValue: fields.dicValue,
      parentId: fields.parentId,
      validity: fields.validity,
      idx: fields.idx,
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
      dicType: fields.dicType,
      dicDesc: fields.dicDesc,
      dicKey: fields.dicKey,
      dicValue: fields.dicValue,
      parentId: fields.parentId,
      validity: fields.validity,
      idx: fields.idx,
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

let selectDataEnum: SelectDataEnum = loadSelectData();
const refreshSelectDataEnum = () => {
  selectDataEnum = loadSelectData();
};

const TableList: React.FC<TableListProps> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '字典键值',
      dataIndex: 'dicKey',
      formItemProps: {
        allowClear: 'allowClear',
        placeholder: '支持模糊查询',
      },
    },
    {
      title: '字典值',
      dataIndex: 'dicValue',
      formItemProps: {
        allowClear: 'allowClear',
        placeholder: '支持模糊查询',
      },
    },
    {
      title: '字典类型',
      dataIndex: 'dicType',
      formItemProps: {
        allowClear: 'allowClear',
        placeholder: '支持模糊查询',
      },
    },
    {
      title: '字典类型描述',
      dataIndex: 'dicDesc',
      formItemProps: {
        allowClear: 'allowClear',
        placeholder: '支持模糊查询',
      },
    },
    {
      title: '是否有效',
      dataIndex: 'validity',
      filters: undefined,
      formItemProps: {
        allowClear: 'allowClear',
      },
      valueEnum: {
        '1': { text: '有效', status: 'Success' },
        '0': { text: '无效', status: 'Error' },
      },
    },
    {
      title: '序号',
      dataIndex: 'idx',
      hideInSearch: true,
    },
    {
      title: '父级字典',
      dataIndex: 'parentId',
      filters: undefined,
      valueEnum: { ...selectDataEnum.selectEnum.dicEnum },
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'crtTime',
      width: 160,
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '修改时间',
      dataIndex: 'uptTime',
      width: 160,
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record, _index, action) => (
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
            type="primary"
            danger
            disabled={deleteBtnState.disabled}
            onClick={() => {
              handleRemove(selectedRows, action);
            }}
          >
            删除
          </Button>,
          <Tooltip title="刷新缓存">
            <Button icon={<ReloadOutlined />} type="link" onClick={() => refreshSelectDataEnum()} />
          </Tooltip>,
        ]}
        tableAlertRender={() => false}
        request={params => query(params)}
        columns={columns}
        search={{ span: 4 }}
        // size={"small"}
        rowSelection={{
          onChange: (_selectedRowKeys, selectedRows) => {
            if (selectedRows && selectedRows.length > 0) {
              deleteBtnState.disabled = false;
            } else {
              deleteBtnState.disabled = true;
            }
          },
        }}
        pagination={{
          defaultPageSize: 30,
          showSizeChanger: true,
          pageSizeOptions: ['30', '50', '100', '200'],
          showTotal: total => `Total ${total} items`,
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
          selectData={selectDataEnum.selectData}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);
