import React from 'react'
import { Input, Modal, Radio, DatePicker, Form } from 'antd'
import moment from 'moment'
const { TextArea } = Input
const RadioGroup = Radio.Group
const FormItem = Form.Item

const HolidayModal = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onSubmitData, form, holidayShopData } = this.props
      const { getFieldDecorator } = form
      return (
        <Modal
          title={holidayShopData.shopID != null ? 'แก้ไขวันหยุดร้าน' : 'เพิ่มวันหยุดร้าน'}
          width={1000}
          visible={visible}
          okText={holidayShopData.shopID != null ? 'แก้ไข' : 'สร้าง'}
          onCancel={onCancel}
          cancelText={'ยกเลิก'}
          onOk={onSubmitData}
        >
          <div className="card-body">
            <Form layout="vertical">
              <FormItem label="วันที่">
                {getFieldDecorator('holidayShopData.date', {
                  initialValue: moment(holidayShopData.date),
                  rules: [{ type: 'object', required: true, message: 'กรุณาเลือก วันที่ !' }],
                })(<DatePicker />)}
              </FormItem>
              <FormItem label="ข้อความ">
                {getFieldDecorator('holidayShopData.message', {
                  initialValue: holidayShopData.message,
                  rules: [{ required: true, message: 'กรุณากรอก ข้อความ !' }],
                })(<TextArea />)}
              </FormItem>
              <FormItem label="การรับ">
                {getFieldDecorator('holidayShopData.receive', {
                  initialValue: holidayShopData.receive,
                  rules: [{ required: true, message: 'กรุณาเลือก การรับ !' }],
                })(
                  <RadioGroup name="radiogroup">
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </RadioGroup>,
                )}
              </FormItem>
              <FormItem label="การคืน">
                {getFieldDecorator('holidayShopData.recurring', {
                  initialValue: holidayShopData.recurring,
                  rules: [{ required: true, message: 'กรุณาเลือก การคืน !' }],
                })(
                  <RadioGroup name="radiogroup1">
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </RadioGroup>,
                )}
              </FormItem>
            </Form>
          </div>
        </Modal>
      )
    }
  },
)

export default HolidayModal
