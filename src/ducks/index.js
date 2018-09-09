import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { pendingTasksReducer } from 'react-redux-spinner'
import app from './app'
import login from './login'
import productcategoryReducer from '../store/reducers/productcategory'
import master from '../store/reducers/master'

export default combineReducers({
  routing: routerReducer,
  pendingTasks: pendingTasksReducer,
  app,
  login,
  pcr: productcategoryReducer,
  master: master,
})
