import * as actionTypes from './actionType'

export const EditOrderDetail = value => {
  return {
    type: actionTypes.EDITORDERDETAIL,
    val: value,
  }
}

export const getproductorderall = value => {
  return {
    type: actionTypes.GETPRODUCTORDERALL,
    val: value,
  }
}
