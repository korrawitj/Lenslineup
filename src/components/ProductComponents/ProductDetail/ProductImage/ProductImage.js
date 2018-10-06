import React from 'react'
import { Upload, Icon, Modal } from 'antd'
import * as actionCreators from '../../../../store/actions/index'
import { connect } from 'react-redux'
class ProductImage extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    datasend: [],
  }

  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }
  handleChange = data => {
    this.setState({ fileList: data.fileList })
    this.props.onUpload({ productPhoto: this.state.fileList })
  }

  render() {
    let phoductPhoto = this.props.defaultFileList.phoductPhoto
    // console.log(this.props.defaultFileList)
    if (phoductPhoto == null || undefined) {
      phoductPhoto = []
    }
    const props2 = {
      listType: 'picture-card',
      defaultFileList: [...phoductPhoto],
      className: 'upload-list-inline',
      onPreview: this.handlePreview,
      onChange: this.handleChange,
      //fileList:fileList
    }

    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>จัดการรูป</strong>
          </div>
        </div>
        <hr />
        <div className="card-body">
          <div className="clearfix">
            <Upload {...props2}>{uploadButton}</Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    productData: state.productData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpload: upload => dispatch(actionCreators.uploadImageProduct(upload)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductImage)
