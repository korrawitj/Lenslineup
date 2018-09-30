import React from 'react'
import { Icon, Input, Button, Modal, Table ,Select } from 'antd'
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
    ProductIncludeData:'',
    filtered: false,
    previewVisible: false,
  }
  onSearch = () => {
    const { searchText, tableData } = this.state
    let reg = new RegExp(searchText, 'gi')
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: tableData
        .map(record => {
          let match = record.ProductName.match(reg)
          if (!match) {
            return null
          }
          return {
            ...record,
            name: (
              <span>
                {record.ProductName.split(reg).map(
                  (text, i) =>
                    i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text,
                )}
              </span>
            ),
          }
        })
        .filter(record => !!record),
    })
  }
  showDeleteConfirm(record, props) {
    let T = record
    Modal.confirm({
      title: 'Are you sure delete this row?',
      content: <div>Delelte Product Item = {record.ItemID}</div>,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        props.deleteProductItem(record.ItemID)
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }
  showData(record) {
    let T = record
    Modal.info({
      title: <div>อุปกรณ์จัดชุด {record.ItemID}</div>,
      width: 1000,

      content: (
        <div className="row">
          <div className="col-md-4">
            <label>อุปกรณ์</label>
          </div>
          <div className="col-md-6">{record.Name}</div>
          <div className="col-md-4">
            <label>ราคาในสัญญา</label>
          </div>
          <div className="col-md-6">{record.ContractPrice}</div>
          <div className="col-md-4">
            <label>จำนวน</label>
          </div>
          <div className="col-md-6">{record.Quantity}</div>
        </div>
      ),
      onOk() {},
    })
  }
  handleChange =(value)=> {
    this.setState({ ProductIncludeData:value })
    // console.log(this.state.ProductIncludeData)
  }
  handleAdd=()=>{
    // console.log(this.state.ProductIncludeData)
    console.log(this.state.ProductIncludeData)
    const Test = {Id:this.state.ProductIncludeData}
    const x = this.props.getId(Test)
    console.log(x)
    // console.log(x)
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
      // {
      //   title: 'ItemID',
      //   dataIndex: 'ItemID',
      //   key: 'ItemID',
      //   render: text => (
      //     <a className="utils__link--underlined" href="javascript: void(0);">
      //       {'#' + text}
      //     </a>
      //   ),
      //   sorter: (a, b) => a.ItemID - b.ItemID,
      // },
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
        title: 'แสดงหน้าเว็บ',
        dataIndex: 'IsShow',
        key: 'IsShow',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.IsShow - b.IsShow,
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
    // console.log(this.props.TTT)
    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>อุปกรณ์ที่ติดไปด้วย</strong>
          </div>
        </div>
        <div className="row">
        <div className="col-md-6">
        
        <Select placeholder="Please select" style={{ width: '100%' }} onChange={this.handleChange} >
                    {this.props.TTT.map(item => (
                      <Option selected key={item.ItemID} value={item.ItemID}>
                        {item.Name}
                      </Option>
                    ))}
        </Select>
        </div>
        <div className="col-md-2">
        <Button onClick={this.handleAdd}>Add
          </Button>
          </div>
          </div>
        <hr />
        <div className="card-body" />
        <Table
          columns={columns}
          // dataSource={this.props.TTT}
          pagination={pager}
          onChange={this.handleTableChange}
        />
      </div>
    )
  }
}

export default ProductInclude
