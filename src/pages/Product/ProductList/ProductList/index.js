import React from 'react'
import { Table, Icon, Input, Button, Modal } from 'antd'
import * as actionCreators from '../../../../store/axios/product'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
const confirm = Modal.confirm

const defaultPagination = {
  pageSizeOptions: ['10', '50', '100', '250'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: total => `Total ${total} items`,
  total: 0,
}

class ProductList extends React.Component {
  state = {
    pager: { ...defaultPagination },
    productItemData: {},
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
  handleCancel = () => this.setState({ previewVisible: false, visible: false })

  handleCreate = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      console.log(values)
      form.resetFields()
      this.setState({ visible: false })
    })
  }
  saveFormRef = formRef => {
    this.formRef = formRef
  }
  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleChange = ({ fileList }) => this.setState({ fileList })
  showDeleteConfirm(record) {
    let T = record
    confirm({
      title: 'Are you sure delete this row?',
      content: <div>Delelte ProductID = {record.id}</div>,
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
  onInputChange = e => {
    this.setState({ searchText: e.target.value })
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
    this.props.getAllProduct()
  }

  render() {
    let { pager, data } = this.state
    const columns = [
      {
        title: 'ProductID',
        dataIndex: 'ProductID',
        key: 'ProductID',
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            {text}
          </a>
        ),
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: 'อุปกรณ์',
        dataIndex: 'Name',
        key: 'Name',
        sorter: (a, b) => a.ProductName.length - b.ProductName.length,
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
        title: 'ราคาเช่า',
        dataIndex: 'RentHourFee',
        key: 'RentHourFee',
        render: text => <span>{text == null ? '' : text}</span>,
        sorter: (a, b) => a.RentPrice - b.RentPrice,
      },
      {
        title: 'หลักประกัน1',
        dataIndex: 'DepositType1',
        key: 'DepositType1',
        render: text => <span>{text == null ? '' : text}</span>,
        sorter: (a, b) => a.GuaranteePrice - b.GuaranteePrice,
      },
      {
        title: 'หลักประกัน2',
        dataIndex: 'DepositType2',
        key: 'DepositType2',
        render: text => <span>{text == null ? '' : text}</span>,
        sorter: (a, b) => a.GuaranteePrice2 - b.GuaranteePrice2,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button type="primary" shape="circle" icon="search" className="palm-btn-primary" />
            <Button shape="circle" icon="edit" className="palm-btn-warning" />
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
            <strong>อุปกรณ์ทั้งหมด</strong>
          </div>
          <Link to="/Product/list/detail" className="navbar-item">
            <Button icon="plus" type="primary">
              เพิ่มอุปกรณ์
            </Button>
          </Link>
        </div>
        <div className="card-body">
          <Table
            columns={columns}
            dataSource={this.props.product.productData}
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
    product: state.product,
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(ProductList)
