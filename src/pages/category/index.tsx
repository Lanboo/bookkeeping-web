import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Divider, message, Modal } from 'antd';
import React, { useState, useRef, Component } from 'react';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType, RequestData } from '@ant-design/pro-table';
import { UseFetchDataAction } from '@ant-design/pro-table/lib/useFetchData';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { query, queryList, update, save, remove } from './service';
import 'antd/dist/antd.css';
import MyTreeSelect from './components/MyTreeSelect';


interface TableListProps extends FormComponentProps { }
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
const handleRemove = (selectedRows: TableListItem[], action: UseFetchDataAction<RequestData<TableListItem>>) => {
  if (!selectedRows || selectedRows.length == 0) return true;

  try {
    Modal.confirm({
      title: '确认删除?',
      okType: 'danger',
      onOk() {
        const hide = message.loading('正在删除');
        remove(selectedRows.map(row => row.id));
        hide();
        message.success('删除成功，即将刷新');
        action.reload();
      },
      onCancel() { },
    });
    return true;
  } catch (error) {
    message.error('删除失败，请重试');
    return false;
  }
};

let treeData: [] = [];

onLoadData = async () => {
  await queryList().then(data => {
    let queryData: TableListItem[] = data;
    let tempData = queryData.map(item => (
      {
        value: item.id,
        title: item.categoryName,
        parent: item.parentId
      }
    ));
    let treeDataTemp: [] = new JsTreeList.ListToTree(tempData, {
      key_id: "value",
      key_parent: "parent",
      key_child: "children",
    }).GetTree();
    treeData = treeDataTemp;
  });
}

class TableList1 extends Component<TableListProps> {

  constructor(props: TableListProps) {
    super(props);

    onLoadData();
  }

  render() {
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
        renderFormItem: () => {
          return <MyTreeSelect treeData={treeData} />;
        },
        ellipsis: true,
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
              onClick={e => {
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
          onLoad={(data) => { }}
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
  }
}

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
      renderFormItem: () => {
        return <MyTreeSelect />;
      },
      ellipsis: true,
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
            onClick={e => {
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
        onLoad={(data) => { }}
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
