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

class Holiday extends React.Component {
  state = {
    data: {
      holidayData: [{ date: '1', receive: 'true', recurring: 'true', message: 'sdfsdf' }],
    },
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
  }
  componentDidMount() {
    this.props.getAllDataHoliday()
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

// export default ConfigParameter
