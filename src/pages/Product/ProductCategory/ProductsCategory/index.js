import React from 'react'
import { Input, TreeSelect, Select, Button, Upload, Icon, message, Table, Modal,Form } from 'antd'
import tableData from './data.json'
import { connect } from 'react-redux'
import * as actionCreators from '../../../../store/axios/productcategory'
import axios from 'axios'
const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          width={1000}
          visible={visible}
          title="Add Product Category"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <div className="card-body">
          <Form layout="vertical">
            <FormItem label="FullName">
              {getFieldDecorator('categoryData.FullName', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="ShortName">
              {getFieldDecorator('categoryData.ShortName', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Order">
              {getFieldDecorator('categoryData.Order')(<Input type="textarea" />)}
            </FormItem>
            <FormItem label="Parentcategory">
              {getFieldDecorator('categoryData.Parentcategory')(<Input type="textarea" />)}
            </FormItem>       
          </Form>
          </div>
        </Modal>
      );
    }
  }
);



const TreeNode = TreeSelect.TreeNode

const defaultPagination = {
  pageSizeOptions: ['10', '50', '100', '250'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: total => `Total ${total} items`,
  total: 0,
}

const columns = [
  {
    title: 'CategoryID',
    dataIndex: 'CategoryID',
    key: 'CategoryID',
    render: text => (
      <a className="utils__link--underlined" href="javascript: void(0);">
        {'#' + text}
      </a>
    ),
    sorter: (a, b) => a.CategoryID - b.CategoryID,
  },
  {
    title: 'ชื่อประเภท',
    dataIndex: 'Fullname',
    key: 'Fullname',
    render: text => (
      <a className="utils__link--underlined" href="javascript: void(0);">
        {text}
      </a>
    ),
    sorter: (a, b) => a.Fullname - b.Fullname,
  },
  {
    title: 'ชื่อสั้น',
    dataIndex: 'Shortname',
    key: 'Shortname',
    render: text => (
      <a className="utils__link--underlined" href="javascript: void(0);">
        {text}
      </a>
    ),
    sorter: (a, b) => a.Shortname - b.Shortname,
  },
  {
    title: 'Order',
    dataIndex: 'Order',
    key: 'Order',
    render: text => (
      <a className="utils__link--underlined" href="javascript: void(0);">
        {'#' + text}
      </a>
    ),
    sorter: (a, b) => a.Order - b.Order,
  },
  {
    title: 'Action',
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
const uploadButton = (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">Upload</div>
  </div>
)
class ProductCate extends React.Component {
  state = {
    categoryValue: undefined,
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    visible: false,
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
  showModal = () => {
    this.setState({ visible: true });
  }
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  componentDidMount() {
    this.props.getAllData()
  }

  handleCancel = () => this.setState({ previewVisible: false, visible: false })

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
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

  onInputChange = e => {
    this.setState({ searchText: e.target.value })
  }
  handleChange = ({ fileList }) => {
    this.setState({ fileList })
  }
  onChangeCategory = value => {
    this.setState({
      categoryValue: value,
    })
  }
  onUploadImageSaved() {
    this.props.UploadImages(this.state.fileList)
  }

  render() {
    let { pager } = this.state
    let { categoryValue } = this.state
    console.log(this.props.pcr.categoryData)
    console.log(this.state.data)
    // let { categoryData } = this.pcr.categoryData
    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Product Category</strong>
          </div>
          <Button type="primary" onClick={this.showModal}>
            เพิ่มประเภท
          </Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </div>
     
        <div className="card-body">
        <Table
              columns={columns}
              dataSource={this.props.pcr.categoryData}
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
    pcr: state.pcr,
  }
}

export default connect(
  mapStateToProps,
  actionCreators,
)(ProductCate)
