import React from 'react'
import { Table, Icon, Input, Button, Modal, Radio, Form, Upload } from 'antd'
import * as actionCreators from '../../../../store/axios/productPackage'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const FormItem = Form.Item
const defaultPagination = {
  pageSizeOptions: ['10', '50', '100', '250'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: total => `Total ${total} items`,
  total: 0,
}

class ProductSet extends React.Component {
  state = {
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    productPackageData: {},
  }

  showDeleteConfirm(record) {
    let T = record
    Modal.confirm({
      title: 'Are you sure delete this row?',
      content: <div>Delelte ProductSet = {record.PackageID}</div>,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK')
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  onChange = e => {
    console.log('radio checked', e.target.value)
    this.setState({
      value: e.target.value,
    })
  }

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
          let match = record.SetName.match(reg)
          if (!match) {
            return null
          }
          return {
            ...record,
            name: (
              <span>
                {record.SetName.split(reg).map(
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

  componentDidMount() {
    this.props.getAllProductPackage()
  }

  render() {
    let { pager } = this.state
    const columns = [
      {
        title: 'Package ID',
        dataIndex: 'PackageID',
        key: 'PackageID',
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            {text}
          </a>
        ),
        sorter: (a, b) => a.setid - b.setid,
      },
      {
        title: 'อุปกรณ์',
        dataIndex: 'Name',
        key: 'Name',
        sorter: (a, b) => a.SetName.length - b.SetName.length,
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
        title: 'ราคา',
        dataIndex: 'ValuationPrice',
        key: 'ValuationPrice',
        render: text => <span>{'$' + text}</span>,
        sorter: (a, b) => a.ValuationPrice - b.ValuationPrice,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: text => (
          <span className={text === 'Processing' ? 'badge badge-primary' : 'badge badge-default'}>
            {text}
          </span>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button
              type="primary"
              shape="circle"
              icon="search"
              onClick={() => this.showData(record)}
            />
            <Button
              shape="circle"
              icon="edit"
              onClick={() => this.addDataConfirm(record)}
              style={{ backgroundColor: '#c49f47' }}
            />
            <Button
              type="danger"
              shape="circle"
              icon="delete"
              onClick={() => this.showDeleteConfirm(record)}
            />
          </span>
        ),
      },
    ]

    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>อุปกรณ์จัดชุด</strong>
          </div>
          <Link to="/product/set/detail" className="navbar-item">
            <Button type="primary" icon="plus">
              เพิ่มอุปกรณ์จัดชุด
            </Button>
          </Link>

        </div>
        <div className="card-body">
          <Table
            columns={columns}
            dataSource={this.props.productPackage.productPackageData}
            pagination={pager}
            onChange={this.handleTableChange}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    productPackage: state.productPackage,
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(ProductSet)
