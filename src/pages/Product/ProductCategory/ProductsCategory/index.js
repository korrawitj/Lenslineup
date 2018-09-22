import React from 'react'
import { Input, TreeSelect, Button, Icon, Table, Modal, Form, Upload, message } from 'antd'
import { connect } from 'react-redux'
import * as actionCreators from '../../../../store/axios/productcategory'
const FormItem = Form.Item
const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, treeData, categoryData } = this.props
      const { getFieldDecorator } = form
      const { Fullname, Shortname, Parentcategory } = categoryData
      return (
        <Modal
          width={1000}
          visible={visible}
          title="Add Product Category"
          okText={categoryData.CategoryID != null ? 'Update' : 'Create'}
          onCancel={onCancel}
          onOk={onCreate}
        >
          <div className="card-body">
            <Form layout="vertical">
              <FormItem label="FullName">
                {getFieldDecorator('categoryData.Fullname', {
                  rules: [{ required: true, message: 'Please input the title of collection!' }],
                  initialValue: Fullname,
                })(<Input type="text" />)}
              </FormItem>
              <FormItem label="ShortName">
                {getFieldDecorator('categoryData.Shortname', {
                  initialValue: Shortname,
                  rules: [{ required: true, message: 'Please input the title of collection!' }],
                })(<Input type="text" />)}
              </FormItem>
              <FormItem label="Order">
                {getFieldDecorator('categoryData.Order', { initialValue: categoryData.Order })(
                  <Input type="textarea" />,
                )}
              </FormItem>
              <FormItem label="Parentcategory">
                {getFieldDecorator('categoryData.Parentcategory', { initialValue: Parentcategory })(
                  <TreeSelect
                    style={{ width: 300 }}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={treeData}
                    placeholder="Please select"
                    treeDefaultExpandAll
                  />,
                )}
              </FormItem>
            </Form>
          </div>
        </Modal>
      )
    }
  },
)

const defaultPagination = {
  pageSizeOptions: ['10', '50', '100', '250'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: total => `Total ${total} items`,
  total: 0,
}

class ProductCate extends React.Component {
  state = {
    categoryData: {},
    categoryValue: undefined,
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    visible: false,
    filtered: false,
    previewVisible: false,
    fileList: [],
    uploading: false,
    ProductID: 'a8cd1d3e-f220-47c9-934f-f1608837959d',
  }

  showModal = () => {
    this.setState({ visible: true })
  }
  onAdd = () => {
    this.setState({ categoryData: {} })
    this.showModal()
  }
  onEdit(record) {
    this.setState({ categoryData: record })
    this.showModal()
  }
  onDelete = (record, propsParam) => {
    Modal.confirm({
      title: 'Are you sure delete this row?',
      content: <div>Delete {record.Fullname}</div>,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        propsParam.DeleteCategory(record.CategoryID)
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }
  handleCreate = () => {
    const form = this.formRef.props.form
    const CatData = this.formRef.props.categoryData
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      if (CatData.CategoryID != null) {
        values.categoryData.CategoryID = CatData.CategoryID
        this.props.updateCategory(values)
      } else {
        this.props.addCategory(values)
      }

      form.resetFields()
      this.setState({ visible: false })
    })
  }
  handleCancel = () => this.setState({ previewVisible: false, visible: false })

  saveFormRef = formRef => {
    this.formRef = formRef
  }
  componentDidMount() {
    this.props.getAllData()
  }

  render() {
    const photos = {
      name: 'productPhoto',
      multiple: true,
      data: { ProductID: this.state.ProductID },
      action: 'http://localhost:8888/API/product/uploadImages',
      onChange(info) {
        const status = info.file.status
        if (status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`)
          debugger
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`)
        }
      },
    }
    const columns = [
      {
        title: 'Fullname',
        dataIndex: 'Fullname',
        width: '30%',
      },
      {
        title: 'Shortname',
        dataIndex: 'Shortname',
        width: '30%',
        sorter: (a, b) => a.Shortname.length - b.Shortname.length,
      },
      {
        title: 'Order',
        dataIndex: 'Order',
        width: '30%',
        sorter: (a, b) => a.Order.length - b.Order.length,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button
              shape="circle"
              icon="edit"
              onClick={() => this.onEdit(record)}
              className="palm-btn-warning"
            />
            <Button
              type="danger"
              shape="circle"
              icon="delete"
              onClick={() => this.onDelete(record, this.props)}
            />
          </span>
        ),
      },
    ]
    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Product Category</strong>
          </div>
          <Button type="primary" onClick={this.onAdd}>
            เพิ่มประเภท
          </Button>
          <div>
            <div />
            <Dragger {...photos}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data
                or other band files
              </p>
            </Dragger>
            ,
          </div>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            categoryData={this.state.categoryData}
            treeData={this.props.pcr.categoryData}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </div>

        <div className="card-body">
          <Table columns={columns} dataSource={this.props.pcr.categoryData} />
        </div>
      </div>
    )
  }
}

const Dragger = Upload.Dragger

const mapStateToProps = state => {
  return {
    pcr: state.pcr,
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(ProductCate)
