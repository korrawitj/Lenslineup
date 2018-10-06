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