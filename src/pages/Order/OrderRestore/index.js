import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import OrderList from './OrderRestore'

class ProductPage extends React.Component {
  static defaultProps = {
    pathName: 'รายการคืนวันนี้',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="รายการคืนวันนี้" />
        <OrderList />
      </Page>
    )
  }
}

export default ProductPage
