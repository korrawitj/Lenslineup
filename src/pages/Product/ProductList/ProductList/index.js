import React from 'react'
import { Table, Icon, Input, Button, Modal } from 'antd'
import * as actionCreators from '../../../../store/axios/product'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../index.css'
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
  showDeleteConfirm(record, props) {
    let T = record
    confirm({
      title: 'คุณแน่ใจหรือไม่ที่จะลบ อุปกรณ์?',
      content: <div> อุปกรณ์ = {record.Name}</div>,
      okText: 'ตกลง',
      okType: 'danger',
      cancelText: 'ยกเลิก',
      iconType: 'close-circle',
      centered: true,
      async onOk() {
        await props.deleteProduct(record.ProductID)
        props.getAllProduct()
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
        title: 'อุปกรณ์',
        dataIndex: 'Name',
        key: 'Name',
        sorter: (a, b) => a.ProductName - b.ProductName,
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            {text}
          </a>
        ),
      },
      {
        title: 'ราคาเช่า',
        dataIndex: 'RentDay_Fee',
        key: 'RentDay_Fee',
        render: text => <span>{text == null ? '' : parseFloat(text).toFixed(2)}</span>,
        sorter: (a, b) => a.RentDay_Fee - b.RentDay_Fee,
      },
      {
        title: 'หลักประกัน1',
        dataIndex: 'DepositType1',
        key: 'DepositType1',
        render: text => <span>{text == null ? '' : parseFloat(text).toFixed(2)}</span>,
        sorter: (a, b) => a.DepositType1 - b.DepositType1,
      },
      {
        title: 'หลักประกัน2',
        dataIndex: 'DepositType2',
        key: 'DepositType2',
        render: text => <span>{text == null ? '' : parseFloat(text).toFixed(2)}</span>,
        sorter: (a, b) => a.DepositType2 - b.DepositType2,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button type="primary" shape="circle" icon="search" className="palm-btn-primary" />
            <Link
              to={{
                pathname: '/Product/list/detail',
                state: { productData: record },
              }}
              className="navbar-item"
            >
              <Button shape="circle" icon="edit" className="palm-btn-warning" />
            </Link>
            <Button
              type="danger"
              shape="circle"
              icon="delete"
              onClick={() => this.showDeleteConfirm(record, this.props)}
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
            <Button type="primary" style={{ float: 'right' }}>
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
