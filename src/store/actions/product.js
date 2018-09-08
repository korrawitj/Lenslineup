import * as actionTypes from './actionType'

export const insertdata = () => {
  return {
    type: actionTypes.INSERTDATA,
  }
}

export const getdata = value => {
  return {
    type: actionTypes.GETDATA,
    val: value,
  }
}
