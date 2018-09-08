import React from 'react'
import { Input, TreeSelect, Select, Button, Upload, Icon, message, Table, Modal } from 'antd'
import tableData from './data.json'
import { connect } from 'react-redux'

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
    title: 'ชื่อประเภท',
    dataIndex: 'FullName',
    key: 'FullName',
    render: text => (
      <a className="utils__link--underlined" href="javascript: void(0);">
        {'#' + text}
      </a>
    ),
    sorter: (a, b) => a.FullName - b.FullName,
  },
  {
    title: 'Sub-Catagory',
    dataIndex: 'Parentcategory',
    key: 'Parentcategory',
    sorter: (a, b) => a.Parentcategory - b.Parentcategory,
    render: text => (
      <a className="utils__link--underlined" href="javascript: void(0);">
        {text}
      </a>
    ),
  },
  {
    title: 'รูป',
    dataIndex: 'Picture',
    key: 'Picture',
    render: text => <span>{'$' + text}</span>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button icon="cross" size="small">
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
  handleChange = ({ fileList }) => this.setState({ fileList })
  onChangeCategory = value => {
    this.setState({
      categoryValue: value,
    })
  }
  render() {
    let { pager, data } = this.state
    let { categoryValue } = this.state
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
            {/* <Dragger {...dragprop} className="height-300 d-block mb-3">
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from uploading company data
                  or other band files
                </p>
              </Dragger> */}

            <div className="clearfix">
              <Upload
                action="//jsonplaceholder.typicode.com/posts/"
                listType="picture-card"
                fileList={this.fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {/* {this.fileList.length >= 3 ? null : uploadButton} */}
                {uploadButton}
              </Upload>
              <Modal visible={this.previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={this.previewImage} />
              </Modal>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-actions">
              <Button type="primary" className="mr-2">
                Save Product
              </Button>
              <Button type="default">Cancel</Button>
            </div>
          </div>
          <div className="col-lg-6">
            <Table
              columns={columns}
              dataSource={data}
              pagination={pager}
              onChange={this.handleTableChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ProductCate
