import React from 'react'
import { Table, Icon, Input, Button, Modal, Radio ,Form,DatePicker} from 'antd'
import { connect } from 'react-redux'
import * as actionCreators from '../../../../store/axios/master'
const RadioGroup = Radio.Group
const FormItem = Form.Item
const TextArea = Input.TextArea
const RadioButton = Radio.Button
const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props
      const { getFieldDecorator } = form
      return (
        <Modal
          width={1000}
          visible={visible}
          title="เพิ่มจุดรับของ"
          okText="เพิ่ม"
          cancelText="ยกเลิก"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <div className="card-body">
            <Form layout="vertical">
            <FormItem label="ชื่อ">
                {getFieldDecorator('manageRecurringData.name')(<Input />)}
              </FormItem>
              <FormItem label="วันที่เริ่ม">
                {getFieldDecorator('manageRecurringData.startdate')(<DatePicker />)}
              </FormItem>
              <FormItem label="วันที่สิ้นสุด">
                {getFieldDecorator('manageRecurringData.enddate')(<DatePicker />)}
              </FormItem>
              <FormItem label="offset">
                {getFieldDecorator('manageRecurringData.offset')(<Input />)}
              </FormItem>
              <FormItem label="ประเภท">
              {getFieldDecorator('manageRecurringData.manage_type')(
                  <RadioGroup name="Pickuptype">
                    <RadioButton value={true}>รับของ</RadioButton>
                    <RadioButton value={false}>คืนของ</RadioButton>
                  </RadioGroup>,
                )}
              </FormItem>
              <FormItem label="สถานที่">
                {getFieldDecorator('manageRecurringData.pickupID')(<Input />)}
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

class ManageRecurring extends React.Component {
  state = {
    data: {
      manageRecurringData: [
        {
          manageID: 's',
          name: 'ssss',
          startdate: 'ssssssss',
          enddate: 'ssss',
          offset: '55555555555555555',
          manage_type: 'ssssss',
          pickupID: '55555555',
        },
      ],
    },
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    visible:false,
  }
  componentDidMount() {
    this.props.getAllDataManage()
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
      console.log(values)
      form.resetFields()
      this.setState({ visible: false })
    })
  }
  saveFormRef = formRef => {
    this.formRef = formRef
  }

  handleCancel = () => this.setState({ previewVisible: false, visible: false })
  showDeleteConfirmManageRecurring(record) {
    Modal.confirm({
      title: 'Are you sure delete this row?',
      content: <div>Delelte = {record.name}</div>,
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
    const columnManageRecurring = [
      {
        title: 'ชื่อ',
        dataIndex: 'name',
        key: 'name',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.date - b.date,
      },
      {
        title: 'เวลา',
        dataIndex: 'startdate',
        key: 'startdate',
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
        dataIndex: 'manage_type',
        key: 'manage_type',
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
              type="danger"
              shape="circle"
              icon="delete"
              onClick={() => this.showDeleteConfirmManageRecurring(record)}
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
        </div>
        <div className="card-body">
        <Table
            columns={columnManageRecurring}
            dataSource={this.props.master.manageRecurringData}
            pagination={pager}
            onChange={this.handleTableChange}
          />
          <Button type="primary" icon="plus" onClick={this.showModal}>
            เพิ่มรอบรับคืน
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
)(ManageRecurring)
