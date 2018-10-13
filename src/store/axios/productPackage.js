import axios from 'axios'
import * as actionCreators from '../actions/index'

export function getAllProductPackage() {
  return dispatch => {
    return axios
      .get('/API/product/productPackage/getAll')
      .then(response => {
        dispatch(actionCreators.getAllProductPackage(response.data.productPackageData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function getAllProduct() {
  return dispatch => {
    return axios
      .get('/API/product/getAll')
      .then(response => {
        dispatch(actionCreators.getAllOfProductPackage(response.data.productData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}
