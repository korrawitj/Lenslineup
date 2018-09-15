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
import tableData from './data.json'
import * as actionCreators from '../../../../store/axios/product'
import { connect } from 'react-redux'
import moment from 'moment'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const confirm = Modal.confirm
const { TextArea } = Input
const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      // const { pager } = this.props
      const { visible, onCancel, onCreate, form, productItemData } = this.props
      const { getFieldDecorator } = form
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      }
      // const dataCopy = [
      //   {
      //     title: 'View',
      //     key: 'CategoryID',
      //     render: (text, record) => (
      //       <span>
      //         <Button icon="cross" size="small" onClick={() => console.log(record)}>
      //           View
      //         </Button>
      //       </span>
      //     ),
      //   },
      //   {
      //     title: 'ตัวที่',
      //     dataIndex: 'CopyNo',
      //     key: 'CopyNo',
      //     render: text => (
      //       <a className="utils__link--underlined" href="javascript: void(0);">
      //         {text}
      //       </a>
      //     ),
      //     sorter: (a, b) => a.CopyNo - b.CopyNo,
      //   },
      //   {
      //     title: 'ชื่อสั้น',
      //     dataIndex: 'Serail',
      //     key: 'SerialNumber',
      //     render: text => (
      //       <a className="utils__link--underlined" href="javascript: void(0);">
      //         {text}
      //       </a>
      //     ),
      //     sorter: (a, b) => a.SerialNumber - b.SerialNumber,
      //   },
      //   {
      //     title: 'ราคาที่ซื้อ',
      //     dataIndex: 'PurchasePrice',
      //     key: 'PurchasePrice',
      //     render: text => (
      //       <a className="utils__link--underlined" href="javascript: void(0);">
      //         {'#' + text}
      //       </a>
      //     ),
      //     sorter: (a, b) => a.PurchasePrice - b.PurchasePrice,
      //   },
      //   {
      //     title: 'วันที่ซื้อ',
      //     dataIndex: 'PurchaseDate',
      //     key: 'PurchaseDate',
      //     render: text => (
      //       <a className="utils__link--underlined" href="javascript: void(0);">
      //         {'#' + text}
      //       </a>
      //     ),
      //     sorter: (a, b) => a.PurchaseDate - b.PurchaseDate,
      //   },
      //   {
      //     title: 'สถานะ',
      //     dataIndex: 'Status',
      //     key: 'Status',
      //     render: text => (
      //       <a className="utils__link--underlined" href="javascript: void(0);">
      //         {'#' + text}
      //       </a>
      //     ),
      //     sorter: (a, b) => a.Status - b.Status,
      //   },
      //   {
      //     title: 'แก้ไข',
      //     key: 'Edit',
      //     render: (text, record) => (
      //       <span>
      //         <Button icon="cross" size="small" onClick={() => console.log(record)}>
      //           Edit
      //         </Button>
      //       </span>
      //     ),
      //   },
      //   {
      //     title: 'ลบ',
      //     key: 'Action',
      //     render: (text, record) => (
      //       <span>
      //         <Button icon="cross" size="small" onClick={() => console.log(record)}>
      //           Remove
      //         </Button>
      //       </span>
      //     ),
      //   },
      // ]
      return (
        <Modal width={1000} visible={visible} okText="เพิ่ม" onCancel={onCancel} onOk={onCreate}>
          <div className="card-header">
            <div className="utils__title">
              <div className="utils__title">
                <strong>เพิ่มอุปกรณ์</strong>
              </div>
            </div>
          </div>
          <div className="card-body">
            <Form>
              <FormItem {...formItemLayout} label="อุุปกรณ์">
                {getFieldDecorator('productItemData.Name', { initialValue: productItemData.Name })(
                  <Input />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="แบรน">
                {getFieldDecorator('productItemData.BrandID')(<Select />)}
              </FormItem>
              <FormItem {...formItemLayout} label="ประเภท">
                {getFieldDecorator('productItemData.CategoryID')(<TreeSelect />)}
              </FormItem>
              <FormItem {...formItemLayout} label="ราคาเช่าหนึ่งวัน">
                {getFieldDecorator('productItemData.IsDay')(<Checkbox />)}
              </FormItem>
              {form.getFieldValue('productItemData.IsDay') === true ? (
                <FormItem {...formItemLayout} label="ราคาเช่าหนึ่งวัน">
                  {getFieldDecorator('productItemData.RentDay_Fee', {
                    initialValue: productItemData.RentDay_Fee,
                  })(<Input />)}
                </FormItem>
              ) : (
                ''
              )}
              <FormItem {...formItemLayout} label="ราคาเช่าครึ่งวัน">
                {getFieldDecorator('productItemData.IsHaftDay')(<Checkbox />)}
              </FormItem>
              {form.getFieldValue('productItemData.IsHaftDay') === true ? (
                <FormItem {...formItemLayout} label="ราคาเช่าครึ่งวัน">
                  {getFieldDecorator('productItemData.RentHalfDay_Fee')(<Input />)}
                </FormItem>
              ) : (
                ''
              )}
              <FormItem {...formItemLayout} label="ราคาเช่าหนึ่งชั่วโมง">
                {getFieldDecorator('productItemData.IsHour')(<Checkbox />)}
              </FormItem>
              {form.getFieldValue('productItemData.IsHour') === true ? (
                <FormItem {...formItemLayout} label="ราคาเช่าหนุ่งชั่วโมง">
                  {getFieldDecorator('productItemData.RentHour_Fee')(<Input />)}
                </FormItem>
              ) : (
                ''
              )}
              <FormItem {...formItemLayout} label="จำนวนวันขั้นต่ำที่ให้เช่า">
                {getFieldDecorator('productItemData.RentDay')(<Input />)}
              </FormItem>

              <FormItem {...formItemLayout} label="แบบที่ 1">
                {getFieldDecorator('productItemData.DepositType1')(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label="แบบที่ 2">
                {getFieldDecorator('productItemData.DepositType2')(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label="ราคาในสัญญา">
                {getFieldDecorator('productItemData.ContactPrice')(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label="QR Code">
                {getFieldDecorator('productItemData.QRID')(
                  <TextArea autosize={{ minRows: 2, maxRows: 6 }} />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Serial Number">
                {getFieldDecorator('productItemData.SerialNumber')(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label="ราคาที่ซื้อ">
                {getFieldDecorator('productItemData.PurchasePrice')(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label="วันที่ซื้อ">
                {getFieldDecorator('productItemData.PurchaseDate', {
                  initialValue:
                    productItemData.PurchaseDate == null
                      ? null
                      : moment(productItemData.PurchaseDate),
                })(<DatePicker />)}
              </FormItem>
              <FormItem {...formItemLayout} label="วันที่หมดประกัน">
                {getFieldDecorator('productItemData.ExpireDate')(<DatePicker />)}
              </FormItem>
              <FormItem {...formItemLayout} label="สถานที่ซื้อ / สภาพ / ประกัน">
                {getFieldDecorator('productItemData.Location')(
                  <TextArea autosize={{ minRows: 2, maxRows: 6 }} />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Remark (สภาพตำหนิ)">
                {getFieldDecorator('productItemData.Remark')(
                  <TextArea autosize={{ minRows: 2, maxRows: 6 }} />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Note">
                {getFieldDecorator('productItemData.Note')(
                  <TextArea autosize={{ minRows: 2, maxRows: 6 }} />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="สถานะหน้าเว็บ">
                {getFieldDecorator('productItemData.isShow')(
                  <Radio.Group>
                    <RadioButton value={true}>แสดง</RadioButton>
                    <RadioButton value={false}>ไม่แสดง</RadioButton>
                  </Radio.Group>,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="สถานะ">
                {getFieldDecorator('productItemData.Status')(
                  <Radio.Group>
                    <RadioButton value={true}>พร้อมให้เช่า</RadioButton>
                    <RadioButton value={false}>ยังไม่พร้อมให้เช่า</RadioButton>
                  </Radio.Group>,
                )}
              </FormItem>
            </Form>
          </div>
        </Modal>
      )
    }
  },
)

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
    tableData: tableData.data,
    data: tableData.data,
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
  showModal = () => {
    this.setState({ visible: true })
  }
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
          {/* <Button type="primary" icon="plus" onClick={() => this.addDataProduct()}>
            เพิ่มอุปกรณ์
          </Button> */}
          <Button icon="plus" type="primary" onClick={this.showModal}>
            เพิ่มอุปกรณ์
          </Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            productItemData={this.state.productItemData}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
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
