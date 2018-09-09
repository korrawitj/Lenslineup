import axios from 'axios'
import * as actionCreators from '../actions/index'

export function getAllDataHoliday() {
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

export function getAllDataHolidayShop() {
  return dispatch => {
    return axios
      .get('/api/masterHoliday/getAllHolidayShop')
      .then(response => {
        dispatch(actionCreators.getdata(response.data.holidayShopData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function getAllDataManage() {
  return dispatch => {
    return axios
      .get('/api/masterHoliday/getAllMasterManageRecurring')
      .then(response => {
        dispatch(actionCreators.getdata(response.data.manageRecurringData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

// export function getAllDataPickup() {
//     return dispatch => {
//         return axios
//             .get('/api/masterHoliday/getAllHolidayShop')
//             .then(response => {
//                 dispatch(actionCreators.getdata(response.data.holidayShopData))
//             })
//             .catch(error => {
//                 console.log('Error axios ' + error)
//             })
//     }
// }