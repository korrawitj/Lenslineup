import axios from 'axios'
import * as actionCreators from '../actions/index'

export function getAllProductItem() {
  return dispatch => {
    return axios
      .get('/API/product/productItem/getAll')
      .then(response => {
        console.log(response)
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
  console.log(data)
  return dispatch => {
    return axios
      .post('/API/product/productItem/add', data)
      .then(response => {console.log(response)})
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function updateProductItem(data) {
  debugger
  return dispatch => {
    return axios
      .post('/API/product/productItem/update', { productItemData: data })
      .then(response => {})
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
