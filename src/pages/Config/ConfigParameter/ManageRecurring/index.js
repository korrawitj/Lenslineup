import React from 'react'
import { Table, Icon, Input, Button, Modal, Radio } from 'antd'
import { connect } from 'react-redux'
import * as actionCreators from '../../../../store/axios/master'
const { TextArea } = Input
const RadioGroup = Radio.Group
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
  }
  componentDidMount() {
    this.props.getAllDataManage()
  }
  addDataManageRecurring() {
    Modal.confirm({
      title: 'เพิ่มรอบรับคืน',
      width: 1000,
      content: (
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <label htmlFor="product-edit-title">วันที่</label>
              <Input id="product-edit-title" placeholder="" />
            </div>
            <div className="form-group">
              <label htmlFor="product-edit-category">เวลาที่เริ่ม</label>
              <Input id="product-edit-title" placeholder="" />
            </div>
            <div className="form-group">
              <label htmlFor="product-edit-category">เวลาที่สิ้นสุด</label>
              <Input id="product-edit-title" placeholder="" />
            </div>
            <div className="form-group">
              <label htmlFor="product-edit-price">Offset</label>
              <Input id="product-edit-title" placeholder="" />
            </div>
            <div className="form-group">
              <label htmlFor="product-edit-price">ประเภท</label>
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
          <Button type="primary" icon="plus" onClick={() => this.addDataManageRecurring()}>
            เพิ่มรอบรับคืน
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
)(ManageRecurring)

// export default ConfigParameter
