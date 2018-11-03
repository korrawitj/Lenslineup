import React from 'react'
import { Table, Icon, Input, Button, Modal, Radio, DatePicker, Form } from 'antd'
import { connect } from 'react-redux'
import moment from 'moment'
import * as actionCreators from '../../../../store/axios/master'
import HolidayModal from './HolidayModal'
const { TextArea } = Input
const RadioGroup = Radio.Group
const FormItem = Form.Item
const defaultPagination = {
  pageSizeOptions: ['10', '50', '100', '250'],
  pageSize:15,
  showSizeChanger: false,
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
    form.validateFields(async (err, values) => {
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
        await this.props.updateHolidayShop(holidayShopData)
      } else {
        await this.props.addHolidayShop(values)
      }

      form.resetFields()
      this.props.getAllDataHolidayShop()
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
      title: 'คุณแน่ใจหรือไม่ที่จะลบ วันหยุดร้าน?',
      content: <div>วันหยุดร้าน = {record.date}</div>,
      okText: 'ตกลง',
      okType: 'danger',
      cancelText: 'ยกเลิก',
      centered: true,
      iconType: 'close-circle',
      async onOk() {
        await parent.deleteHolidayShop(record.shopID)
        parent.getAllDataHolidayShop()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }
  onCancle = () => {
    const form = this.formRef.props.form
    form.resetFields()
    this.setState({ previewVisible: false, visible: false })
  }
  saveFormRef = formRef => {
    this.formRef = formRef
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
        title: 'ทุกๆวัน',
        dataIndex: 'date',
        key: 'date',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.date - b.date,
      },
      {
        title: 'รับ',
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
        title: 'คืน',
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
        title: 'รายละเอียด',
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
            <strong>วันหยุดประจำร้าน</strong>
          </div>
          <Button type="primary" onClick={this.onAdd} style={{ float: 'right' }}>
            เพิ่ม
          </Button>
        </div>
        <div className="card-body">
          <Table
            columns={columnsholidayshop}
            dataSource={this.props.master.holidayShopData}
            pagination={pager}
            onChange={this.handleTableChange}
          />
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
