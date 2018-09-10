import React from 'react'
import { Input, TreeSelect, Select, Button, Upload, Icon, message, Table, Modal } from 'antd'
import tableData from './data.json'
import { connect } from 'react-redux'
import * as actionCreators from '../../../../store/axios/productcategory'
import axios from 'axios'

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

  componentDidMount() {
    this.props.getData()
  }

  handleCancel = () => this.setState({ previewVisible: false })

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
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label htmlFor="product-edit-title">ชื่อประเภท</label>
                    <Input id="product-edit-title" placeholder="Product title" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label htmlFor="product-edit-category">Category</label>
                    <TreeSelect
                      id="product-edit-category"
                      showSearch
                      style={{ width: '100%', display: 'block' }}
                      value={categoryValue}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder="Please select category"
                      allowClear
                      multiple
                      treeDefaultExpandAll
                      onChange={this.onChangeCategory}
                    >
                      <TreeNode value="furniture" title="Furniture" key="0">
                        <TreeNode value="tables" title="Tables" key="0-0" />
                        <TreeNode value="chairs" title="Chairs" key="0-1">
                          <TreeNode value="roundedchairs" title="Rounded Chairs" key="0-1-0" />
                          <TreeNode value="squaredchairs" title="Squared Chairs" key="0-1-1" />
                        </TreeNode>
                      </TreeNode>
                      <TreeNode value="electronics" title="Electronics" key="1">
                        <TreeNode value="tv" title="TV" key="1-0" />
                        <TreeNode value="chairs" title="Consoles" key="1-1">
                          <TreeNode value="playstation" title="Playstation" key="1-1-0" />
                          <TreeNode value="xbox" title="Xbox" key="1-1-1" />
                        </TreeNode>
                      </TreeNode>
                    </TreeSelect>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="clearfix">
              <Upload
                action="//jsonplaceholder.typicode.com/posts/"
                listType="picture-card"
                fileList={this.fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {uploadButton}
              </Upload>
              <Modal visible={this.previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={this.previewImage} />
              </Modal>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-actions">
              <Button type="primary" className="mr-2" onClick={() => this.onUploadImageSaved()}>
                Save Product
              </Button>
              <Button type="default">Cancel</Button>
            </div>
          </div>
          <div className="col-lg-6">
            <Table
              columns={columns}
              dataSource={this.props.pcr.categoryData}
              pagination={pager}
              onChange={this.handleTableChange}
            />
          </div>
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
