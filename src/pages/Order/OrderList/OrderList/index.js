import React from 'react'
import {
  Table,
  Icon,
  Input,
  Button,
  Modal,
  Upload,
  DatePicker,
  Radio,
  Form,
  Checkbox,
  Select,
  TreeSelect,
} from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const defaultPagination = {
  pageSizeOptions: ['10', '50', '100', '250'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: total => `Total ${total} items`,
  total: 0,
}

class OrderList extends React.Component {
  state = {
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    previewVisible: false,
    previewImage: '',
    visible: false,
    fileList: [
      {
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
  }

  render() {
    let { pager, data } = this.state
    const columns = [
      {
        title: 'OrderID',
        dataIndex: 'OrderID',
        key: 'OrderID',
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            {text}
          </a>
        ),
        // sorter: (a, b) => a.id - b.id,
      },
      {
        title: 'รายการ',
        dataIndex: 'Name',
        key: 'Name',
        // sorter: (a, b) => a.ProductName.length - b.ProductName.length,
      },
      {
        title: 'ลูกค้า',
        dataIndex: 'Username',
        key: 'Username',
        render: text => <span>{text == null ? '' : text}</span>,
        // sorter: (a, b) => a.RentPrice - b.RentPrice,
      },
      {
        title: 'สถานะ',
        dataIndex: 'Status',
        key: 'Status',
        render: text => <span>{text == null ? '' : text}</span>,
        // sorter: (a, b) => a.GuaranteePrice - b.GuaranteePrice,
      },
      {
        title: 'วันที่รับ',
        dataIndex: 'ReceiveDate',
        key: 'ReceiveDate',
        render: text => <span>{text == null ? '' : text}</span>,
        // sorter: (a, b) => a.GuaranteePrice2 - b.GuaranteePrice2,
      },
      {
        title: 'วันที่คืน',
        dataIndex: 'RestoreDate',
        key: 'RestoreDate',
        render: text => <span>{text == null ? '' : text}</span>,
        // sorter: (a, b) => a.GuaranteePrice2 - b.GuaranteePrice2,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button type="primary" shape="circle" icon="search" onClick={this.onSearch} />
            <Button
              shape="circle"
              icon="edit"
              onClick={this.onSearch}
              style={{ backgroundColor: '#c49f47' }}
            />
            <Button
              type="danger"
              shape="circle"
              icon="delete"
              // onClick={() => this.showDeleteConfirm(record)}
            />
          </span>
        ),
      },
    ]
    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>รายการจองทั้งหมด</strong>
          </div>
          <Link to="/order/list/detail" className="navbar-item">
            <Button icon="plus" type="primary">
              เพิ่มรายการจอง
            </Button>
          </Link>
        </div>
        <div className="card-body">
          <Table
            columns={columns}
            // dataSource={}
            pagination={pager}
            // onChange={this.handleTableChange}
          />
        </div>
      </div>
    )
  }
}

export default OrderList
