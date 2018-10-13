import React from 'react'
import * as actionCreators from '../../../../store/axios/productPackage'
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
import './detail.css'

const FormItem = Form.Item

const confirm = Modal.confirm
const { TextArea } = Input
const Option = Select.Option

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { form, productData } = this.props
      const { getFieldDecorator } = form
      const columns = [
        {
          title: 'Name',
          dataIndex: 'productName',
          key: 'productName',
        },
        {
          title: 'Copy',
          dataIndex: 'productCopy',
          key: 'productCopy',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span>
              <Button type="danger" shape="circle" icon="delete" />
            </span>
          ),
        },
      ]

      return (
        <div>
          <div className="row">
            <div className="col-md-7">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="utils__title">
                        <strong>เพิ่มรายการอุปกรณ์จัดชุด</strong>
                      </div>
                    </div>
                    <hr />
                    <div className="card-body" >
                      <Form>
                      <div className="row">
                          <div className="col-md-10">
                            <FormItem label="อุปกรณ์" className="inputcenter">
                              <Select
                                placeholder="เลือกอุปกรณ์"
                                style={{ width: '100%' }}
                                onChange={this.handleChangeSelectProduct}
                              >
                                {productData.map(item => (
                                  <Option
                                    selected
                                    key={item.ProductID}
                                    value={item.ProductID + '/' + item.ProductName}
                                  >
                                    {item.Name}
                                  </Option>
                                ))}
                              </Select>
                            </FormItem>
                          </div>
                          <div className="col-md-2">
                            <FormItem label="เพิ่ม" className="inputcenter">
                              <Button
                                type="primary"
                                style={{ marginBottom: 16 }}
                                // onClick={this.handleAdd}
                              >
                                เพิ่มอุปกรณ์
                              </Button>
                            </FormItem>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
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

class ProductSetDetail extends React.Component {
  state = {
    pager: { ...defaultPagination },
    orderData: {},
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    previewVisible: false,
    previewImage: '',
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
    console.log(this.props.productPackage.productData)
    return (
      <div>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          controller={this.props}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          productData={this.props.productPackage.productData}
        />
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
)(ProductSetDetail)
