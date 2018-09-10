import * as actionTypes from './actionType'

export const getAllProductPackage = value => {
  return {
    type: actionTypes.GETALLPRODUCTPACKEAGE,
    val: value,
  }
}

// export const getProductPackage = value => {
//   return {
//     type: actionTypes.GETPRODUCTPACKEAGE,
//     val: value,
//   }
// }

// export const addProductPackage = value => {
//   return {
//     type: actionTypes.ADDPRODUCTPACKEAGE,
//   }
// }

// export const updateProductPackage = value => {
//   return {
//     type: actionTypes.UPDATEPRODUCTPACKEAGE,
//   }
// }
