import React from 'react'
import { Route } from 'react-router-dom'
import { ConnectedSwitch } from 'reactRouterConnected'
import Loadable from 'react-loadable'
import Page from 'components/LayoutComponents/Page'
import NotFoundPage from 'pages/DefaultPages/NotFoundPage'
import HomePage from 'pages/DefaultPages/HomePage'

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => null,
  })

const loadableRoutes = {
  // Default Pages
  '/login': {
    component: loadable(() => import('pages/DefaultPages/LoginPage')),
  },
  '/empty': {
    component: loadable(() => import('pages/DefaultPages/EmptyPage')),
  },

  // Dashboards
  '/dashboard': {
    component: loadable(() => import('pages/Dashboard/DashboardAlphaPage')),
  },

  '/product/list': {
    component: loadable(() => import('pages/Product/ProductList')),
  },

  '/product/list/detail': {
    component: loadable(() => import('pages/Product/ProductDetail')),
  },

  '/product/item': {
    component: loadable(() => import('pages/Product/ProductItem')),
  },

  '/product/set': {
    component: loadable(() => import('pages/Product/ProductSet')),
  },

  '/product/Category': {
    component: loadable(() => import('pages/Product/ProductCategory')),
  },

  '/configuration': {
    component: loadable(() => import('pages/Config/ConfigParameter')),
  },

  '/order/list': {
    component: loadable(() => import('pages/Order/OrderList')),
  },

  '/order/list/detail': {
    component: loadable(() => import('pages/Order/OrderDetail')),
  },

  '/order/receive': {
    component: loadable(() => import('pages/Order/OrderReceive')),
  },

  '/order/restore': {
    component: loadable(() => import('pages/Order/OrderRestore')),
  },
}

class Routes extends React.Component {
  timeoutId = null

  componentDidMount() {
    this.timeoutId = setTimeout(
      () => Object.keys(loadableRoutes).forEach(path => loadableRoutes[path].component.preload()),
      5000, // load after 5 sec
    )
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
  }

  render() {
    return (
      <ConnectedSwitch>
        <Route exact path="/" component={HomePage} />
        {Object.keys(loadableRoutes).map(path => {
          const { exact, ...props } = loadableRoutes[path]
          props.exact = exact === void 0 || exact || false // set true as default
          return <Route key={path} path={path} {...props} />
        })}
        <Route
          render={() => (
            <Page>
              <NotFoundPage />
            </Page>
          )}
        />
      </ConnectedSwitch>
    )
  }
}

export { loadableRoutes }
export default Routes
