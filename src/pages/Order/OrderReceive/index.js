import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import OrderList from './OrderReceive'

class ProductPage extends React.Component {
  static defaultProps = {
    pathName: 'รายการรับวันนี้',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="รายการรับวันนี้" />
        <OrderList />
      </Page>
    )
  }
}

export default ProductPage
