import * as actionTypes from './actionType'

export const addData = () => {
  return {
    type: actionTypes.ADDPRODUCT,
  }
}

export const getAllData = value => {
  return {
    type: actionTypes.GETALLPRODUCT,
    val: value,
  }
}
