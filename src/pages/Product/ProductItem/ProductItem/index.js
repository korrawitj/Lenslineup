import React from 'react'
import { Table, Icon, Input, Button, Modal, Form, message,InputNumber } from 'antd'
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

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, productItemData } = this.props
      const { getFieldDecorator } = form
      return (
        <Modal
          width={1000}
          visible={visible}
          title={
            productItemData.ItemID != null
              ? 'แก้ไขอุปกรณ์ที่ให้ไประหว่างเช่า'
              : 'เพิ่มอุปกรณ์ที่ให้ไประหว่างเช่า'
          }
          okText={productItemData.ItemID != null ? 'แก้ไข' : 'สร้าง'}
          onCancel={onCancel}
          cancelText={'ยกเลิก'}
          onOk={onCreate}
        >
          <div className="card-body">
            <Form layout="vertical">
              <FormItem label="ชื่อ">
                {getFieldDecorator('productItemData.Name', {
                  initialValue: productItemData.Name,
                  rules: [{ required: true, message: 'กรุณาระบุ ชื่อ !' }],
                })(<Input />)}
              </FormItem>
              <FormItem label="ราคาในสัญญา">
                {getFieldDecorator('productItemData.ContractPrice', {
                  initialValue: productItemData.ContractPrice,
                  rules: [{ required: true, message: 'กรุณาระบุ ราคาในสัญญา !' }],
                })(<InputNumber />)}
              </FormItem>
              <FormItem label="จำนวน">
                {getFieldDecorator('productItemData.Quantity', {
                  initialValue: productItemData.Quantity,
                  rules: [{ required: true, message: 'กรุณาระบุ จำนวน !' }],
                })(<InputNumber />)}
              </FormItem>
              <FormItem label="โน้ต">
                {getFieldDecorator('productItemData.Note', { initialValue: productItemData.Note })(
                  <TextArea autosize={{ minRows: 2, maxRows: 6 }} />,
                )}
              </FormItem>
              <FormItem label="รูปภาพ">
                <Picturewall defaultFileList={productItemData} />
              </FormItem>
            </Form>
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
    form.validateFields(async (err, values) => {
      if (err) {
        return
      }
      if (productItemData.ItemID != null) {
        // productItemData.Name=values.productItemData['Name']
        // productItemData.ContractPrice =values.productItemData['ContractPrice']
        // productItemData.Quantity = values.productItemData['Quantity']
        // productItemData.Note=values.productItemData['Note']
        // productItemData.phoductPhoto=this.props.productItemData.fileData.productPhoto
        values.productItemData['ItemID'] = productItemData.ItemID
        values.productItemData['phoductPhoto'] = this.props.productItemData.fileData.productPhoto
        values.productItemData['ImageID'] = productItemData.ImageID
        console.log(values)
        // values.productItemData['phoductPhoto'] = productItemData.fileData.productPhoto

        await this.props.updateProductItem(values)
      } else {
        productItemData.Name = values.productItemData['Name']
        productItemData.ContractPrice = values.productItemData['ContractPrice']
        productItemData.Quantity = values.productItemData['Quantity']
        productItemData.Note = values.productItemData['Note']
        productItemData.phoductPhoto = this.props.productItemData.fileData.productPhoto
        // console.log(productItemData)
        // productItemData['phoductPhoto']= productItemData.fileData.productPhoto
        // values.productItemData['phoductPhoto'] = productItemData.fileData.productPhoto
        // console.log(values)
        await this.props.addProductItem(productItemData)
      }

      form.resetFields()
      this.props.getAllProductItem()
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
      title: 'คุณแน่ใจหรือไม่ที่จะลบ อุปกรณ์ที่ให้ไประหว่างเช่า?',
      content: <div> {record.ItemID.slice(0, 8)}</div>,
      okText: 'ตกลง',
      okType: 'danger',
      cancelText: 'ยกเลิก',
      iconType: 'close-circle',
      centered: true,
      async onOk() {
        await props.deleteProductItem(record.ItemID)
        props.getAllProductItem()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  showData(record) {
    Modal.info({
      title: <div>อุปกรณ์จัดชุด {record.ItemID.slice(0, 8)}</div>,
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
          <div className="col-md-6">{parseFloat(record.ContractPrice).toFixed(2)}</div>
          <div className="col-md-4">
            <label>จำนวน</label>
          </div>
          <div className="col-md-6">{record.Quantity}</div>
          <div className="col-md-4">
            <label>รูปภาพ</label>
          </div>
          <div className="col-md-6">
            <img alt="example" style={{ width: '20%' }} src={record.phoductPhoto[0].url} />
          </div>
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
    this.setState({ productItemData: {}})
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
        render: text => <span>{text.slice(0, 8)}</span>,
        sorter: (a, b) => a.ProductID - b.ProductID,
      },
      {
        title: 'อุปกรณ์',
        dataIndex: 'Name',
        key: 'Name',
        sorter: (a, b) => a.Name - b.Name,
        render: text => text,
      },
      {
        title: 'ราคาในสัญญา',
        dataIndex: 'ContractPrice',
        key: 'ContractPrice',
        render: text => <span>{parseFloat(text).toFixed(2)}</span>,
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
          <Button type="primary" onClick={this.onCreateProductItem} style={{ float: 'right' }}>
            เพิ่มอุปกรณ์ที่ให้ไประหว่างเช่า
          </Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            productItemData={this.state.productItemData}
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
