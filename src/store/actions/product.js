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

export const getAllproductitemdata = value => {
  return {
    type: actionTypes.GETALLPRODUCTITEM,
    val: value,
  }
}

export const getproductitemdata = value => {
  return {
    type: actionTypes.GETPRODUCTITEM,
    val: value,
  }
}

export const getproductincludedata = value => {
  return {
    type: actionTypes.GETPRODUCTINCLUDE,
    val: value,
  }
}
