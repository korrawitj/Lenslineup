import axios from 'axios'
import * as actionCreators from '../actions/index'

export function getAllProductItem() {
  return dispatch => {
    return axios
      .get('/API/product/productItem/getAll')
      .then(response => {
        console.log(response.data)
        dispatch(actionCreators.getAllProductItem(response.data.productItemData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}
