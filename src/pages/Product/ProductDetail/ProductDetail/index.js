import React from 'react'
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
} from 'antd'
import * as actionCreators from '../../../../store/axios/product'
import { connect } from 'react-redux'
import moment from 'moment'
import { relative } from 'path'
import ProductImage from '../../../../components/ProductComponents/ProductDetail/ProductImage/ProductImage'
import ProductInclude from '../../../../components/ProductComponents/ProductDetail/ProductInclude/ProductInclude'
import ProductCopy from '../../../../components/ProductComponents/ProductDetail/ProductCopy/ProductCopy'
import './detail.css'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const confirm = Modal.confirm
const { TextArea } = Input

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const {
        visible,
        onCancel,
        onCreate,
        form,
        productData,
        productCate,
        productItem,
        productItemByID,
        dataSourceTa,
      } = this.props
      const { getFieldDecorator } = form
      return (
        <div>
          <div className="row">
            <div className="col-md-7">
              <div className="card">
                <div className="card-header">
                  <div className="utils__title">
                    <strong>จัดการอุปกรณ์</strong>
                  </div>
                </div>
                <hr />
                <div className="card-body">
                  <Form>
                    <div className="row">
                      <div className="col-md-3 labelcenter">
                        <label>ชื่ออุปกรณ์ : </label>
                      </div>
                      <div className="col-md-9 inputcenter">
                        <FormItem className="inputcenter">
                          {getFieldDecorator('productData.Name', {
                            initialValue: productData.Name,
                          })(<Input />)}
                        </FormItem>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 labelcenter">
                        <label>ยี่ห้อ : </label>
                      </div>
                      <div className="col-md-9 inputcenter">
                        <FormItem className="inputcenter">
                          {getFieldDecorator('productData.BrandID')(<Select />)}
                        </FormItem>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 labelcenter">
                        <label>ประเภท : </label>
                      </div>
                      <div className="col-md-9 inputcenter">
                        <FormItem className="inputcenter">
                          {getFieldDecorator('productData.CategoryID')(<TreeSelect />)}
                        </FormItem>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 labelcenter">
                        <label>ราคาเช่าหนึ่งวัน : </label>
                      </div>
                      <div className="col-md-1 inputcenter">
                        <FormItem className="inputcenter">
                          {getFieldDecorator('productData.IsDay')(<Checkbox />)}
                        </FormItem>
                      </div>
                      <div className="col-md-8 inputcenter">
                        {form.getFieldValue('productData.IsDay') === true ? (
                          <FormItem className="inputcenter">
                            {getFieldDecorator('productData.RentDay_Fee', {
                              initialValue: productData.RentDay_Fee,
                            })(<InputNumber className="inputnumber" />)}
                          </FormItem>
                        ) : (
                          <FormItem className="inputcenter">
                            {getFieldDecorator('productData.RentDay_Fee', {
                              initialValue: productData.RentDay_Fee,
                            })(<InputNumber className="inputnumber" disabled />)}
                          </FormItem>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 labelcenter">
                        <label>ราคาเช่าครึ่งวัน : </label>
                      </div>
                      <div className="col-md-1 inputcenter">
                        <FormItem className="inputcenter">
                          {getFieldDecorator('productData.IsHaftDay')(<Checkbox />)}
                        </FormItem>
                      </div>
                      <div className="col-md-8 inputcenter">
                        {form.getFieldValue('productData.IsHaftDay') === true ? (
                          <FormItem className="inputcenter">
                            {getFieldDecorator('productData.RentHalfDay_Fee')(
                              <InputNumber className="inputnumber" />,
                            )}
                          </FormItem>
                        ) : (
                          <FormItem className="inputcenter">
                            {getFieldDecorator('productData.RentHalfDay_Fee')(
                              <InputNumber className="inputnumber" disabled />,
                            )}
                          </FormItem>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 labelcenter">
                        <label>ราคาเช่าหนึ่งชั่วโมง : </label>
                      </div>
                      <div className="col-md-1 inputcenter">
                        <FormItem className="inputcenter">
                          {getFieldDecorator('productData.IsHour')(<Checkbox />)}
                        </FormItem>
                      </div>
                      <div className="col-md-8 inputcenter">
                        {form.getFieldValue('productData.IsHour') === true ? (
                          <FormItem className="inputcenter">
                            {getFieldDecorator('productData.RentHour_Fee')(
                              <InputNumber className="inputnumber" />,
                            )}
                          </FormItem>
                        ) : (
                          <FormItem className="inputcenter">
                            {getFieldDecorator('productData.RentHour_Fee')(
                              <InputNumber className="inputnumber" disabled />,
                            )}
                          </FormItem>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 labelcenter">
                        <label>จำนวนวันขั้นต่ำที่ให้เช่า : </label>
                      </div>
                      <div className="col-md-3 inputcenter">
                        <FormItem className="inputcenter">
                          {getFieldDecorator('productData.RentDay')(<InputNumber />)}
                        </FormItem>
                      </div>
                      <div className="col-md-6" />
                    </div>
                    <div className="row">
                      <div className="col-md-3 labelcenter">
                        <label>แบบที่ 1 : </label>
                      </div>
                      <div className="col-md-3 inputcenter">
                        <FormItem className="inputcenter">
                          {getFieldDecorator('productData.DepositType1')(<InputNumber />)}
                        </FormItem>
                      </div>
                      <div className="col-md-6" />
                    </div>
                    <div className="row">
                      <div className="col-md-3 labelcenter">
                        <label>แบบที่ 2 : </label>
                      </div>
                      <div className="col-md-3 inputcenter">
                        <FormItem className="inputcenter">
                          {getFieldDecorator('productData.DepositType2')(<InputNumber />)}
                        </FormItem>
                      </div>
                      <div className="col-md-6" />
                    </div>
                    <div className="row">
                      <div className="col-md-3 labelcenter">
                        <label>ราคาในสัญญา : </label>
                      </div>
                      <div className="col-md-3 inputcenter">
                        <FormItem className="inputcenter">
                          {getFieldDecorator('productData.ContactPrice')(<InputNumber />)}
                        </FormItem>
                      </div>
                      <div className="col-md-6" />
                    </div>
                    <div className="row">
                      <div className="col-md-3 labelcenter">
                        <label>ราคาที่ซื้อ : </label>
                      </div>
                      <div className="col-md-3 inputcenter">
                        <FormItem className="inputcenter">
                          {getFieldDecorator('productData.PurchasePrice')(<InputNumber />)}
                        </FormItem>
                      </div>
                      <div className="col-md-6" />
                    </div>
                    <div className="row">
                      <div className="col-md-3 labelcenter">
                        <label>Serial Number : </label>
                      </div>
                      <div className="col-md-9 inputcenter">
                        <FormItem className="inputcenter">
                          {getFieldDecorator('productData.SerialNumber')(<Input />)}
                        </FormItem>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 labelcenter">
                        <label>วันที่ซื้อ : </label>
                      </div>
                      <div className="col-md-9 inputcenter">
                        <FormItem className="inputcenter">
                          {getFieldDecorator('productData.PurchaseDate', {
                            initialValue:
                              productData.PurchaseDate == null
                                ? null
                                : moment(productData.PurchaseDate),
                          })(<DatePicker />)}
                        </FormItem>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 labelcenter">
                        <label>วันที่หมดประกัน : </label>
                      </div>
                      <div className="col-md-9 inputcenter">
                        <FormItem className="inputcenter">
                          {getFieldDecorator('productData.ExpireDate')(<DatePicker />)}
                        </FormItem>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 labelcenter">
                        <label>สถานที่ซื้อ/ประกัน : </label>
                      </div>
                      <div className="col-md-9 inputcenter">
                        <FormItem className="inputcenter">
                          {getFieldDecorator('productData.Location')(
                            <TextArea autosize={{ minRows: 2, maxRows: 6 }} />,
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-md-3 labelcenter">
                        <label>Remark (สภาพตำหนิ) : </label>
                      </div>
                      <div className="col-md-9 inputcenter">
                        <FormItem className="inputcenter">
                          {getFieldDecorator('productData.Remark')(
                            <TextArea autosize={{ minRows: 2, maxRows: 6 }} />,
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-md-3 labelcenter">
                        <label>Note : </label>
                      </div>
                      <div className="col-md-9 inputcenter">
                        <FormItem className="inputcenter">
                          {getFieldDecorator('productData.Note')(
                            <TextArea autosize={{ minRows: 2, maxRows: 6 }} />,
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-md-3 labelcenter">
                        <label>สถานะหน้าเว็บ : </label>
                      </div>
                      <div className="col-md-9 inputcenter">
                        <FormItem className="inputcenter">
                          {getFieldDecorator('productData.isShow')(
                            <Radio.Group>
                              <RadioButton value={true}>แสดง</RadioButton>
                              <RadioButton value={false}>ไม่แสดง</RadioButton>
                            </Radio.Group>,
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 labelcenter">
                        <label>สถานะอุปกรณ์ : </label>
                      </div>
                      <div className="col-md-9 inputcenter">
                        <FormItem className="inputcenter">
                          {getFieldDecorator('productData.Status')(
                            <Radio.Group>
                              <RadioButton value={true}>พร้อมให้เช่า</RadioButton>
                              <RadioButton value={false}>ยังไม่พร้อมให้เช่า</RadioButton>
                            </Radio.Group>,
                          )}
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
                  <ProductImage />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <ProductInclude TTT={productItem} getId={productItemByID} ssss={dataSourceTa} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <div className="utils__title">
                    <strong>อุปกรณ์ (Copy)</strong>
                  </div>
                </div>
                <hr />
                <div className="card-body" />
                <ProductCopy />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body" />
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

class ProductDetail extends React.Component {
  state = {
    pager: { ...defaultPagination },
    productData: {},
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

  componentDidMount() {
    this.props.getAllProduct()
    this.props.getAllData()
    this.props.getAllProductItem()
  }

  render() {
    console.log(this.props.product.productItemData)
    return (
      <div>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          productData={this.props.product.productData}
          productCate={this.props.product.productCate}
          productItem={this.props.product.productItemDataAll}
          dataSourceTa={this.props.product.productItemData}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          productItemByID={this.props.getProductItem}
        />
        {/* 
        <FormItem {...formItemLayout} label="QR Code">
          {getFieldDecorator('productItemData.QRID')(
            <TextArea autosize={{ minRows: 2, maxRows: 6 }} />,
          )}
        </FormItem> */}
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
