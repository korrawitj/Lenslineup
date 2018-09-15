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
          title="Add Holiday Shop"
          width={1000}
          visible={visible}
          okText={holidayShopData.shopID != null ? 'Update' : 'Create'}
          onCancel={onCancel}
          onOk={onSubmitData}
        >
          <div className="card-body">
            <Form layout="vertical">
              <FormItem label="วันที่">
                {getFieldDecorator('holidayShopData.date', {
                  initialValue: moment(holidayShopData.date),
                })(<DatePicker />)}
              </FormItem>
              <FormItem label="message">
                {getFieldDecorator('holidayShopData.message', {
                  initialValue: holidayShopData.message,
                })(<TextArea />)}
              </FormItem>
              <FormItem label="การรับ">
                {getFieldDecorator('holidayShopData.receive', {
                  initialValue: holidayShopData.receive,
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