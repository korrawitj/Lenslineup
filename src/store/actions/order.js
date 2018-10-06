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

export const getproductcopyorder = value => {
  return {
    type: actionTypes.GETPRODUCTCOPYORDER,
    val: value,
  }
}

export const getproductorderone = value => {
  return {
    type: actionTypes.GETPRODUCTORDERONE,
    val: value,
  }
}