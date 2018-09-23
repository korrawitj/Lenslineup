import React from 'react'
import { Upload, Icon, Modal } from 'antd'
import * as actionCreators from '../../../../store/actions/index'
import { connect } from 'react-redux'

class PicturesWall extends React.Component {
  render() {
    const { previewVisible, previewImage, fileList, handleChange, handlePreview } = this.props
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
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {/* {fileList.length >= 3 ? null : uploadButton} */}
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
    fileData: state.fileData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpload: (upload) => dispatch(actionCreators.uploadImage(upload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PicturesWall);
