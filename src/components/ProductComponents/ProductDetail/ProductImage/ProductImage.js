import React from 'react'
import { Icon, Button, Upload, message } from 'antd'

class ProductImage extends React.Component {
  render() {
    const Dragger = Upload.Dragger
    const dragprop = {
      name: 'file',
      multiple: true,
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange(info) {
        const status = info.file.status
        if (status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`)
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`)
        }
      },
    }

    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>จัดการรูป</strong>
          </div>
        </div>
        <hr />
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <Dragger {...dragprop} className="height-300 d-block mb-3">
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">คลิกหรือลากไฟล์ วางในพื้นที่นี้เพื่ออับโหลด</p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from uploading company data
                  or other band files
                </p>
              </Dragger>
              <div>
                <Upload>
                  <Button>
                    <Icon type="upload" /> เลือกไฟล์
                  </Button>
                </Upload>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductImage
