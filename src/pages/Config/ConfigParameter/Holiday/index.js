import React from 'react'
import { Table, Icon, Input, Button, Modal, Radio, DatePicker, Form } from 'antd'
import { connect } from 'react-redux'
import * as actionCreators from '../../../../store/axios/master'
import { isMoment } from '../../../../../node_modules/moment/moment'
const FormItem = Form.Item
const { TextArea } = Input
const RadioGroup = Radio.Group
const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props
      const { getFieldDecorator } = form
      return (
        <Modal
          width={1000}
          visible={visible}
          title="Add Holiday Date"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <div className="card-body">
            <Form layout="vertical">
              <FormItem label="วันที่">
                {getFieldDecorator('holidayData.date')(<DatePicker />)}
              </FormItem>
              <FormItem label="message">
                {getFieldDecorator('holidayData.message')(<TextArea />)}
              </FormItem>
              <FormItem label="การรับ">
                {getFieldDecorator('holidayData.receive')(
                  <RadioGroup name="radiogroup">
                    <Radio value={1}>Yes</Radio>
                    <Radio value={0}>No</Radio>
                  </RadioGroup>,
                )}
              </FormItem>
              <FormItem label="การคืน">
                {getFieldDecorator('holidayData.recurring')(
                  <RadioGroup name="radiogroup1">
                    <Radio value={1}>Yes</Radio>
                    <Radio value={0}>No</Radio>
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
const defaultPagination = {
  pageSizeOptions: ['10', '50', '100', '250'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: total => `Total ${total} items`,
  total: 0,
}

class Holiday extends React.Component {
  state = {
    data: {
      holidayData: [{ date: '2018-05-22', receive: '0', recurring: '1', message: 'sdfsdf' }],
    },
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    visible: false,
  }
  showModal = () => {
    this.setState({ visible: true })
  }
  handleCreate = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      console.log('Received values of form: ', values)
      form.resetFields()
      this.setState({ visible: false })
    })
  }
  saveFormRef = formRef => {
    this.formRef = formRef
  }

  handleCancel = () => this.setState({ previewVisible: false, visible: false })
  componentDidMount() {
    this.props.getAllDataHoliday()
  }
  // addDataHoliday() {
  //   let data = this.state.data
  //   let props = this.props
  //   Modal.confirm({
  //     title: 'Add Holiday',
  //     width: 1000,
  //     content: (
  //       <div className="row">
  //         <div className="col-lg-12">
  //           <div className="form-group">
  //             <label htmlFor="product-edit-title">วันที่</label>
  //             <DatePicker />
  //           </div>
  //           <div className="form-group">
  //             <label htmlFor="product-edit-category">ข้อความ</label>
  //             <TextArea
  //               autosize={{ minRows: 2, maxRows: 6 }}
  //               onChange={e => this.handleChange(e)}
  //               name="message"
  //             />
  //           </div>
  //           <div className="form-group">
  //             <label htmlFor="product-edit-price">การรับ</label>
  //             <div>
  //               <RadioGroup name="radiogroup">
  //                 <Radio value={true}>Yes</Radio>
  //                 <Radio value={false}>No</Radio>
  //               </RadioGroup>
  //             </div>
  //           </div>
  //           <div className="form-group">
  //             <label htmlFor="product-edit-price">การคืน</label>
  //             <div>
  //               <RadioGroup name="radiogroup">
  //                 <Radio value={true}>Yes</Radio>
  //                 <Radio value={false}>No</Radio>
  //               </RadioGroup>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     ),
  //     okText: 'Yes',
  //     okType: 'danger',
  //     cancelText: 'No',
  //     onOk() {
  //       props.AddDataHoliday(data)
  //       console.log(data)
  //       console.log('OK')
  //     },
  //     onCancel() {
  //       console.log('Cancel')
  //     },
  //   })
  // }
  onInputChange = e => {
    this.setState({ searchText: e.target.value })
  }
  showDeleteConfirmHoliday(record) {
    let T = record
    Modal.confirm({
      title: 'Are you sure delete this row?',
      content: <div>Delelte Holiday Date = {record.date}</div>,
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
    let { pager } = this.state

    const columnsholiday = [
      {
        title: 'วันหยุดร้าน',
        dataIndex: 'date',
        key: 'date',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.date - b.date,
      },
      {
        title: 'การรับ',
        dataIndex: 'receive',
        key: 'receive',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.receive - b.receive,
      },
      {
        title: 'การคืน',
        dataIndex: 'recurring',
        key: 'recurring',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.receive - b.receive,
      },
      {
        title: 'ข้อความ',
        dataIndex: 'message',
        key: 'message',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.message - b.message,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button
              type="danger"
              shape="circle"
              icon="delete"
              onClick={() => this.showDeleteConfirmHoliday(record)}
            />
          </span>
        ),
      },
    ]

    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>วันหยุด</strong>
          </div>
        </div>
        <div className="card-body">
          <Table
            columns={columnsholiday}
            dataSource={this.props.master.holidayData}
            pagination={pager}
            onChange={this.handleTableChange}
          />
          <Button type="primary" onClick={this.showModal}>
            เพิ่มวันหยุด
          </Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
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
    master: state.master,
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(Holiday)
