import * as actionTypes from './actionType'

export const getProductInclude = value => {
  return {
    type: actionTypes.GETPRODUCTINCLUDE,
    val: value,
  }
}

export const addProductInclude = value => {
  return {
    type: actionTypes.ADDPRODUCTINCLUDE,
    val: value,
  }
}

export const updateProductInclude = value => {
  return {
    type: actionTypes.UPDATEPRODUCTINCLUDE,
    val: value,
  }
}

export const deleteProductInclude = value => {
  return {
    type: actionTypes.DELETEPRODUCTINCLUDE,
    val: value,
  }
}
