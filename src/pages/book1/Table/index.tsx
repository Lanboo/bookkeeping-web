import React from "react";
import styles from "./index.less";
import { Table, Divider, Tag } from "antd";
const rowSelection = {
}

const columns = [
  {
    title: "用户代码",
    dataIndex: "userCode",
    key: "userCode",
  },
  {
    title: "账本名称",
    dataIndex: "bookName",
    key: "bookName"
  },
  {
    title: "创建时间",
    dataIndex: "crtTime",
    key: "crtTime"
  },
  {
    title: "修改时间",
    dataIndex: "uptTime",
    key: "uptTime"
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    )
  }
];

const data = [
  {
    key: "1",
    userCode: "John Brown",
    bookName: 'bookName1',
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];

export default () => (
  <div className={styles.container}>
    <div id="components-table-demo-basic">
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  </div>
);
