import React from 'react'
import { Input, Modal, Form, TimePicker, InputNumber, Col } from 'antd'
import moment from 'moment'
const FormItem = Form.Item

const ManageRecurringModal = Form.create()(
  class extends React.Component {
    componentDidMount() {}
    render() {
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
      const { visible, onCancel, onSubmitData, form, manageRecurringData } = this.props
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
                  initialValue: manageRecurringData.name,
                })(<Input placeholder="Name" />)}
              </FormItem>
              <FormItem {...formItemLayout} layout="inline">
                <FormItem {...formItemLayout} label="เวลาเริ่ม">
                  {getFieldDecorator('manageRecurringData.startTime', {
                    initialValue:
                      manageRecurringData.startTime != null
                        ? moment(manageRecurringData.startTime, 'HH:mm:ss')
                        : moment('00:00:00', 'HH:mm:ss'),
                  })(<TimePicker />)}
                </FormItem>

                <FormItem {...formItemLayout} label="เวลาสิ้นสุด">
                  {getFieldDecorator('manageRecurringData.endTime', {
                    initialValue: manageRecurringData.endTime
                      ? moment(manageRecurringData.endTime, 'HH:mm:ss')
                      : moment('00:00:00', 'HH:mm:ss'),
                  })(<TimePicker />)}
                </FormItem>

                <FormItem {...formItemLayout} label="offset">
                  {getFieldDecorator('manageRecurringData.offset', {
                    initialValue: manageRecurringData.offset,
                  })(<InputNumber min={1} max={10} defaultValue={0} />)}
                </FormItem>
              </FormItem>
              <FormItem {...formItemLayout} label="ประเภท">
                {getFieldDecorator('manageRecurringData.offset', {
                  initialValue: manageRecurringData.offset,
                })(<InputNumber min={1} max={10} defaultValue={0} />)}
              </FormItem>
            </Form>
          </div>
        </Modal>
      )
    }
  },
)

export default ManageRecurringModal
