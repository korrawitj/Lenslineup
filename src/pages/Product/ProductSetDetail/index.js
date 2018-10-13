import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ProductSetDetail from './ProductSetDetail'

class ProductSetPage extends React.Component {
  static defaultProps = {
    pathName: 'อุปกรณ์จัดชุด',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="จัดการอุปกรณ์จัดชุด" />
        <ProductSetDetail />
      </Page>
    )
  }
}

export default ProductSetPage
