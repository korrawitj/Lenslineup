import axios from 'axios'
import * as actionCreators from '../actions/index'

export function upDateOrderDetail(orderData) {
  return dispatch => dispatch(actionCreators.EditOrderDetail(orderData))
}

export function getAllProductOrder() {
  return dispatch => {
    return axios
      .get('/API/product/getAll')
      .then(response => {
        dispatch(actionCreators.getproductorderall(response.data.productData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function getProductCopy(data) {
  return dispatch => {
    return axios
      .post('/API/product/getProductCopy', data)
      .then(response => {
        dispatch(actionCreators.getproductcopyorder(response.data.ProductCopyData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}
