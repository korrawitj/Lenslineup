import React from 'react'
import { Table, Icon, Input, Button, Modal, Upload } from 'antd'
import tableData from './data.json'
import * as actionCreators from '../../../../store/axios/productItem'
import { connect } from 'react-redux'

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
    tableData: tableData.data,
    data: tableData.data,
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleChange = ({ fileList }) => this.setState({ fileList })
  onInputChange = e => {
    this.setState({ searchText: e.target.value })
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
  showDeleteConfirm(record) {
    let T = record
    Modal.confirm({
      title: 'Are you sure delete this row?',
      content: <div>Delelte Product Include = {record.setid}</div>,
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
  addDataConfirm() {
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    Modal.confirm({
      title: 'Add Product Include',
      width: 1000,
      content: (
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <label htmlFor="product-edit-title">อุปกรณ์</label>
              <Input id="product-edit-title" placeholder="" />
            </div>
            <div className="form-group">
              <label htmlFor="product-edit-category">ราคาในสัญญา</label>
              <Input id="product-edit-category" placeholder="" />
            </div>
            <div className="form-group">
              <label htmlFor="product-edit-price">จำนวน</label>
              <Input id="product-edit-price" placeholder="" />
            </div>
            <div className="form-group">
              <lable htmlFor="image">รูปภาพ</lable>
              <Upload
                action=""
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length >= 3 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
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
          <div className="col-md-6">{record.Copy}</div>
          <div className="col-md-4">
            <label>ราคาในสัญญา</label>
          </div>
          <div className="col-md-6">{record.PromisePrice}</div>
          <div className="col-md-4">
            <label>จำนวน</label>
          </div>
          <div className="col-md-6">{record.Quantity}</div>
        </div>
      ),
      onOk() {},
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

  componentDidMount() {
    this.props.getAllProductItem()
  }

  render() {
    let { pager, data } = this.state
    const columns = [
      {
        title: 'ItemID',
        dataIndex: 'ItemID',
        key: 'ItemID',
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            {'#' + text}
          </a>
        ),
        sorter: (a, b) => a.ProductID - b.ProductID,
      },
      {
        title: 'อุปกรณ์',
        dataIndex: 'Name',
        key: 'Name',
        sorter: (a, b) => a.Copy.length - b.Copy.length,
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            {text}
          </a>
        ),
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => (this.searchInput = ele)}
              placeholder="Search name"
              value={this.state.searchText}
              onChange={this.onInputChange}
              onPressEnter={this.onSearch}
            />
            <Button type="primary" onClick={this.onSearch}>
              Search
            </Button>
          </div>
        ),
        filterIcon: (
          <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />
        ),
        filterDropdownVisible: this.state.filterDropdownVisible,
        onFilterDropdownVisibleChange: visible => {
          this.setState(
            {
              filterDropdownVisible: visible,
            },
            () => this.searchInput && this.searchInput.focus(),
          )
        },
      },
      {
        title: 'ราคาในสัญญา',
        dataIndex: 'ContractPrice',
        key: 'ContractPrice',
        render: text => <span>{'$' + text}</span>,
        sorter: (a, b) => a.PromisePrice - b.PromisePrice,
      },
      {
        title: 'จำนวน',
        dataIndex: 'Quantity',
        key: 'Quantity',
        render: text => <span>{'$' + text}</span>,
        sorter: (a, b) => a.Quantity - b.Quantity,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button
              type="primary"
              shape="circle"
              icon="search"
              onClick={() => this.showData(record)}
            />
            <Button
              shape="circle"
              icon="edit"
              onClick={() => this.addDataConfirm(record)}
              style={{ backgroundColor: '#c49f47' }}
            />
            <Button
              type="danger"
              shape="circle"
              icon="delete"
              onClick={() => this.showDeleteConfirm(record)}
            />
          </span>
        ),
      },
    ]
    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>อุปกรณ์ที่ให้ไประหว่างเช่า</strong>
          </div>
          <Button type="primary" icon="plus" onClick={() => this.addDataConfirm()}>
            เพิ่มอุปกรณ์
          </Button>
        </div>
        <div className="card-body">
          <Table
            columns={columns}
            dataSource={this.props.productItem.productItemData}
            pagination={pager}
            onChange={this.handleTableChange}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    productItem: state.productItem,
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(ProductInclude)
