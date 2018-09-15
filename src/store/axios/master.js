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

export function AddDataHoliday(data) {
  return dispatch => {
    return axios
      .post('/api/masterHoliday/addHoliday', data)
      .then(response => {
        //  dispatch(actionCreators.holidayadddata(response.data.holidayData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function updateHolidayData(data) {
  debugger
  return dispatch => {
    return axios
      .post('/api/masterHoliday/updateHoliday', { holidayData: data })
      .then(response => {
        //  getAllDataHoliday()
        //dispatch(actionCreators.holidayadddata(response.data.holidayData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function deleteHolidayData(Id) {
  return dispatch => {
    return axios
      .post('/api/masterHoliday/deleteHoliday', { holidayID: Id })
      .then(response => {
        getAllDataHoliday()
        //dispatch(actionCreators.holidayadddata(response.data.holidayData))
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

export function addHolidayShop(data) {
  return dispatch => {
    return axios
      .post('/api/masterHoliday/addHolidayShop', data)
      .then(response => {
        //  dispatch(actionCreators.holidayadddata(response.data.holidayData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function deleteHolidayShop(Id) {
  return dispatch => {
    return axios
      .post('/api/masterHoliday/deleteHolidayShop', { Id: Id })
      .then(response => {
        getAllDataHoliday()
        //dispatch(actionCreators.holidayadddata(response.data.holidayData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function updateHolidayShop(data) {
  debugger
  return dispatch => {
    return axios
      .post('/api/masterHoliday/updateHolidayShop', { holidayShopData: data })
      .then(response => {
        //  dispatch(actionCreators.holidayadddata(response.data.holidayData))
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
        console.log(response)
        dispatch(actionCreators.managegetdata(response.data.manageRecurringData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function addMasterManageRecurring(data) {
  return dispatch => {
    return axios
      .post('/api/masterHoliday/addMasterManageRecurring', { manageRecurringData: data })
      .then(response => {})
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function updateMasterManageRecurring(data) {
  return dispatch => {
    return axios
      .post('/api/masterHoliday/updateMasterManageRecurring', { manageRecurringData: data })
      .then(response => {})
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function deleteMasterManageRecurring(Id) {
  return dispatch => {
    return axios
      .post('/api/masterHoliday/deleteMasterManageRecurring', { Id: Id })
      .then(response => {})
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

export function AddDataPickup(data) {
  return dispatch => {
    return axios
    .post('/api/masterHoliday/AddMasterPickup', { masterPickupData: data })
      .then(response => {
        console.log(response)
        dispatch(actionCreators.pickupadddata(response.data.masterPickupData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}
export function getAllMasterType() {
  return dispatch => {
    return axios
      .get('/api/masterHoliday/getAllMasterType')
      .then(response => {
        dispatch(actionCreators.masterTypeData(response.data.masterTypeData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}
