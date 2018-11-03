import React from 'react'
import { Table, Icon, Input, Button, Modal, Radio } from 'antd'
import { connect } from 'react-redux'
import moment from 'moment'
import * as actionCreators from '../../../../store/axios/master'
import ManageRecurringModal from './ManageRecurringModal'

const defaultPagination = {
  pageSizeOptions: ['10', '50', '100', '250'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: total => `Total ${total} items`,
  total: 0,
}

class ManageRecurring extends React.Component {
  state = {
    manageRecurringData: {
      manageID: null,
      name: null,
      startTime: null,
      endTime: null,
      offset: null,
      manage_type: null,
      pickupID: null,
    },
    masterType: [],
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    visible: false,
  }

  showModal = () => {
    this.setState({ visible: true })
  }

  async componentDidMount() {
    await this.props.getAllDataManage()
    this.props.getAllMasterType()
  }

  saveFormRef = formRef => {
    this.formRef = formRef
  }

  onAdd = () => {
    this.setState({ manageRecurringData: {}, masterType: this.props.master.masterTypeData })
    this.showModal()
  }

  onEdit(record) {
    this.setState({ manageRecurringData: record })
    this.showModal()
  }

  onCancle = () => {
    const form = this.formRef.props.form
    form.resetFields()
    this.setState({ previewVisible: false, visible: false })
  }

  onSubmitData = () => {
    const form = this.formRef.props.form
    const manageRecurringData = this.formRef.props.manageRecurringData

    form.validateFields(async (err, values) => {
      if (err) {
        return
      }
      manageRecurringData.startTime = moment(values['manageRecurringData']['startTime']).format(
        'hh:mm:ss',
      )
      manageRecurringData.endTime = moment(values['manageRecurringData']['endTime']).format(
        'hh:mm:ss',
      )
      manageRecurringData.offset = values['manageRecurringData']['offset']
      manageRecurringData.name = values['manageRecurringData']['name']
      manageRecurringData.manageTypeId = values['manageRecurringData']['manageTypeId']

      if (manageRecurringData.manageID != null) {
        await this.props.updateMasterManageRecurring(manageRecurringData)
      } else {
        await this.props.addMasterManageRecurring(manageRecurringData)
      }
      await this.props.getAllDataManage()

      form.resetFields()
      this.setState({ visible: false })
    })
  }

  async showDeleteConfirmManageRecurring(record, parent) {
    Modal.confirm({
      title: 'คุณแน่ใจหรือไม่ที่จะลบ จัดการรอบรับคืน?',
      content: <div>ชื่อ = {record.name}</div>,
      okText: 'ตกลง',
      okType: 'danger',
      cancelText: 'ยกเลิก',
      centered: true,
      iconType: 'close-circle',
      async onOk() {
        await parent.deleteMasterManageRecurring(record.manageID)
        await parent.getAllDataManage()
        //debugger
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
    const columnManageRecurring = [
      {
        title: 'ชื่อ',
        dataIndex: 'name',
        key: 'name',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.date - b.date,
      },
      {
        title: 'เวลาเริ่ม',
        dataIndex: 'startTime',
        key: 'startTime',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.receive - b.receive,
      },
      {
        title: 'เวลาสิ้นสุด',
        dataIndex: 'endTime',
        key: 'endTime',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.receive - b.receive,
      },
      {
        title: 'off-set',
        dataIndex: 'offset',
        key: 'offset',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.receive - b.receive,
      },
      {
        title: 'ประเภท',
        dataIndex: 'manageName',
        key: 'manageName',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.receive - b.receive,
      },
      {
        title: 'สถานที่',
        dataIndex: 'pickupID',
        key: 'pickupID',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.receive - b.receive,
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
              onClick={() => this.showDeleteConfirmManageRecurring(record, this.props)}
            />
          </span>
        ),
      },
    ]

    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>จัดการรอบรับคืน</strong>
          </div>
          <Button type="primary" onClick={this.onAdd} style={{ float: 'right' }}>
            เพิ่มรอบรับคืน
          </Button>
        </div>
        <div className="card-body">
          <Table
            columns={columnManageRecurring}
            dataSource={this.props.master.manageRecurringData}
            pagination={pager}
            onChange={this.handleTableChange}
          />
        </div>
        <ManageRecurringModal
          wrappedComponentRef={this.saveFormRef}
          manageRecurringData={this.state.manageRecurringData}
          visible={this.state.visible}
          onCancel={this.onCancle}
          onSubmitData={this.onSubmitData}
          masterType={this.props.master.masterTypeData}
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
)(ManageRecurring)
