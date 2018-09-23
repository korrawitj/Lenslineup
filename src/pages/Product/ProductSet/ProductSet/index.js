import React from 'react'
import { Table, Icon, Input, Button, Modal, Radio, Form, Upload } from 'antd'
import tableData from './data.json'
import * as actionCreators from '../../../../store/axios/productPackage'
import { connect } from 'react-redux'
const RadioGroup = Radio.Group
const FormItem = Form.Item
const { TextArea } = Input
const defaultPagination = {
  pageSizeOptions: ['10', '50', '100', '250'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: total => `Total ${total} items`,
  total: 0,
}

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    state = {
      fileList: [],
      uploading: false,
    }
    handleUpload = () => {
      const { fileList } = this.state

      try {
        this.setState({
          uploading: false,
        })
        this.props.onUpload(fileList)
      } catch (err) {
      } finally {
        this.setState({
          uploading: false,
          fileList: [],
        })
      }
    }
    render() {
      const { visible, onCancel, onCreate, form, productPackageData } = this.props
      const { getFieldDecorator } = form
      const { uploading } = this.state
      const props = {
        action: '//jsonplaceholder.typicode.com/posts/',
        onRemove: file => {
          this.setState(({ fileList }) => {
            const index = fileList.indexOf(file)
            const newFileList = fileList.slice()
            newFileList.splice(index, 1)
            return {
              fileList: newFileList,
            }
          })
        },
        beforeUpload: file => {
          this.setState(({ fileList }) => ({
            fileList: [...fileList, file],
          }))
          return false
        },
        fileList: this.state.fileList,
      }
      return (
        <Modal
          width={1000}
          visible={visible}
          title={productPackageData.PackageID != null ? 'Add Product Package' : 'Update Product Package'}
          okText={productPackageData.PackageID != null ? 'Update' : 'Create'}
          onCancel={onCancel}
          onOk={onCreate}
        >
          <div className="card-body">
            <Form layout="vertical">
              <FormItem label="ชื่อ">
                {getFieldDecorator('productPackageData.Name', {
                  initialValue: productPackageData.Name,
                })(<Input />)}
              </FormItem>
              <FormItem label="ราคาในสัญญา">
                {getFieldDecorator('productPackageData.ValuationPrice', {
                  initialValue: productPackageData.ValuationPrice,
                })(<Input />)}
              </FormItem>
              <FormItem label="จำนวน">
                {getFieldDecorator('productPackageData.RentDay', {
                  initialValue: productPackageData.RentDay,
                })(<Input />)}
              </FormItem>
              <FormItem label="Note">
                {getFieldDecorator('productPackageData.DepositType1', {
                  initialValue: productPackageData.DepositType1,
                })(<Input />)}
              </FormItem>
              <FormItem label="Note">
                {getFieldDecorator('productPackageData.DepositType2', {
                  initialValue: productPackageData.DepositType2,
                })(<Input />)}
              </FormItem>
            </Form>
          </div>
        </Modal>
      )
    }
  },
)
class ProductSet extends React.Component {
  state = {
    tableData: tableData.data,
    data: tableData.data,
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    productPackageData:{},
  }
  showDeleteConfirm(record) {
    let T = record
    Modal.confirm({
      title: 'Are you sure delete this row?',
      content: <div>Delelte ProductSet = {record.PackageID}</div>,
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
  onChange = e => {
    console.log('radio checked', e.target.value)
    this.setState({
      value: e.target.value,
    })
  }
  showModal = () => {
    this.setState({ visible: true })
  }
  saveFormRef = formRef => {
    this.formRef = formRef
  }
  handleCreate = () => {
    const form = this.formRef.props.form
    const productPackageData = this.formRef.props.productPackageData
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      console.log('Received values of form: ', values.productPackageData)
      // if (productItemData.ItemID != null) {
      //   values.productItemData['key'] = productItemData['key']
      //   values.productItemData['ItemID'] = productItemData['ItemID']
      // } else {
      //   // this.props.addProductItem(values.productItemData)
      //   console.log(values)
      // }

      form.resetFields()
      this.setState({ visible: false })
    })
  }
  handleCancel = () => this.setState({ previewVisible: false, visible: false })

  onCreateProductPackage = () => {
    this.setState({ productPackageData: {} })
    this.showModal()
  }
  // addDataConfirm(record) {
  //   Modal.confirm({
  //     title: 'Add Product Set',
  //     content: (
  //       <div className="row">
  //         <div className="col-lg-12">
  //           <div className="form-group">
  //             <label htmlFor="product-edit-title">ชื่อ</label>
  //             <Input id="product-edit-title" placeholder="" />
  //           </div>
  //           <div className="form-group">
  //             <label htmlFor="product-edit-category">อุปกรณ์</label>
  //             <Input id="product-edit-category" placeholder="" />
  //           </div>
  //           <div className="form-group">
  //             <label htmlFor="product-edit-price">ราคาเช่า</label>
  //             <Input id="product-edit-price" placeholder="" />
  //           </div>
  //           <div className="form-group">
  //             <label htmlFor="product-edit-price">แสดงหน้าเว็บ</label>
  //             <div>
  //               <RadioGroup name="radiogroup">
  //                 <Radio value={true}>Yes</Radio>
  //                 <Radio value={false}>No</Radio>
  //               </RadioGroup>
  //             </div>
  //           </div>
  //           <div className="form-group">
  //             <label htmlFor="product-edit-price">คิวจอง</label>
  //             <div>
  //               <RadioGroup name="radiogroup2" defaultValue={1}>
  //                 <Radio value={true}>Yes</Radio>
  //                 <Radio value={false}>No</Radio>
  //               </RadioGroup>
  //             </div>
  //           </div>
  //           <div className="form-group">
  //             <label htmlFor="product-edit-price">Note</label>
  //             <div>
  //               <TextArea rows={4} />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     ),
  //     okText: 'Yes',
  //     okType: 'primary',
  //     cancelText: 'No',
  //     width: 1000,
  //     onOk() {
  //       console.log('OK')
  //     },
  //     onCancel() {
  //       console.log('Cancel')
  //     },
  //   })
  // }
  showData(record) {
    let T = record
    Modal.info({
      title: <div>อุปกรณ์จัดชุด {record.PackageID}</div>,
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
          <div className="col-md-6">{record.ValuationPrice}</div>
          <div className="col-md-4">
            <label>วันที่เช่า</label>
          </div>
          <div className="col-md-6">{record.RentDay}</div>
          <div className="col-md-4">
            <label>แบบที่1</label>
          </div>
          <div className="col-md-6">{record.DepositType1}</div>
          <div className="col-md-4">
            <label>แบบที่2</label>
          </div>
          <div className="col-md-6">{record.DepositType2}</div>
        </div>
      ),
      onOk() {},
    })
  }
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
          let match = record.SetName.match(reg)
          if (!match) {
            return null
          }
          return {
            ...record,
            name: (
              <span>
                {record.SetName.split(reg).map(
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
    this.props.getAllProductPackage()
  }
  render() {
    let { pager, data } = this.state

    const columns = [
      {
        title: 'Package ID',
        dataIndex: 'PackageID',
        key: 'PackageID',
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            {text}
          </a>
        ),
        sorter: (a, b) => a.setid - b.setid,
      },
      {
        title: 'อุปกรณ์',
        dataIndex: 'Name',
        key: 'Name',
        sorter: (a, b) => a.SetName.length - b.SetName.length,
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
        title: 'ราคา',
        dataIndex: 'ValuationPrice',
        key: 'ValuationPrice',
        render: text => <span>{'$' + text}</span>,
        sorter: (a, b) => a.ValuationPrice - b.ValuationPrice,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: text => (
          <span className={text === 'Processing' ? 'badge badge-primary' : 'badge badge-default'}>
            {text}
          </span>
        ),
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
            <strong>อุปกรณ์จัดชุด</strong>
          </div>
          <Button type="primary" icon="plus" onClick={this.onCreateProductPackage}>
            เพิ่มอุปกรณ์จัดชุด
          </Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            productPackageData={this.state.productPackageData}
            // onUpload={this.props.uploadProductPhoto}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </div>
        <div className="card-body">
          <Table
            columns={columns}
            dataSource={this.props.productPackage.productPackageData}
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
    productPackage: state.productPackage,
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(ProductSet)
