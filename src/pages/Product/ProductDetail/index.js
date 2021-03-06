import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ProductDetail from './ProductDetail'

class ProductPage extends React.Component {
  static defaultProps = {
    pathName: 'อุปกรณ์',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="จัดการอุปกรณ์" />
        <ProductDetail
          productID={
            this.props.location.state === undefined
              ? null
              : this.props.location.state.productData['ProductID']
          }
        />
      </Page>
    )
  }
}

export default ProductPage
