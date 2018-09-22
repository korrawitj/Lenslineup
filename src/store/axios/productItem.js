import axios from 'axios'
import * as actionCreators from '../actions/index'

export function getAllProductItem() {
  return dispatch => {
    return axios
      .get('/API/product/productItem/getAll')
      .then(response => {
        dispatch(actionCreators.getAllProductItem(response.data.productItemData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function getProductItem(Id) {
  return dispatch => {
    return axios
      .post('/API/product/productItem/get', { Id: Id })
      .then(response => {
        dispatch(actionCreators.getProductItem(response.data.productItemData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function addProductItem(data) {
  return dispatch => {
    return axios
      .post('/API/product/productItem/add', data)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function updateProductItem(data) {
  return dispatch => {
    return axios
      .post('/API/product/productItem/update', data)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function deleteProductItem(Id) {
  return dispatch => {
    return axios
      .post('/API/product/productItem/delete', { Id: Id })
      .then(response => {})
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}
