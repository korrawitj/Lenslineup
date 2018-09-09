import React from 'react'
import { Table, Icon, Input, Button } from 'antd'

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
    data: { Holiday: [{ Date: '1', Recive: 'true', Recurring: 'ture' }] },
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
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

    const columns = [
      {
        title: 'วันหยุดร้าน',
        dataIndex: 'Date',
        key: 'Date',
        render: text => <span>{'$' + text}</span>,
        sorter: (a, b) => a.Date - b.Date,
      },
      {
        title: 'การรับ',
        dataIndex: 'Recive',
        key: 'Recive',
        render: text => <span>{'$' + text}</span>,
        sorter: (a, b) => a.Recive - b.Recive,
      },
      {
        title: 'การคืน',
        dataIndex: 'recurring',
        key: 'Recurring',
        render: text => <span>{'$' + text}</span>,
        sorter: (a, b) => a.Recurring - b.Recurring,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button icon="edit" className="mr-1" size="small">
              View
            </Button>
            <Button icon="cross" size="small">
              Remove
            </Button>
          </span>
        ),
      },
    ]

    let { Holiday } = this.state.data
    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>วันหยุดร้าน</strong>
          </div>
        </div>
        <div className="card-body">
          <Table
            columns={columns}
            dataSource={Holiday}
            pagination={pager}
            onChange={this.handleTableChange}
          />
        </div>
        <div className="card-header">
          <div className="utils__title">
            <strong>วันหยุดประจำ</strong>
          </div>
        </div>
        <div className="card-body">
          <Table
            columns={columns}
            dataSource={Holiday}
            pagination={pager}
            onChange={this.handleTableChange}
          />
        </div>
        <div className="card-header">
          <div className="utils__title">
            <strong>จัดการรอบรับคืน</strong>
          </div>
        </div>
        <div className="card-body">
          <Table
            columns={columns}
            dataSource={Holiday}
            pagination={pager}
            onChange={this.handleTableChange}
          />
        </div>
        <div className="card-header">
          <div className="utils__title">
            <strong>จุดรับของ</strong>
          </div>
        </div>
        <div className="card-body">
          <Table
            columns={columns}
            dataSource={Holiday}
            pagination={pager}
            onChange={this.handleTableChange}
          />
        </div>
      </div>
    )
  }
}

export default ConfigParameter
