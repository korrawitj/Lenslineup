import React from 'react'
import { Input, TreeSelect, Select, Button, Upload, Icon, message, Table, Modal } from 'antd'
import { connect } from 'react-redux'
import * as actionCreators from '../../../../store/axios/productcategory'



class ProductListAdd extends React.Component {
  state = {
    title:'test'
  }

  componentDidMount() {

  }

 
  render() {
    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
          <div className="utils__title">
            <strong>เพิ่มอุปกรณ์</strong>
          </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label htmlFor="product-edit-title">อุปกรณ์</label>
                    <Input id="product-edit-title" placeholder="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-category">ประเภท</label>
                    <Input id="product-edit-category" placeholder="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-price">ราคาเช่า1วัน</label>
                    <Input id="product-edit-price" placeholder="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-day">จำนวนวันขั้นต่ำที่ให้เช่า</label>
                    <Input id="product-edit-day" placeholder="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-title">แบบที่1</label>
                    <Input id="product-edit-title" placeholder="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-title">แบบที่2</label>
                    <Input id="product-edit-title" placeholder="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-title">ราคาในสัญญา</label>
                    <Input id="product-edit-title" placeholder="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-title">Note</label>
                    <Input id="product-edit-title" placeholder="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-title">QR ID</label>
                    <Input id="product-edit-title" placeholder="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-title">สถานะหน้าเว็บ</label>
                    <Input id="product-edit-title" placeholder="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-title">สถานะคิวจอง</label>
                    <Input id="product-edit-title" placeholder="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-title">การรับ</label>
                    <Input id="product-edit-title" placeholder="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product-edit-title">การคืน</label>
                    <Input id="product-edit-title" placeholder="" />
                  </div>
                </div>
                
              </div>
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
)(ProductListAdd)
