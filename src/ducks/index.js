import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { pendingTasksReducer } from 'react-redux-spinner'
import app from './app'
import login from './login'
import productcategoryReducer from '../store/reducers/productcategory'
import master from '../store/reducers/master'
import product from '../store/reducers/product'
import productItem from '../store/reducers/productItem'
import productPackage from '../store/reducers/productPackage'
import productInclude from '../store/reducers/productinclude'
import orderDetail from '../store/reducers/order'
export default combineReducers({
  routing: routerReducer,
  pendingTasks: pendingTasksReducer,
  app,
  login,
  pcr: productcategoryReducer,
  master: master,
  product: product,
  productItemData: productItem,
  productPackage: productPackage,
  productInclude: productInclude,
  orderDetail: orderDetail,
})
