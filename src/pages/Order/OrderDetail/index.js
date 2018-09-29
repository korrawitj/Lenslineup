import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import OrderList from './OrderDetail'

class ProductPage extends React.Component {
  static defaultProps = {
    pathName: 'เพิ่มรายการ',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="เพิ่มรายการ" />
        <OrderList />
      </Page>
    )
  }
}

export default ProductPage
