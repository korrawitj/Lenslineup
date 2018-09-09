import axios from 'axios'
import * as actionCreators from '../actions/index'

export function getData() {
  return dispatch => {
    return axios
      .get('/api/masterHoliday/getAllHoliday')
      .then(response => {
        dispatch(actionCreators.getdata(response.data.holidayData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}
