import * as actionTypes from '../actions/actionType'
import { updateObject } from '../utility'

const initialState = {
  productData: [],
  productCate: [],
}

const reducer = (state = initialState, action) => {
  console.log(action.val)
  switch (action.type) {
    case actionTypes.GETALLPRODUCT:
      return updateObject(state, { productData: action.val })
    case actionTypes.GETPRODUCT:
      return updateObject(state, { productData: action.val })
    case actionTypes.ADDPRODUCT:
      return updateObject(state, { productData: action.val })
    case actionTypes.UPDATEPRODUCT:
      return updateObject(state, { productData: action.val })
    case actionTypes.DELETEPRODUCT:
      return updateObject(state, { productData: action.val })
    case actionTypes.GETALLPRODUCTCAT:
      return updateObject(state, { productCate: action.val })
    default:
      return state
  }
}

export default reducer
