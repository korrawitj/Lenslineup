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

class PickUp extends React.Component {
  state = {
    data: {
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
    this.props.getAllDataPickup()
  }
  addDataPickup() {
    let data = this.state.data
    Modal.confirm({
      title: 'Add Pickup',
      width: 1000,
      content: (
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <label htmlFor="product-edit-title">Name</label>
              <Input type="text" onChange={e => (data.masterPickupData[0].name = e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="product-edit-price">ปรเภท</label>
              <Input
                type="text"
                onChange={e => (data.masterPickupData[0].pickuptype = e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="product-edit-price">ค่าส่ง</label>
              <Input
                type="text"
                onChange={e => (data.masterPickupData[0].delivery_charge = e.target.value)}
              />
            </div>
          </div>
        </div>
      ),
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log(data)
        console.log('sssssssssss')
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

    return (
      <div className="card">
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
)(PickUp)
