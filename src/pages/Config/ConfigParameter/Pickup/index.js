import React from 'react'
import { Table, Icon, Input, Button, Modal, Radio, Form, DatePicker, Checkbox } from 'antd'
import { connect } from 'react-redux'
import * as actionCreators from '../../../../store/axios/master'
const FormItem = Form.Item
const TextArea = Input.TextArea
const RadioButton = Radio.Button
const CheckboxGroup = Checkbox.Group
const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, masterPickupData } = this.props
      const { getFieldDecorator } = form
      const options = [{ label: 'รับของ', value: 'รับของ' }, { label: 'คืนของ', value: 'คืนของ' }]

      return (
        <Modal
          width={1000}
          visible={visible}
          title="เพิ่มจุดรับของ"
          okText={masterPickupData.pickupID != null ? 'Update' : 'Create'}
          cancelText="ยกเลิก"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <div className="card-body">
            <Form layout="vertical">
              <FormItem label="ชื่อ">
                {getFieldDecorator('masterPickupData.name', {
                  initialValue: masterPickupData.name,
                  rules: [{ required: true, message: 'กรุณากรอก ชื่อ !' }]
                })(<Input />)}
              </FormItem>
              <FormItem label="ประเภท">
                {getFieldDecorator('masterPickupData.pickuptype', {
                  initialValue: masterPickupData.pickuptype,
                  rules: [{ required: true, message: 'กรุณาเลือก ประเภท !' }]
                })(<CheckboxGroup options={options} />)}
              </FormItem>
              <FormItem label="ค่าส่ง">
                {getFieldDecorator('masterPickupData.deliveryCharge', {
                  initialValue:
                    masterPickupData.deliveryCharge == null ? 0 : masterPickupData.deliveryCharge,
                    rules: [{ required: true, message: 'กรุณากรอก ค่าส่ง !' }]
                })(<Input />)}
              </FormItem>
            </Form>
          </div>
        </Modal>
      )
    }
  },
)
const RadioGroup = Radio.Group
const defaultPagination = {
  pageSizeOptions: ['10', '50', '100', '250'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: total => `Total ${total} items`,
  total: 0,
}

class PickUp extends React.Component {
  state = {
    masterPickupData: [
      {
        pickupID: '',
        name: '',
        pickuptype: '',
        deliveryCharge: '',
      },
    ],
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    visible: false,
  }
  componentDidMount() {
    this.props.getAllDataPickup()
  }
  showModal = () => {
    this.setState({ visible: true })
  }
  onEdit(record) {
    this.setState({ masterPickupData: record })
    this.showModal()
  }
  handleCreate = () => {
    const form = this.formRef.props.form
    const masterPickupData = this.formRef.props.masterPickupData
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      if (masterPickupData.pickupID != null) {
        values.masterPickupData['key'] = masterPickupData['key']
        values.masterPickupData['pickupID'] = masterPickupData['pickupID']
        this.props.updateDataPickup(values.masterPickupData)
      } else {
        values.masterPickupData['pickuptype'] = values.masterPickupData['pickuptype'].join(',')
        this.props.AddDataPickup(values.masterPickupData)
      }
      form.resetFields()
      this.setState({ visible: false })
    })
  }
  saveFormRef = formRef => {
    this.formRef = formRef
  }

  handleCancel = () => { 
    const form = this.formRef.props.form;
    form.resetFields();
    this.setState({ previewVisible: false, visible: false })
  };
  showDeleteConfirmMasterPickup(record, parent) {
    let T = record
    Modal.confirm({
      title: 'Are you sure delete this row?',
      content: <div>Delelte = {record.name}</div>,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        parent.deleteDataPickup(record.pickupID)
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

    const columnsMasterPickup = [
      {
        title: 'ชื่อ',
        dataIndex: 'name',
        key: 'name',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.name - b.name,
      },
      {
        title: 'ประเภท',
        dataIndex: 'pickuptype',
        key: 'pickuptype',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.pickuptype - b.pickuptype,
      },
      {
        title: 'ค่าส่ง',
        dataIndex: 'deliveryCharge',
        key: 'deliveryCharge',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.deliveryCharge - b.deliveryCharge,
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
              onClick={() => this.showDeleteConfirmMasterPickup(record, this.props)}
            />
          </span>
        ),
      },
    ]

    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>จุดรับของ</strong>
          </div>
          <Button type="primary" onClick={this.showModal} style={{float:'right'}}>
            เพิ่มจุดรับของ
          </Button>
        </div>
        <div className="card-body">
          <Table
            columns={columnsMasterPickup}
            dataSource={this.props.master.masterPickupData}
            pagination={pager}
            onChange={this.handleTableChange}
          />

          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            masterPickupData={this.state.masterPickupData}
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
)(PickUp)
