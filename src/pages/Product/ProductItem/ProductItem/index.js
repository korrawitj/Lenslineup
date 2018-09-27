import React from 'react'
import { Table, Icon, Input, Button, Modal, Form, message } from 'antd'
import * as actionCreators from '../../../../store/axios/productItem'
import { connect } from 'react-redux'
import '../../index.css'
import Picturewall from './Picturewall'
const FormItem = Form.Item
const TextArea = Input.TextArea
const defaultPagination = {
  pageSizeOptions: ['10', '50', '100', '250'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: total => `Total ${total} items`,
  total: 0,
}

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg'
  if (!isJPG) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJPG && isLt2M
}
const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      // const uploadButton = (
      //   <div>
      //     <Icon type={this.state.loading ? 'loading' : 'plus'} />
      //     <div className="ant-upload-text">Upload</div>
      //   </div>
      // )
      const { visible, onCancel, onCreate, form, productItemData } = this.props
      const { getFieldDecorator } = form
      // const { uploading } = this.state
      // const props = {
      //   action: '//jsonplaceholder.typicode.com/posts/',
      //   onRemove: file => {
      //     this.setState(({ fileList }) => {
      //       const index = fileList.indexOf(file)
      //       const newFileList = fileList.slice()
      //       newFileList.splice(index, 1)
      //       return {
      //         fileList: newFileList,
      //       }
      //     })
      //   },
      //   beforeUpload: file => {
      //     this.setState(({ fileList }) => ({
      //       fileList: [...fileList, file],
      //     }))
      //     return false
      //   },
      //   fileList: this.state.fileList,
      // }
      return (
        <Modal
          width={1000}
          visible={visible}
          title={productItemData.ItemID != null ? 'Update Product Item' : 'Add Product Item'}
          okText={productItemData.ItemID != null ? 'Update' : 'Create'}
          onCancel={onCancel}
          onOk={onCreate}
        >
          <div className="card-body">
            <Form layout="vertical">
              <FormItem label="ชื่อ">
                {getFieldDecorator('productItemData.Name', { initialValue: productItemData.Name })(
                  <Input />,
                )}
              </FormItem>
              <FormItem label="ราคาในสัญญา">
                {getFieldDecorator('productItemData.ContractPrice', {
                  initialValue: productItemData.ContractPrice,
                })(<Input />)}
              </FormItem>
              <FormItem label="จำนวน">
                {getFieldDecorator('productItemData.Quantity', {
                  initialValue: productItemData.Quantity,
                })(<Input />)}
              </FormItem>
              <FormItem label="Note">
                {getFieldDecorator('productItemData.Note', { initialValue: productItemData.Note })(
                  <TextArea autosize={{ minRows: 2, maxRows: 6 }} />,
                )}
              </FormItem>
              <FormItem label="Upload">
                {/* {getFieldDecorator('productItemData.Test')(
                  <Upload {...props}>
                    <Button>
                      <Icon type="upload" /> Select File
                    </Button>
                  </Upload>,
                )} */}
                <Picturewall />
                {/* <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  
                  onChange={this.handleChange}
                >
                  {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                </Upload> */}
              </FormItem>
            </Form>
            {/* <div>
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> Select File
                </Button>
              </Upload>
              <Button
                className="upload-demo-start"
                type="primary"
                onClick={this.handleUpload}
                disabled={this.state.fileList.length === 0}
                loading={uploading}
              >
                {uploading ? 'uploading' : 'start upload'}
              </Button>
            </div> */}
          </div>
        </Modal>
      )
    }
  },
)
class ProductItem extends React.Component {
  state = {
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    previewVisible: false,
    previewImage: '',
    visible: false,
    productItemData: {},
    // fileList: [
    //   {
    //     uid: -1,
    //     name: 'xxx.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   },
    // ],
  }
  showModal = () => {
    this.setState({ visible: true })
  }
  saveFormRef = formRef => {
    this.formRef = formRef
  }
  handleCreate = () => {
    const form = this.formRef.props.form
    const productItemData = this.formRef.props.productItemData
    console.log(productItemData.fileData) 
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      // console.log('Received values of form: ', values.productItemData)
      if (productItemData.ItemID != null) {
        values.productItemData['key'] = productItemData['key']
        values.productItemData['ItemID'] = productItemData['ItemID']
        // const formData = new FormData()

        // console.log(values.productItemData['Test'])
        // values.productItemData['Test'].fileList.forEach(x => {
        //   console.log(x)
        //   formData.append('productPhoto', x)
        // })
        // formData.append('productPhoto', values.productItemData['Test'].file)
        // formData.append('productItemData', values.productItemData)
        // console.log(values)
        // this.props.updateProductItem(formData)
      } else {
        console.log(productItemData)
        
        values.productItemData['phoductPhoto'] = productItemData.fileData.productPhoto
        // // productItemData['Name']=values.productItemData['Name']
        // // productItemData['ContractPrice']=values.productItemData['ContractPrice']
        // // productItemData['Quantity']=values.productItemData['Quantity']
        // // productItemData['Note']=values.productItemData['Note']
        this.props.addProductItem(values.productItemData)
        console.log(values.productItemData)
      }

      form.resetFields()
      this.setState({ visible: false })
    })
  }
  handleCancel = () => this.setState({ previewVisible: false, visible: false })

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
  onCreateProductItem = () => {
    this.setState({ productItemData: {} })
    this.showModal()
  }
  componentDidMount() {
    this.props.getAllProductItem()
  }
  onEditProductItem = record => {
    this.setState({ productItemData: record })
    this.showModal()
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
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.PromisePrice - b.PromisePrice,
      },
      {
        title: 'จำนวน',
        dataIndex: 'Quantity',
        key: 'Quantity',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.Quantity - b.Quantity,
      },
      {
        title: 'Note',
        dataIndex: 'Note',
        key: 'Note',
        render: text => <span>{text}</span>,
        sorter: (a, b) => a.Note - b.Note,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button
              shape="circle"
              icon="search"
              onClick={() => this.showData(record)}
              className="palm-btn-primary"
            />
            <Button
              shape="circle"
              icon="edit"
              onClick={() => this.onEditProductItem(record, this.props)}
              className="palm-btn-warning"
            />
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
    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>อุปกรณ์ที่ให้ไประหว่างเช่า</strong>
          </div>
          <Button type="primary" icon="plus" onClick={this.onCreateProductItem}>
            เพิ่มอุปกรณ์ที่ให้ไประหว่างเช่า
          </Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            productItemData={this.props.productItemData}
            onUpload={this.props.updateProductItem}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </div>
        <div className="card-body">
          <Table
            columns={columns}
            dataSource={this.props.productItemData.productItemData}
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
    productItemData: state.productItemData,
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(ProductItem)
