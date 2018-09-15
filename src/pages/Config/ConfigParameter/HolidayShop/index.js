import React from 'react'
import { Table, Icon, Input, Button, Modal, Radio, DatePicker, Form } from 'antd'
import { connect } from 'react-redux'
import moment from 'moment'
import * as actionCreators from '../../../../store/axios/master'
import HolidayModal from './HolidayModal'
import '../index.css'
const { TextArea } = Input
const RadioGroup = Radio.Group
const FormItem = Form.Item
const defaultPagination = {
  pageSizeOptions: ['10', '50', '100', '250'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: total => `Total ${total} items`,
  total: 0,
}

class HolidayShop extends React.Component {
  state = {
    holidayShopData: { shopID: null, date: null, receive: null, recurring: null, message: null },
    visible: false,
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
  }
  componentDidMount() {
    this.props.getAllDataHolidayShop()
  }
  showModal = () => {
    this.setState({ visible: true })
  }
  onSubmitData = () => {
    const form = this.formRef.props.form
    const holidayShopData = this.formRef.props.holidayShopData
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      values['holidayShopData']['date'] = moment(values['holidayShopData']['date']).format(
        'YYYY-MM-DD',
      )
      if (holidayShopData.shopID != null) {
        holidayShopData.date = values['holidayShopData']['date']
        holidayShopData.message = values['holidayShopData']['message']
        holidayShopData.receive = values['holidayShopData']['receive']
        holidayShopData.recurring = values['holidayShopData']['recurring']
        this.props.updateHolidayShop(holidayShopData)
      } else {
        this.props.addHolidayShop(values)
      }

      form.resetFields()
      this.setState({ visible: false })
    })
  }
  onAdd = () => {
    this.setState({ holidayShopData: {} })
    this.showModal()
  }
  onEdit = record => {
    this.setState({ holidayShopData: record })
    this.showModal()
  }
  onDelete = (record, parent) => {
    Modal.confirm({
      title: 'Are you sure delete this row?',
      content: <div>Delelte Holiday Shop Date= {record.date}</div>,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        parent.deleteHolidayShop(record.shopID)
        console.log('OK')
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }
  onCancle = () => {
    this.setState({ previewVisible: false, visible: false })
  }
  createHolidayShop = () => {}
  saveFormRef = formRef => {
    this.formRef = formRef
  }

  showDeleteConfirmHolidayShop(record) {
    let T = record
    Modal.confirm({
      title: 'Are you sure delete this row?',
      content: <div>Delelte Holiday Shop Date= {record.date}</div>,
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
    const columnsholidayshop = [
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
        render: text => (
          <span>
            <Icon
              style={{ fontSize: '25px' }}
              theme="twoTone"
              twoToneColor={text ? '#52c41a' : '#eb2f96'}
              type={text ? 'check-circle' : 'close-circle'}
            />
          </span>
        ),
        sorter: (a, b) => a.receive - b.receive,
      },
      {
        title: 'การคืน',
        dataIndex: 'recurring',
        key: 'recurring',
        render: text => (
          <span>
            <Icon
              style={{ fontSize: '25px' }}
              theme="twoTone"
              twoToneColor={text ? '#52c41a' : '#eb2f96'}
              type={text ? 'check-circle' : 'close-circle'}
            />
          </span>
        ),
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
              onClick={() => this.onEdit(record)}
              className="palm-btn-warning"
            />
            <Button
              type="danger"
              shape="circle"
              icon="delete"
              onClick={() => this.onDelete(record, this.props)}
            />
          </span>
        ),
      },
    ]

    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>วันหยุดร้าน</strong>
          </div>
        </div>
        <div className="card-body">
          <Table
            columns={columnsholidayshop}
            dataSource={this.props.master.holidayShopData}
            pagination={pager}
            onChange={this.handleTableChange}
          />
          <Button type="primary" icon="plus" onClick={this.onAdd}>
            เพิ่มวันหยุดประจำ
          </Button>
        </div>
        <HolidayModal
          wrappedComponentRef={this.saveFormRef}
          holidayShopData={this.state.holidayShopData}
          visible={this.state.visible}
          onCancel={this.onCancle}
          onSubmitData={this.onSubmitData}
        />
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
)(HolidayShop)
