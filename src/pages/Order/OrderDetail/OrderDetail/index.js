import React from 'react'
import * as actionCreators from '../../../../store/axios/order'
import {
  Table,
  Icon,
  Input,
  InputNumber,
  Button,
  Modal,
  Upload,
  DatePicker,
  Radio,
  Form,
  Checkbox,
  Select,
  TreeSelect,
  message,
  Tag,
  Divider,
  TimePicker,
} from 'antd'
import { connect } from 'react-redux'
import moment from 'moment'
import { relative } from 'path'
import './detail.css'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const confirm = Modal.confirm
const { TextArea } = Input
const Option = Select.Option

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { form, orderData } = this.props
      const { getFieldDecorator } = form

      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => <a href="javascript:;">{text}</a>,
        },
        {
          title: 'Copy',
          dataIndex: 'Copy',
          key: 'Copy',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span>
              <a href="javascript:;">Delete</a>
            </span>
          ),
        },
      ]

      const data = []

      const summaryFormLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      }

      return (
        <div>
          <div className="row">
            <div className="col-md-7">
              <div className="card">
                <div className="card-header">
                  <div className="utils__title">
                    <strong>เพิ่มรายการจอง</strong>
                  </div>
                </div>
                <hr />
                <div className="card-body">
                  <Form>
                    <div className="row">
                      <div className="col-md-6">
                        <FormItem label="อุปกรณ์" className="inputcenter">
                          {getFieldDecorator('orderData.Name', {
                            initialValue: orderData.Name,
                          })(<Input />)}
                        </FormItem>
                      </div>
                      <div className="col-md-3">
                        <FormItem label="ตัวที่" className="inputcenter">
                          {getFieldDecorator('orderData.Name', {
                            initialValue: orderData.Name,
                          })(<Input />)}
                        </FormItem>
                      </div>
                      <div className="col-md-2">
                        <FormItem label="เพิ่ม" className="inputcenter">
                          <Button type="primary" style={{ marginBottom: 16 }}>
                            เพิ่มอุปกรณ์
                          </Button>
                        </FormItem>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <Table visible={false} columns={columns} dataSource={data} bordered />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <FormItem label="วันเวลารับ" className="inputcenter">
                          {getFieldDecorator('orderData.ReceiveDate')(
                            <DatePicker format="YYYY-MM-DD" placeholder="date" />,
                          )}
                        </FormItem>
                      </div>
                      <div className="col-md-3">
                        <FormItem label="เวลา" className="inputcenter">
                          {getFieldDecorator('orderData.ReceiveDate')(
                            <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />,
                          )}
                        </FormItem>
                      </div>
                      <div className="col-md-3">
                        <FormItem label="วันเวลาคืน" className="inputcenter">
                          {getFieldDecorator('orderData.RestoreDate')(
                            <DatePicker
                              showTime
                              format="YYYY-MM-DD HH:mm:ss"
                              placeholder="Start"
                            />,
                          )}
                        </FormItem>
                      </div>
                      <div className="col-md-3">
                        <FormItem label="เวลา" className="inputcenter">
                          {getFieldDecorator('orderData.ReceiveDate')(
                            <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />,
                          )}
                        </FormItem>
                      </div>
                      <div className="col-md-3">
                        <FormItem label="" className="inputcenter">
                          <Button type="primary" style={{ marginBottom: 16 }}>
                            ตรวจสอบคิว
                          </Button>
                        </FormItem>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="utils__title">
                        <strong>ชื่ออุปกรณ์</strong>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-7">
              <div className="card">
                <div className="card-header">
                  <div className="utils__title">
                    <strong>สรุปการจอง</strong>
                  </div>
                </div>
                <hr />
                <div className="card-body">
                  <Form>
                    <FormItem {...summaryFormLayout} label="จำนวนวัน">
                      {getFieldDecorator('totalDay', {
                        rules: [
                          {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                          },
                          {
                            required: true,
                            message: 'Please input your E-mail!',
                          },
                        ],
                      })(<Input />)}
                    </FormItem>
                    <FormItem {...summaryFormLayout} label="ค่าเช่ารวม">
                      {getFieldDecorator('totalRent', {
                        rules: [
                          {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                          },
                          {
                            required: true,
                            message: 'Please input your E-mail!',
                          },
                        ],
                      })(<Input />)}
                    </FormItem>
                    <FormItem {...summaryFormLayout} label="หลักประกันรวม">
                      {getFieldDecorator('totalPromise', {
                        rules: [
                          {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                          },
                          {
                            required: true,
                            message: 'Please input your E-mail!',
                          },
                        ],
                      })(<Input />)}
                    </FormItem>
                    <FormItem {...summaryFormLayout} label="สถานที่รับ">
                      {getFieldDecorator('LocationRecieve', {
                        rules: [
                          {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                          },
                          {
                            required: true,
                            message: 'Please input your E-mail!',
                          },
                        ],
                      })(
                        <Select defaultValue="1">
                          <Option value="1">Option 1</Option>
                          <Option value="2">Option 2</Option>
                          <Option value="3">Option 3</Option>
                        </Select>,
                      )}
                    </FormItem>
                    <FormItem {...summaryFormLayout} label="สถานที่คืน">
                      {getFieldDecorator('LocationRecurring', {
                        rules: [
                          {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                          },
                          {
                            required: true,
                            message: 'Please input your E-mail!',
                          },
                        ],
                      })(
                        <Select defaultValue="1">
                          <Option value="1">Option 1</Option>
                          <Option value="2">Option 2</Option>
                          <Option value="3">Option 3</Option>
                        </Select>,
                      )}
                    </FormItem>
                    <FormItem {...summaryFormLayout} label="coupon">
                      {getFieldDecorator('coupon', {
                        rules: [
                          {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                          },
                          {
                            required: true,
                            message: 'Please input your E-mail!',
                          },
                        ],
                      })(<TextArea />)}
                    </FormItem>
                    <div className="col-md-7">
                      <div className="row">
                        <div className="col-md-6">
                          <Button type="primary" size={'large'}>
                            เพิ่มการจอง
                          </Button>
                        </div>
                        <div className="col-md-6">
                          <Button type="danger" size={'large'}>
                            ยกเลิก
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
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

class OrderDetail extends React.Component {
  state = {
    pager: { ...defaultPagination },
    orderData: {},
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

  render() {
    let xx = this.props
    return (
      <div>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          orderData={this.state.orderData}
          controller={this.props}
          aX
          // productCate={this.props.product.productCate}
          // productItem={this.props.product.productItemData}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orderDetailData: state.orderDetailData,
  }
}
export default connect(
  mapStateToProps,
  actionCreators,
)(OrderDetail)
