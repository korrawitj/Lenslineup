import axios from 'axios'
import * as actionCreators from '../actions/index'

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

export function UploadImages(data) {
  return dispatch => {
    let formdat = new FormData()
    formdat.append('file', data)
    formdat.append('name', 'productPhoto')
    return axios
      .post('/API/product/uploadImages', formdat)
      .then(response => {
        debugger
        // dispatch(actionCreators.getdata(response.data.categoryData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}
