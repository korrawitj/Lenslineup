import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ConfigParameter from './ConfigParameter'

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
        <ConfigParameter/>
      </Page>
    )
  }
}

export default Configuration
