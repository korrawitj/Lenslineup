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
