import axios from 'axios'
import * as actionCreators from '../actions/index'

export function getALL() {
    return dispatch => {
      return axios
        .get('/API/category/getAll')
        .then(response => {
          dispatch(actionCreators.getAllData(response.data.productData))
        })
        .catch(error => {
          console.log('Error axios ' + error)
        })
    }
}

export function get(Id) {
  return dispatch => {
    return axios
      .ProductId('/API/category/getAll',{ProductId:Id})
      .then(response => {
        dispatch(actionCreators.getdata(response.data.categoryData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function Add() {
  return dispatch => {
    return axios
      .get('/API/category/getAll')
      .then(response => {
        dispatch(actionCreators.getdata(response.data.categoryData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}


export function Update() {
  return dispatch => {
    return axios
      .get('/API/category/getAll')
      .then(response => {
        dispatch(actionCreators.getdata(response.data.categoryData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function Delete() {
  return dispatch => {
    return axios
      .get('/API/category/getAll')
      .then(response => {
        dispatch(actionCreators.getdata(response.data.categoryData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}


