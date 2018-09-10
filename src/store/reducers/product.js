import * as actionTypes from '../actions/actionType'
import { updateObject } from '../utility'

const initialState = {
    getAllProductData : [],
    productData : null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GETALLPRODUCT:
      return updateObject(state, { getAllProductData : action.val })
    case actionTypes.GETPRODUCT:
      return updateObject(state, { productData: action.val })
    case actionTypes.ADDPRODUCT:
      return updateObject(state, { productData: action.val })
    case actionTypes.UPDATEPRODUCT:
      return updateObject(state, { productData: action.val })
    case actionTypes.DELETEPRODUCT:
      return updateObject(state, { productData: action.val })  
    default:
      return state
  }
}

export default reducer