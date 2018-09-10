import * as actionTypes from './actionType'

export const getAllProductItem = value => {
  return {
    type: actionTypes.GETALLPRODUCTITEM,
    val: value,
  }
}

export const getProductItem = value => {
  return {
    type: actionTypes.GETPRODUCTITEM,
    val: value,
  }
}

export const addProductItem = value => {
  return {
    type: actionTypes.ADDPRODUCTITEM,
  }
}

export const updateProductItem = value => {
  return {
    type: actionTypes.UPDATEPRODUCTITEM,
  }
}
