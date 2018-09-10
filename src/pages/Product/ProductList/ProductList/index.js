import React from 'react';
import { Table, Icon, Input, Button, Modal,Upload,Radio } from 'antd';
import tableData from './data.json';
import * as actionCreators from '../../../../store/axios/product';
import { connect } from 'react-redux';
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;
const defaultPagination = {
  pageSizeOptions: ['10', '50', '100', '250'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: total => `Total ${total} items`,
  total: 0,
}

class ProductList extends React.Component {
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
    dataSend: {
      productData:[{
        ProductID:'',
        Copy:'',
        Name:'',
        SerialNumber:'',
        ContractPrice:'',
        PurchasePrice:'',
        PurchaseDate:'',
        DisplayName: '',
        Status: '',
        DepositType1: '',
        DepositType2: '',
        Note:'',
        isShow:'',
        MetaTitle:'',
        MetaDescription:'',
        Permalink:'',
        Description:'',
        CategoryID:'',
        Description1:'',
        IsDay:'',
        RentDay_Fee:'',
        IsHaftDay:'',
        RentHaftDay_Fee:'',
        IsHour:'',
        RentHour_Fee:'',
        RentDay:'',
        BrandName:'',
      },
    ],
  },
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleChange = ({ fileList }) => this.setState({ fileList })
  showDeleteConfirm(record) {
    let T = record
    confirm({
      title: 'Are you sure delete this row?',
      content: <div>Delelte ProductID = {record.id}</div>,
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
  addDataProduct() {
    let data = this.state.dataSend;
    const dataCopy = [
      {
        title: 'View',
        key: 'CategoryID',
        render: (text, record) => (
          <span>
            <Button icon="cross" size="small" onClick={() => console.log(record)}>
              View
            </Button>
          </span>
        ),
      },
      {
        title: 'ตัวที่',
        dataIndex: 'CopyNo',
        key: 'CopyNo',
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            {text}
          </a>
        ),
        sorter: (a, b) => a.CopyNo - b.CopyNo,
      },
      {
        title: 'ชื่อสั้น',
        dataIndex: 'Serail',
        key: 'SerialNumber',
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            {text}
          </a>
        ),
        sorter: (a, b) => a.SerialNumber - b.SerialNumber,
      },
      {
        title: 'ราคาที่ซื้อ',
        dataIndex: 'PurchasePrice',
        key: 'PurchasePrice',
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            {'#' + text}
          </a>
        ),
        sorter: (a, b) => a.PurchasePrice - b.PurchasePrice,
      },
      {
        title: 'วันที่ซื้อ',
        dataIndex: 'PurchaseDate',
        key: 'PurchaseDate',
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            {'#' + text}
          </a>
        ),
        sorter: (a, b) => a.PurchaseDate - b.PurchaseDate,
      },
      {
        title: 'สถานะ',
        dataIndex: 'Status',
        key: 'Status',
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            {'#' + text}
          </a>
        ),
        sorter: (a, b) => a.Status - b.Status,
      },
      {
        title: 'แก้ไข',
        key: 'Edit',
        render: (text, record) => (
          <span>
            <Button icon="cross" size="small" onClick={() => console.log(record)}>
              Edit
            </Button>
          </span>
        ),
      },
      {
        title: 'ลบ',
        key: 'Action',
        render: (text, record) => (
          <span>
            <Button icon="cross" size="small" onClick={() => console.log(record)}>
              Remove
            </Button>
          </span>
        ),
      },
    ]
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const {pager}=this.state;
    Modal.confirm({
      title: 'Add Product',
      width: 1000,
      content: (
        <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <div className="utils__title">
              <strong>เพิ่มอุปกรณ์</strong>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label htmlFor="product-edit-title">อุปกรณ์</label>
                    <Input id="product-edit-title" onChange={e => (data.productData[0].Name = e.target.value)}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-category">ประเภท</label>
                    <Input id="product-edit-category" onChange={e => (data.productData[0].CategoryID = e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-price">ราคาเช่า1วัน</label>
                    <Input id="product-edit-price" onChange={e => (data.productData[0].RentDay_Fee = e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-day">จำนวนวันขั้นต่ำที่ให้เช่า</label>
                    <Input id="product-edit-day" onChange={e => (data.productData[0].IsDay = e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-title">แบบที่1</label>
                    <Input id="product-edit-title" onChange={e => (data.productData[0].DepositType1 = e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-title">แบบที่2</label>
                    <Input id="product-edit-title" onChange={e => (data.productData[0].DepositType2 = e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-title">ราคาในสัญญา</label>
                    <Input id="product-edit-title" onChange={e => (data.productData[0].ContractPrice = e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-title">Note</label>
                    <Input id="product-edit-title" onChange={e => (data.productData[0].Note = e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-title">QR ID</label>
                    <Input id="product-edit-title" placeholder="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-title">สถานะหน้าเว็บ</label>
                      <RadioGroup name="radiogroup" onChange={e => (data.productData[0].isShow = e.target.value)}>
                            <Radio value={1}>แสดง</Radio>
                            <Radio value={0}>ไม่แสดง</Radio>
                      </RadioGroup>
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-title">สถานะคิวจอง</label>
                    <RadioGroup name="radiogroup" onChange={e => (data.productData[0].Status = e.target.value)}>
                            <Radio value={1}>พร้อมให้เช่า</Radio>
                            <Radio value={0}>ไม่พร้อมให้เช่า</Radio>
                      </RadioGroup>
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-title">การรับ</label>
                    <Input id="product-edit-title" placeholder="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-title">การคืน</label>
                    <Input id="product-edit-title" placeholder="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label htmlFor="product-edit-title">รูปภาพ</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="utils__title">
                <strong>Product Copy</strong>
              </div>
              <Table
                columns={dataCopy}
                dataSource=""
                pagination={pager}
                onChange={this.handleTableChange}
              />
            </div>
          </div>
        </div>
      </div>
      ),
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log(data)
      },
      onCancel() {
        console.log('Cancel')
      },
    })
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
    this.props.getAll()
  }

  render() {
    let { pager, data } = this.state

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            {'#' + text}
          </a>
        ),
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: 'อุปกรณ์',
        dataIndex: 'ProductName',
        key: 'ProductName',
        sorter: (a, b) => a.ProductName.length - b.ProductName.length,
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
        title: 'ราคาเช่า',
        dataIndex: 'RentPrice',
        key: 'RentPrice',
        render: text => <span>{'$' + text}</span>,
        sorter: (a, b) => a.RentPrice - b.RentPrice,
      },
      {
        title: 'หลักประกัน1',
        dataIndex: 'GuaranteePrice',
        key: 'GuaranteePrice',
        render: text => <span>{'$' + text}</span>,
        sorter: (a, b) => a.GuaranteePrice - b.GuaranteePrice,
      },
      {
        title: 'หลักประกัน2',
        dataIndex: 'GuaranteePrice2',
        key: 'GuaranteePrice2',
        render: text => <span>{'$' + text}</span>,
        sorter: (a, b) => a.GuaranteePrice2 - b.GuaranteePrice2,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button type="primary" shape="circle" icon="search" onClick={this.onSearch} />
            <Button
              shape="circle"
              icon="plus"
              onClick={this.onSearch}
              style={{ backgroundColor: '#46c938' }}
            />
            <Button
              shape="circle"
              icon="edit"
              onClick={this.onSearch}
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
            <strong>อุปกรณ์ทั้งหมด</strong>
          </div>
          <Button type="primary" icon="plus" onClick={() => this.addDataProduct()}>
            เพิ่มอุปกรณ์
          </Button>
        </div>
        <div className="card-body">
          <Table
            columns={columns}
            dataSource={data}
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
    product: state.product,
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(ProductList)
