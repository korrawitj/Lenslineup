import React from 'react'
import { Table, Icon, Input, Button, Modal, Upload, Form } from 'antd'
import tableData from './data.json'
import * as actionCreators from '../../../../store/axios/productinclude'
import { connect } from 'react-redux'
const FormItem = Form.Item
const TextArea = Input.TextArea
const defaultPagination = {
  pageSizeOptions: ['10', '50', '100', '250'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: total => `Total ${total} items`,
  total: 0,
}
const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, productIncludeData } = this.props
      const { getFieldDecorator } = form
      return (
        <Modal
          width={1000}
          visible={visible}
          title="Add ProductInclude"
          okText={productIncludeData.ItemID != null ? 'Update' : 'Create'}
          onCancel={onCancel}
          onOk={onCreate}
        >
          <div className="card-body">
            <Form layout="vertical">
              <FormItem label="ชื่อ">
                {getFieldDecorator('productIncludeData.Name')(<Input />)}
              </FormItem>
              <FormItem label="ราคาในสัญญา">
                {getFieldDecorator('productIncludeData.ContractPrice')(<Input />)}
              </FormItem>
              <FormItem label="จำนวน">
                {getFieldDecorator('productIncludeData.Quantity')(<Input />)}
              </FormItem>
              <FormItem label="Note">
                {getFieldDecorator('productIncludeData.Note')(
                  <TextArea autosize={{ minRows: 2, maxRows: 6 }} />,
                )}
              </FormItem>
            </Form>
          </div>
        </Modal>
      )
    }
  },
)
class ProductInclude extends React.Component {
  state = {
    tableData: tableData.data,
    data: tableData.data,
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    previewVisible: false,
    previewImage: '',
    visible: false,
    productIncludeData: {},
    fileList: [
      {
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
  }
  showModal = () => {
    this.setState({ visible: true })
  }
  saveFormRef = formRef => {
    this.formRef = formRef
  }
  handleCreate = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      console.log('Received values of form: ', values)
      this.props.addProductInclude(values.productIncludeData)
      form.resetFields()
      this.setState({ visible: false })
    })
  }
  handleCancel = () => this.setState({ previewVisible: false, visible: false })

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleChange = ({ fileList }) => this.setState({ fileList })
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
  showDeleteConfirm(record) {
    let T = record
    Modal.confirm({
      title: 'Are you sure delete this row?',
      content: <div>Delelte Product Include = {record.setid}</div>,
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

  showData(record) {
    let T = record
    Modal.info({
      title: <div>อุปกรณ์จัดชุด {record.ItemID}</div>,
      width: 1000,

      content: (
        <div className="row">
          <div className="col-md-4">
            <label>อุปกรณ์</label>
          </div>
          <div className="col-md-6">{record.Copy}</div>
          <div className="col-md-4">
            <label>ราคาในสัญญา</label>
          </div>
          <div className="col-md-6">{record.PromisePrice}</div>
          <div className="col-md-4">
            <label>จำนวน</label>
          </div>
          <div className="col-md-6">{record.Quantity}</div>
        </div>
      ),
      onOk() {},
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
  onCreateProductInclude = () => {
    this.setState({ productIncludeData: {} })
    this.showModal()
  }
  componentDidMount() {
    // this.props.getAllProductInclude()
  }

  render() {
    let { pager, data } = this.state
    const columns = [
      {
        title: 'ItemID',
        dataIndex: 'ItemID',
        key: 'ItemID',
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            {'#' + text}
          </a>
        ),
        sorter: (a, b) => a.ProductID - b.ProductID,
      },
      {
        title: 'อุปกรณ์',
        dataIndex: 'Name',
        key: 'Name',
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
        title: 'ราคาในสัญญา',
        dataIndex: 'ContractPrice',
        key: 'ContractPrice',
        render: text => <span>{'$' + text}</span>,
        sorter: (a, b) => a.PromisePrice - b.PromisePrice,
      },
      {
        title: 'จำนวน',
        dataIndex: 'Quantity',
        key: 'Quantity',
        render: text => <span>{'$' + text}</span>,
        sorter: (a, b) => a.Quantity - b.Quantity,
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
            <strong>อุปกรณ์ที่ให้ไประหว่างเช่า</strong>
          </div>
          <Button type="primary" icon="plus" onClick={this.onCreateProductInclude}>
            เพิ่มอุปกรณ์ที่ให้ไประหว่างเช่า
          </Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            productIncludeData={this.state.productIncludeData}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </div>
        <div className="card-body">
          <Table
            columns={columns}
            dataSource={this.props.productInclude.productIncludeData}
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
    productInclude: state.productInclude,
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(ProductInclude)
