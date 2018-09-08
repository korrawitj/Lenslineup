import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ProductCate from './ProductsCategory'

class ProductPage extends React.Component {
  static defaultProps = {
    pathName: 'ประเภท',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="ประเภทอุปกรณ์" />
        <ProductCate />
      </Page>
    )
  }
}

export default ProductPage
