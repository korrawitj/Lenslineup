import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ProductInclude from './ProductInclude'

class ProductPage extends React.Component {
  static defaultProps = {
    pathName: 'อุปกรณ์',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="อุปกรณ์" />
        <ProductInclude />
      </Page>
    )
  }
}

export default ProductPage
