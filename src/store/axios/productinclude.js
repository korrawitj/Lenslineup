import axios from 'axios'
import * as actionCreators from '../actions/index'

export function getProductInclude(Id) {
  return dispatch => {
    return axios
      .post('/API/product/productInclude/get', { Id: Id })
      .then(response => {
        dispatch(actionCreators.getProductInclude(response.data.productIncludeData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function addProductInclude(data) {
  console.log(data)
  return dispatch => {
    return axios
      .post('/API/product/productInclude/add', data)
      .then(response => {console.log(response)})
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function updateProductInclude(data) {
  debugger
  return dispatch => {
    return axios
      .post('/API/product/productInclude/update', { productIncludeData: data })
      .then(response => {})
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function deleteProductInclude(ProductID, ItemID) {
  return dispatch => {
    return axios
      .post('/API/product/productInclude/delete', { ProductID: ProductID, ItemID: ItemID })
      .then(response => {})
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}
