import React from 'react'
import { Table, Icon, Input, Button, Modal, Form, message } from 'antd'
const defaultPagination = {
  pageSizeOptions: ['10', '50', '100', '250'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: total => `Total ${total} items`,
  total: 0,
}
class ProductCopy extends React.Component {
  state = {
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    previewVisible: false,
    previewImage: '',
    visible: false,
  }
  handleCancel = () => this.setState({ previewVisible: false })

  onInputChange = e => {
    this.setState({ searchText: e.target.value })
  }

  onSearch = () => {
    const { searchText, tableData } = this.state
    let reg = new RegExp(searchText, 'gi')
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: tableData
        .map(record => {
          let match = record.ProductName.match(reg)
          if (!match) {
            return null
          }
          return {
            ...record,
            name: (
              <span>
                {record.ProductName.split(reg).map(
                  (text, i) =>
                    i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text,
                )}
              </span>
            ),
          }
        })
        .filter(record => !!record),
    })
  }
  showDeleteConfirm(record, props) {
    let T = record
    Modal.confirm({
      title: 'Are you sure delete this row?',
      content: <div>Delelte Product Item = {record.ItemID}</div>,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        props.deleteProductItem(record.ItemID)
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }
  handleTableChange = (pagination, filters, sorter) => {
    if (this.state.pager) {
      const pager = { ...this.state.pager }
      if (pager.pageSize !== pagination.pageSize) {
        this.pageSize = pagination.pageSize
        pager.pageSize = pagination.pageSize
        pager.current = 1
      } else {
        pager.current = pagination.current
      }
      this.setState({
        pager: pager,
      })
    }
  }
  render() {
    let { pager, data } = this.state
    const columns = [
      {
        title: 'View',
        dataIndex: 'ProductID',
        key: 'ProductID',
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            {'#' + text}
          </a>
        ),
        sorter: (a, b) => a.ProductID - b.ProductID,
      },
      {
        title: 'ตัวที่',
        dataIndex: 'Copy',
        key: 'Copy',
        sorter: (a, b) => a.Copy.length - b.Copy.length,
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            {text}
          </a>
        ),
      },
      {
        title: 'Serail Number',
        dataIndex: 'SerailNumber',
        key: 'SerailNumber',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.SerailNumber - b.SerailNumber,
      },
      {
        title: 'ราคาที่ซื้อ',
        dataIndex: 'PurchasePrice',
        key: 'PurchasePrice',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.PurchasePrice - b.PurchasePrice,
      },
      {
        title: 'วันที่ซื้อ',
        dataIndex: 'PurchaseDate',
        key: 'PurchaseDate',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.PurchaseDate - b.PurchaseDate,
      },
      {
        title: 'อายุ',
        dataIndex: 'Note',
        key: 'Note',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.Note - b.Note,
      },
      {
        title: 'สถานะ',
        dataIndex: 'Status',
        key: 'Status',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.Status - b.Status,
      },
      {
        title: 'แก้ไข',
        key: 'edit',
        render: (text, record) => (
          <span>
            <Button
              shape="circle"
              icon="edit"
              //   onClick={() => this.onEditProductItem(record, this.props)}
              className="palm-btn-warning"
            />
          </span>
        ),
      },
      {
        title: 'ลบ',
        key: 'delete',
        render: (text, record) => (
          <span>
            <Button
              type="danger"
              shape="circle"
              icon="delete"
              // onClick={() => this.showDeleteConfirm(record, this.props)}
            />
          </span>
        ),
      },
    ]

    return (
      <div className="row">
        <div className="col-md-7">
          <div className="card">
            <div className="card-header">
              <div className="utils__title">
                <strong>อุปกรณ์ (Copy)</strong>
              </div>
              <Button type="primary" style={{ float: 'right' }}>
                เพิ่มอุปกรณ์ Copy
              </Button>
            </div>
            <div className="card-body">
              <Table
                columns={columns}
                // dataSource={this.props.productItemData.productItemData}
                pagination={pager}
                onChange={this.handleTableChange}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductCopy
