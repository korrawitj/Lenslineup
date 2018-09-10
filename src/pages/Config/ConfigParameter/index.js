import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ManageRecurring from './ManageRecurring/index'
import HolidayShop from './HolidayShop/index'
import Holiday from './Holiday/index'
import PickUp from './Pickup/index'
class Configuration extends React.Component {
  static defaultProps = {
    pathName: 'Configuration',
    roles: ['agent', 'administrator'],
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Configuration" />
        <Holiday />
        <HolidayShop />
        <ManageRecurring />
        <PickUp />
      </Page>
    )
  }
}

export default Configuration
