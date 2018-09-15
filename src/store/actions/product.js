import * as actionTypes from './actionType'

export const addData = () => {
  return {
    type: actionTypes.ADDPRODUCT,
  }
}

export const getAllProduct = value => {
  return {
    type: actionTypes.GETALLPRODUCT,
    val: value,
  }
}

export const getAllproductcate = value => {
  return {
    type: actionTypes.GETALLPRODUCTCAT,
    val: value,
  }
}
