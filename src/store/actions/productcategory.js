import * as actionTypes from './actionType'

export const insertproductcat = value => {
  return {
    type: actionTypes.ADDPRODUCTCAT,
    val: value,
  }
}

export const getAllproductcat = value => {
  return {
    type: actionTypes.GETALLPRODUCTCAT,
    val: value,
  }
}

export const getproductcat = value => {
  return {
    type: actionTypes.GETPRODUCTCAT,
    val: value,
  }
}

export const updateproductcat = value => {
  return {
    type: actionTypes.UPDATEPRODUCTCAT,
    val: value,
  }
}

export const deleteproductcat = value => {
  return {
    type: actionTypes.DELETEPRODUCTCAT,
    val: value,
  }
}
