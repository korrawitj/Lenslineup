import React from 'react'
import { Input, Modal, Form ,TimePicker,InputNumber } from 'antd'
import moment from 'moment'
const FormItem = Form.Item

const ManageRecurringModal = Form.create()(
  class extends React.Component {   
    render() {
      const { visible, onCancel, onSubmitData, form,manageRecurringData } = this.props
      const { getFieldDecorator } = form
      return (
        <Modal
          title="เพิ่มรอบรับคืน"
          width={1000}
          visible={visible}
          okText={manageRecurringData.manageID != null ? 'Update' : 'Create'}
          onCancel={onCancel}
          onOk={onSubmitData}
        >
          <div className="card-body">
            <Form layout="vertical">
              <FormItem label="Name">
                {getFieldDecorator('manageRecurringData.name', {
                  initialValue:manageRecurringData.name,
                })(<Input placeholder="Name" />)}
              </FormItem>
              <FormItem label="เวลาเริ่ม">
                {getFieldDecorator('manageRecurringData.startTime', {
                   initialValue: moment(manageRecurringData.startdate),
                })(<TimePicker />)}
              </FormItem>
              <FormItem label="เวลาสิ้นสุด">
                {getFieldDecorator('manageRecurringData.endTime', {
                   initialValue: moment(manageRecurringData.endDate),
                })(<TimePicker />)}
              </FormItem>
              <FormItem label="offset">
                {getFieldDecorator('manageRecurringData.offset', {
                   initialValue:  moment(manageRecurringData.offset),
                })(<InputNumber min={1} max={10} defaultValue={3} />)}
              </FormItem>
             
            </Form>
          </div>
        </Modal>
      )
    }
  },
)

export default ManageRecurringModal
