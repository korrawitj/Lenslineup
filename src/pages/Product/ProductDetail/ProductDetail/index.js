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
const RadioButton = Radio.Button
const { getFieldDecorator } = this.props.form
class ProductList extends React.Component {
  state = {
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
  componentDidMount() {
    // this.props.getAllProduct()
    // this.props.getAllData()
  }

  render() {
    const { TextArea } = Input

    const productItemData = this.state
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
    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>อุปกรณ์ทั้งหมด</strong>
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
            {/* {Form.getFieldValue('productItemData.IsDay') === true ? (
              <FormItem {...formItemLayout} label="ราคาเช่าหนึ่งวัน">
                {getFieldDecorator('productItemData.RentDay_Fee', {
                  initialValue: productItemData.RentDay_Fee,
                })(<Input />)}
              </FormItem>
            ) : (
              ''
            )} */}
            <FormItem {...formItemLayout} label="ราคาเช่าครึ่งวัน">
              {getFieldDecorator('productItemData.IsHaftDay')(<Checkbox />)}
            </FormItem>
            {/* {Form.getFieldValue('productItemData.IsHaftDay') === true ? (
              <FormItem {...formItemLayout} label="ราคาเช่าครึ่งวัน">
                {getFieldDecorator('productItemData.RentHalfDay_Fee')(<Input />)}
              </FormItem>
            ) : (
              ''
            )}
            <FormItem {...formItemLayout} label="ราคาเช่าหนึ่งชั่วโมง">
              {getFieldDecorator('productItemData.IsHour')(<Checkbox />)}
            </FormItem>
            {Form.getFieldValue('productItemData.IsHour') === true ? (
              <FormItem {...formItemLayout} label="ราคาเช่าหนุ่งชั่วโมง">
                {getFieldDecorator('productItemData.RentHour_Fee')(<Input />)}
              </FormItem>
            ) : (
              ''
            )} */}
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
