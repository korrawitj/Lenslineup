import React from 'react'
import { Table, Icon, Input, Button, Modal, Radio, DatePicker, Form } from 'antd'
import { connect } from 'react-redux'
import * as actionCreators from '../../../../store/axios/master'
import moment from 'moment'
const FormItem = Form.Item
const { TextArea } = Input
const RadioGroup = Radio.Group
const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, holiDaydata } = this.props
      const { getFieldDecorator } = form
      return (
        <Modal
          width={1000}
          visible={visible}
          title="Add Holiday Date" 
          okText= {holiDaydata.holidayID != null ? "Update" : "Create"}
          onCancel={onCancel}
          onOk={onCreate}
        >
          <div className="card-body">
            <Form layout="vertical">
              <FormItem label="วันที่">
                {getFieldDecorator('holidayData.date',{initialValue: moment(holiDaydata.date)})(<DatePicker val/>)}
              </FormItem>
              <FormItem label="message">
                {getFieldDecorator('holidayData.message',{initialValue:holiDaydata.message})(<TextArea />)}
              </FormItem>
              <FormItem label="การรับ">
                {getFieldDecorator('holidayData.receive',{initialValue:holiDaydata.receive})(
                  <RadioGroup name="radiogroup">
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </RadioGroup>,
                )}
              </FormItem>
              <FormItem label="การคืน">
                {getFieldDecorator('holidayData.recurring',{initialValue:holiDaydata.recurring})(
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
    holidayData : {},//{ date: '55', receive:true, recurring:false, message: '55555555555555555' },
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    visible: false,
  }
  componentDidMount() {
    this.props.getAllDataHoliday()
  }
   
  showModal = () => {
    this.setState({ visible: true })
  }
  handleCreate = () => {
    const form = this.formRef.props.form
    const holiDaydata = this.formRef.props.holiDaydata
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      values['holidayData']['date'] = moment(values['holidayData']['date']).format('YYYY-MM-DD')
      console.log('Received values of form: ', values)
      if(holiDaydata.holidayID != null){
          holiDaydata.date = values['holidayData']['date']
          holiDaydata.message = values['holidayData']['message']
          holiDaydata.receive = values['holidayData']['receive']
          holiDaydata.recurring = values['holidayData']['recurring']
          this.props.updateHolidayData(holiDaydata)
      }else{
        this.props.AddDataHoliday(values)
      }
      
      form.resetFields()
      this.setState({ visible: false })
    })
  }
  saveFormRef = formRef => {
    this.formRef = formRef
  }

  handleCancel = () => {
    this.setState({ previewVisible: false, visible: false })
  }
 
  onInputChange = e => {
    this.setState({ searchText: e.target.value })
  }
  onCreateHoliday= () => {
    this.setState({ holidayData:{} })
    this.showModal()
  }
  onEditHoliday = (record) => {
    this.setState({holidayData:record})
    this.showModal()
  }
  showDeleteConfirmHoliday(record,parent) {
    Modal.confirm({
      title: 'Are you sure delete this row?',
      content: <div>Delelte Holiday Date = {record.date}</div>,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        //parent();
        parent.deleteHolidayData(record.holidayID)
        console.log('OK')
        parent.getAllDataHoliday();
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
        render: text => <span><Icon style={{ fontSize: '25px' }}  theme="twoTone" twoToneColor={text ? "#52c41a" : "#eb2f96"}  type={text ? "check-circle" : "close-circle"} /></span>,
        sorter: (a, b) => a.receive - b.receive,
      },
      {
        title: 'การคืน',
        dataIndex: 'recurring',
        key: 'recurring',
        render: text => <span><Icon style={{ fontSize: '25px' }} theme="twoTone" twoToneColor={text ? "#52c41a" : "#eb2f96"}  type={text ? "check-circle" : "close-circle"} /></span>,
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
              shape="circle"
              icon="edit"
              onClick={() => this.onEditHoliday(record)}
              style={{ backgroundColor: '#c49f47' }}
            />
            <Button
              type="danger"
              shape="circle"
              icon="delete"
              onClick={() => this.showDeleteConfirmHoliday(record,this.props)}
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
          <Button type="primary" onClick={this.onCreateHoliday}>
            เพิ่มวันหยุด
          </Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            holiDaydata = {this.state.holidayData}
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
