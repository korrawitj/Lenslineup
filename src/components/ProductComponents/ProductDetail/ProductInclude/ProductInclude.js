import React from 'react'
import { Icon, Input, Button, Modal, Table, Select } from 'antd'
const Option = Select.Option
const defaultPagination = {
  pageSizeOptions: ['10', '50', '100', '250'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: total => `Total ${total} items`,
  total: 0,
}
class ProductInclude extends React.Component {
  state = {
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    ProductIncludeData: '',
    filtered: false,
    previewVisible: false,
    arrayvar: [],
    refresh: false,
  }
  showDeleteConfirm(record, props) {
    // const { refresh} = this.state
    console.log(props)
    var _this = this
    Modal.confirm({
      title: 'คุณแน่ใจหรือไม่ที่จะลบ อุปกรณ์ที่ให้ไประหว่างเช่า?',
      content: <div> {record.Name}</div>,
      okText: 'ตกลง',
      okType: 'danger',
      cancelText: 'ยกเลิก',
      iconType: 'close-circle',
      centered: true,
      onOk: () => {
        console.log(props)
        if (props.productID !== null && props.DataSourceTa !== []) {
          props.deleteProductInclude(props.productID, record.ItemID)
        }
        var ProductItem = props.DataSourceTa
        var removeItem = record.ItemID
        var index = ProductItem.indexOf(removeItem)
        ProductItem.splice(index, 1)
        _this.setState({ refresh: true })
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }
  handleChange = value => {
    this.setState({ ProductIncludeData: value })
  }
  handleAdd = async () => {
    const Test = { Id: this.state.ProductIncludeData }

    if (!this.props.DataSourceTa.some(item => Test.Id === item.key)) {
      const x = await this.props.getId(Test)
    }
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
    let { pager, data } = this.state
    const columns = [
      {
        title: 'อุปกรณ์',
        dataIndex: 'Name',
        key: 'Name',
        sorter: (a, b) => a.Name.length - b.Name.length,
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            {text}
          </a>
        ),
      },
      {
        title: 'ราคา',
        dataIndex: 'ContractPrice',
        key: 'ContractPrice',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.ContractPrice - b.ContractPrice,
      },
      {
        title: 'จำนวน',
        dataIndex: 'Quantity',
        key: 'Quantity',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.Quantity - b.Quantity,
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
              onClick={() => this.showDeleteConfirm(record, this.props)}
            />
          </span>
        ),
      },
    ]
    // console.log(this.props.ProductItem)
    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>อุปกรณ์ที่ให้ไประหว่างเช่า</strong>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6">
              <Select
                placeholder="Please select"
                style={{ width: '100%' }}
                onChange={this.handleChange}
              >
                {this.props.ProductItem.map(item => (
                  <Option selected key={item.ItemID} value={item.ItemID}>
                    {item.Name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="col-sm-3">
              <Button onClick={this.handleAdd} type="primary" style={{ float: 'right' }}>
                เพิ่ม
              </Button>
            </div>
          </div>
          <br />
          <Table
            columns={columns}
            dataSource={this.props.DataSourceTa}
            pagination={pager}
            onChange={this.handleTableChange}
          />
        </div>
      </div>
    )
  }
}

export default ProductInclude
