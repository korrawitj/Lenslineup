import * as actionTypes from './actionType'

export const masterinsertdata = () => {
  return {
    type: actionTypes.INSERTDATA,
  }
}

export const mastergetdata = value => {
  return {
    type: actionTypes.GETDATA,
    val: value,
  }
}
