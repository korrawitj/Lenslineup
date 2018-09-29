import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import OrderList from './OrderList'

class ProductPage extends React.Component {
  static defaultProps = {
    pathName: 'รายการหน้าร้าน',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="รายการหน้าร้าน" />
        <OrderList />
      </Page>
    )
  }
}

export default ProductPage
