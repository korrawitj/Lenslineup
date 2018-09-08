import axios from 'axios'
import * as actionCreators from '../actions/index'

export function getData() {
  return dispatch => {
    return axios
      .get('/API/category/getAll')
      .then(response => {
          console.log(response)
          console.log(response.data)
        dispatch(actionCreators.getdata(response.categoryData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}
