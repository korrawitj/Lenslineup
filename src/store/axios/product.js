import axios from 'axios'
import * as actionCreators from '../actions/index'

export function getAllProduct() {
  return dispatch => {
    return axios
      .get('/API/product/getAll')
      .then(response => {
        dispatch(actionCreators.getAllProduct(response.data.productData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function getAllData() {
  return dispatch => {
    return axios
      .get('/API/category/getAll')
      .then(response => {
        dispatch(actionCreators.getAllproductcat(response.data.categoryData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function getAllProductItem() {
  return dispatch => {
    return axios
      .get('/API/product/productItem/getAll')
      .then(response => {
        dispatch(actionCreators.getAllproductitemdata(response.data.productItemData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function getProductItem(data) {
  return dispatch => {
    return axios
      .post('/API/product/productItem/get', data)
      .then(response => {
        dispatch(actionCreators.getproductitemdata(response.data.productItemData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function getProductInclude(data) {
  return dispatch => {
    return axios
      .post('/API/product/productInclude/get', data)
      .then(response => {
        dispatch(actionCreators.getproductincludedata(response.data.productIncludeData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function addProduct(data) {
  return dispatch => {
    return axios
      .post('/API/product/add', data)
      .then(response => {
        dispatch(actionCreators.addproduct(response.data.productData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function updateProduct(data) {
  return dispatch => {
    return axios
      .post('/API/product/update', data)
      .then(response => {
        dispatch(actionCreators.updateproduct(response.data.productData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function deleteProduct(data) {
  return dispatch => {
    return axios
      .post('/API/product/delete', data)
      .then(response => {
        dispatch(actionCreators.deleteproduct(response.data.productData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}