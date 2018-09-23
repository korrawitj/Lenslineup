import React from 'react'
import { Upload, Icon, Modal } from 'antd'
import * as actionCreators from '../../../../store/actions/index'
import { connect } from 'react-redux'
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
class PicturesWall extends React.Component {
  state = {
    NewFileList: [],
    previewVisible: false,
    previewImage: '',
    fileList: [],
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }
  handleChange = info => {
    this.setState({ NewFileList: info.fileList })
    // console.log(this.state.NewFileList)
    // console.log(info.fileList)
    info.fileList.forEach(x => {
      getBase64(x.originFileObj, imageUrl => {
        console.log(x)
        this.setState({
          imageUrl,
        })
      })
      console.log(this.state.imageUrl)
    })

    // this.props.onUpload({ImageSource:this.state.imageUrl})
  }
  // handleChange = ({ fileList }) => {
  //   this.setState({ fileList })
  //   this.props.onUpload(this.state.fileList)
  // }

  render() {
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div className="clearfix">
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
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
    )
  }
}

const mapStateToProps = state => {
  return {
    productItemData: state.productItemData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpload: upload => dispatch(actionCreators.uploadImage(upload)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PicturesWall)
