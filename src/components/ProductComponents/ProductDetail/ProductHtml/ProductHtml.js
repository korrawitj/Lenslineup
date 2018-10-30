import React from 'react'
import { Input, Select, Form } from 'antd'
const FormItem = Form.Item
const { TextArea } = Input
class ProductHtml extends React.Component {
  render() {
    const productData = []
    const { form } = this.props
    const { getFieldDecorator } = form
    return (
      <div className="row">
        <div className="col-md-7">
          <div className="card">
            <div className="card-header">
              <div className="utils__title">
                <strong>ส่วนแก้ไขข้อมูลหน้า Front END ทุกอย่าง</strong>
              </div>
            </div>
            <hr />
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 labelcenter">
                  <label>Display Name </label>
                </div>
                <div className="col-md-8 inputcenter">
                  <FormItem className="inputcenter">
                    {getFieldDecorator('productData.DisplayName', {
                      initialValue: productData.DisplayName,
                    })(<TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
                  </FormItem>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-4 labelcenter">
                  <label>Meta Title Tag </label>
                </div>
                <div className="col-md-8 inputcenter">
                  <FormItem className="inputcenter">
                    {getFieldDecorator('productData.MetaTitle', {
                      initialValue: productData.MetaTitle,
                    })(<TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
                  </FormItem>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-4 labelcenter">
                  <label>Meta Description Tag </label>
                </div>
                <div className="col-md-8 inputcenter">
                  <FormItem className="inputcenter">
                    {getFieldDecorator('productData.MetaDescription', {
                      initialValue: productData.MetaDescription,
                    })(<TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
                  </FormItem>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-4 labelcenter">
                  <label>Permalink </label>
                </div>
                <div className="col-md-8 inputcenter">
                  <FormItem className="inputcenter">
                    {getFieldDecorator('productData.Permalink', {
                      initialValue: productData.Permalink,
                    })(<Input />)}
                  </FormItem>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-4 labelcenter">
                  <label>Description </label>
                </div>
                <div className="col-md-8 inputcenter">
                  <FormItem className="inputcenter">
                    {getFieldDecorator('productData.Description', {
                      initialValue: productData.Description,
                    })(<TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
                  </FormItem>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-4 labelcenter">
                  <label>Description1 </label>
                </div>
                <div className="col-md-8 inputcenter">
                  <FormItem className="inputcenter">
                    {getFieldDecorator('productData.Description1', {
                      initialValue: productData.Description1,
                    })(<TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
                  </FormItem>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-4 labelcenter">
                  <label>ข้อมูลในสัญญาเช่าเพิ่มเติม / ข้อมูลการตรวจรับของ </label>
                </div>
                <div className="col-md-8 inputcenter">
                  <FormItem className="inputcenter">
                    {getFieldDecorator('productData.Note', {
                      initialValue: productData.Note,
                    })(<TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
                  </FormItem>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductHtml
