import React from 'react'
import { Table, Icon, Input, Button, Modal, Radio } from 'antd'
import { connect } from 'react-redux'
import * as actionCreators from '../../../../store/axios/master'

const RadioGroup = Radio.Group
const defaultPagination = {
  pageSizeOptions: ['10', '50', '100', '250'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: total => `Total ${total} items`,
  total: 0,
}

class ConfigParameter extends React.Component {
  state = {
    data: {
      holidayData: [{ date: '1', receive: 'true', recurring: 'true', message: 'sdfsdf' }],
      holidayShopData: [
        { date: '55', receive: 'false', recurring: 'false', message: '55555555555555555' },
      ],
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
      masterPickupData: [
        {
          pickupID: '',
          name: '',
          pickuptype: '',
          delivery_charge: '',
        },
      ],
    },
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
  }
  componentDidMount() {
    this.props.getAllDataHoliday()
    this.props.getAllDataHolidayShop()
    this.props.getAllDataManage()
    this.props.getAllDataPickup()
  }

  addDataHoliday(record) {
    let T = record
    Modal.confirm({
      title: 'Add Holiday Include',
      width: 1000,
      content: (
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <label htmlFor="product-edit-title">วันที่</label>
              <Input id="product-edit-title" placeholder="" />
            </div>
            <div className="form-group">
              <label htmlFor="product-edit-category">ข้อความ</label>
              <Input id="product-edit-category" placeholder="" />
            </div>
            <div className="form-group">
              <label htmlFor="product-edit-price">จำนวน</label>
              <Input id="product-edit-price" placeholder="" />
            </div>
            <div className="form-group">
              <label htmlFor="product-edit-price">การรับ</label>
              <div>
                <RadioGroup name="radiogroup">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </RadioGroup>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="product-edit-price">การคืน</label>
              <div>
                <RadioGroup name="radiogroup">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
      ),
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
  addDataHolidayShop(record) {
    let T = record
    Modal.confirm({
      title: 'Add Holiday Shop',
      width: 1000,
      content: (
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <label htmlFor="product-edit-title">วันที่</label>
              <Input id="product-edit-title" placeholder="" />
            </div>
            <div className="form-group">
              <label htmlFor="product-edit-category">ข้อความ</label>
              <Input id="product-edit-category" placeholder="" />
            </div>
            <div className="form-group">
              <label htmlFor="product-edit-price">จำนวน</label>
              <Input id="product-edit-price" placeholder="" />
            </div>
            <div className="form-group">
              <label htmlFor="product-edit-price">การรับ</label>
              <div>
                <RadioGroup name="radiogroup">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </RadioGroup>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="product-edit-price">การคืน</label>
              <div>
                <RadioGroup name="radiogroup">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
      ),
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
  addDataManageRecurring(record) {
    let T = record
    Modal.confirm({
      title: 'Add Manage Recurring',
      width: 1000,
      content: (
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <label htmlFor="product-edit-title">Name</label>
              <Input id="product-edit-title" placeholder="" />
            </div>
            <div className="form-group">
              <label htmlFor="product-edit-category">เวลาเริ่ม</label>
              <Input id="product-edit-category" placeholder="" />
            </div>
            <div className="form-group">
              <label htmlFor="product-edit-category">เวลาสิ้นสุด</label>
              <Input id="product-edit-category" placeholder="" />
            </div>
            <div className="form-group">
              <label htmlFor="product-edit-price">Offset</label>
              <Input id="product-edit-price" placeholder="" />
            </div>
            <div className="form-group">
              <label htmlFor="product-edit-price">ปรเภท</label>
              <Input id="product-edit-price" placeholder="" />
            </div>
          </div>
        </div>
      ),
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
  addDataPickup(record) {
    let T = record
    let masterPickupData = this.state.data.masterPickupData
    Modal.confirm({
      title: 'Add Pickup',
      width: 1000,
      content: (
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <label htmlFor="product-edit-title">Name</label>
              <Input type="text" value={masterPickupData.name} />
            </div>
            <div className="form-group">
              <label htmlFor="product-edit-price" value={masterPickupData.pickuptype}>
                ปรเภท
              </label>
              <Input type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="product-edit-price">ค่าส่ง</label>
              <Input type="text" value={masterPickupData.delivery_charge} />
            </div>
          </div>
        </div>
      ),
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log(masterPickupData)
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }
  showDeleteConfirmManageRecurring(record) {
    let T = record
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
  showDeleteConfirmMasterPickup(record) {
    let T = record
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
              onClick={() => this.showDeleteConfirmHolidayShop(record)}
            />
          </span>
        ),
      },
    ]
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
        dataIndex: 'delivery_charge',
        key: 'delivery_charge',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.delivery_charge - b.delivery_charge,
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
              onClick={() => this.showDeleteConfirmMasterPickup(record)}
            />
          </span>
        ),
      },
    ]
    // let { holidayData } = this.state.data
    // let { holidayShopData } = this.state.data
    // let { manageRecurringData } = this.state.data
    // let { masterPickupData } = this.state.data
    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>วันหยุดร้าน</strong>
          </div>
        </div>
        <div className="card-body">
          <Table
            columns={columnsholiday}
            dataSource={this.props.master.holidayData}
            pagination={pager}
            onChange={this.handleTableChange}
          />
          <Button type="primary" icon="plus" onClick={() => this.addDataHoliday()}>
            เพิ่มวันหยุด
          </Button>
        </div>
        <div className="card-header">
          <div className="utils__title">
            <strong>วันหยุดประจำ</strong>
          </div>
        </div>
        <div className="card-body">
          <Table
            columns={columnsholidayshop}
            dataSource={this.props.master.holidayShopData}
            pagination={pager}
            onChange={this.handleTableChange}
          />
          <Button type="primary" icon="plus" onClick={() => this.addDataHolidayShop()}>
            เพิ่มวันหยุดประจำ
          </Button>
        </div>
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
          <Button type="primary" icon="plus" onClick={() => this.addDataManageRecurring()}>
            เพิ่มรอบรับคืน
          </Button>
        </div>
        <div className="card-header">
          <div className="utils__title">
            <strong>จุดรับของ</strong>
          </div>
        </div>
        <div className="card-body">
          <Table
            columns={columnsMasterPickup}
            dataSource={this.props.master.masterPickupData}
            pagination={pager}
            onChange={this.handleTableChange}
          />
          <Button type="primary" icon="plus" onClick={() => this.addDataPickup()}>
            เพิ่มจุดรับของ
          </Button>
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
)(ConfigParameter)

// export default ConfigParameter
