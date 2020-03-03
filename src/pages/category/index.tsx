import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Divider, message, Modal } from 'antd';
import JsTreeList from 'js-tree-list';
import React, { useState, useRef } from 'react';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType, RequestData } from '@ant-design/pro-table';
import { UseFetchDataAction } from '@ant-design/pro-table/lib/useFetchData';
import 'antd/dist/antd.css';

import { TableListItem } from './data.d';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { query, queryList, update, save, remove } from './service';
import MyTreeSelect from './components/MyTreeSelect';

interface TableListProps extends FormComponentProps {}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await save({
      categoryName: fields.categoryName,
      parentId: fields.parentId,
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
      categoryName: fields.categoryName,
      id: fields.id,
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

let treeData: [] = [];

const treeDataEnum: Map<number, {}> = new Map();

const onLoadData = async () => {
  await queryList().then(data => {
    const queryData: TableListItem[] = data;
    const tempData = queryData.map(item => ({
      value: item.id,
      title: item.categoryName,
      parent: item.parentId ? item.parentId : null,
    }));
    const treeDataTemp: [] = new JsTreeList.ListToTree(tempData, {
      key_id: 'value',
      key_parent: 'parent',
      key_child: 'children',
    }).GetTree();
    treeData = treeDataTemp;
    queryData.forEach(record => {
      treeDataEnum[record.id] = { text: record.categoryName, status: 'Default' };
    });
  });
};

onLoadData();

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
      title: '用户名称',
      dataIndex: 'userCode',
      hideInSearch: true,
    },
    {
      title: '类型名称',
      dataIndex: 'categoryName',
    },
    {
      title: '父级类型',
      dataIndex: 'parentId',
      valueEnum: { ...treeDataEnum },
      renderFormItem: () => <MyTreeSelect treeData={treeData} />,
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
        pagination={false}
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
        treeData={treeData}
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
          treeData={treeData}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);
