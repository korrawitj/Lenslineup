import axios from 'axios'
import * as actionCreators from '../actions/index'

export function getAllDataHoliday() {
  return dispatch => {
    return axios
      .get('/api/masterHoliday/getAllHoliday')
      .then(response => {
        dispatch(actionCreators.holidaygetdata(response.data.holidayData))
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
        dispatch(actionCreators.holidayshopgetdata(response.data.holidayShopData))
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
        dispatch(actionCreators.managegetdata(response.data.manageRecurringData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function getAllDataPickup() {
  return dispatch => {
    return axios
      .get('/api/masterHoliday/getAllMasterPickup')
      .then(response => {
        dispatch(actionCreators.pickupgetdata(response.data.masterPickupData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function AddDataHoliday(data) {
  return dispatch => {
    return axios
      .post('/api/masterHoliday/addHoliday', data)
      .then(response => {
        console.log(response);
        dispatch(actionCreators.holidayadddata(response.data.holidayData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}
