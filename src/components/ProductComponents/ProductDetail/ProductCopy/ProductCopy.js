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
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => (this.searchInput = ele)}
              placeholder="Search name"
              value={this.state.searchText}
              onChange={this.onInputChange}
              onPressEnter={this.onSearch}
            />
            <Button type="primary" onClick={this.onSearch}>
              Search
            </Button>
          </div>
        ),
        filterIcon: (
          <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />
        ),
        filterDropdownVisible: this.state.filterDropdownVisible,
        onFilterDropdownVisibleChange: visible => {
          this.setState(
            {
              filterDropdownVisible: visible,
            },
            () => this.searchInput && this.searchInput.focus(),
          )
        },
      },
      {
        title: 'Serail',
        dataIndex: 'Serail',
        key: 'Serail',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.Serail - b.Serail,
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
        dataIndex: 'Note',
        key: 'Note',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.Note - b.Note,
      },
      {
        title: 'แก้ไข',
        key: 'action',
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
        key: 'action',
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
        <Table
            columns={columns}
            // dataSource={this.props.productItemData.productItemData}
            pagination={pager}
            onChange={this.handleTableChange}
          />
    )
  }
}

export default ProductCopy