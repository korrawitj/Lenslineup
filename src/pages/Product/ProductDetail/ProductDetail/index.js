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
      const { visible, onCancel, onCreate, form, productItemData, productCate } = this.props
      const { getFieldDecorator } = form
      const formItemLayout = {
        labelCol: {
          xs: { span: 10 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 14 },
          sm: { span: 19 },
        },
      }
      const productInclude = [
        {
          title: 'View',
          key: 'CategoryID',
          render: (text, record) => (
            <span>
              <Button icon="cross" size="small" onClick={() => console.log(record)}>
                View
              </Button>
            </span>
          ),
        },
        {
          title: 'ตัวที่',
          dataIndex: 'CopyNo',
          key: 'CopyNo',
          render: text => (
            <a className="utils__link--underlined" href="javascript: void(0);">
              {text}
            </a>
          ),
          sorter: (a, b) => a.CopyNo - b.CopyNo,
        },
        {
          title: 'ชื่อสั้น',
          dataIndex: 'Serail',
          key: 'SerialNumber',
          render: text => (
            <a className="utils__link--underlined" href="javascript: void(0);">
              {text}
            </a>
          ),
          sorter: (a, b) => a.SerialNumber - b.SerialNumber,
        },
        {
          title: 'ราคาที่ซื้อ',
          dataIndex: 'PurchasePrice',
          key: 'PurchasePrice',
          render: text => (
            <a className="utils__link--underlined" href="javascript: void(0);">
              {'#' + text}
            </a>
          ),
          sorter: (a, b) => a.PurchasePrice - b.PurchasePrice,
        },
        {
          title: 'วันที่ซื้อ',
          dataIndex: 'PurchaseDate',
          key: 'PurchaseDate',
          render: text => (
            <a className="utils__link--underlined" href="javascript: void(0);">
              {'#' + text}
            </a>
          ),
          sorter: (a, b) => a.PurchaseDate - b.PurchaseDate,
        },
        {
          title: 'สถานะ',
          dataIndex: 'Status',
          key: 'Status',
          render: text => (
            <a className="utils__link--underlined" href="javascript: void(0);">
              {'#' + text}
            </a>
          ),
          sorter: (a, b) => a.Status - b.Status,
        },
        {
          title: 'แก้ไข',
          key: 'Edit',
          render: (text, record) => (
            <span>
              <Button icon="cross" size="small" onClick={() => console.log(record)}>
                Edit
              </Button>
            </span>
          ),
        },
        {
          title: 'ลบ',
          key: 'Action',
          render: (text, record) => (
            <span>
              <Button icon="cross" size="small" onClick={() => console.log(record)}>
                Remove
              </Button>
            </span>
          ),
        },
      ]

      return (
        <div>
          <div className="card-body">
            <Form>
              <FormItem {...formItemLayout} label="อุุปกรณ์">
                {getFieldDecorator('productItemData.Name', { initialValue: productItemData.Name })(
                  <Input />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="ยี่ห้อ">
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
              <div className="card-header">
                <div className="utils__title">
                  <strong>อุปกรณ์ที่ให้ไประหว่างเช่า</strong>
                </div>
              </div>
              <div className="card-body" />
            </Form>
          </div>
        </div>
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

class ProductDetail extends React.Component {
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
  showModal = () => {
    this.setState({ visible: true })
  }
  handleCreate = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
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
  componentDidMount() {}

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>จัดการอุปกรณ์</strong>
          </div>
        </div>
        <div className="card-body">
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            productItemData={this.state.productItemData}
            productCate={this.props.product.productCate}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
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
)(ProductDetail)
