import * as actionTypes from '../actions/actionType'
import { updateObject } from '../utility'

const initialState = {
    productItemData : [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GETALLPRODUCTITEM:
      return updateObject(state, { productItemData : action.val })
    case actionTypes.GETPRODUCTITEM:
      return updateObject(state, { productItemData : action.val })
    case actionTypes.ADDPRODUCTITEM:
      return updateObject(state, { productItemData : action.val })
    case actionTypes.UPDATEPRODUCTITEM:
      return updateObject(state, { productItemData : action.val })
    case actionTypes.DELETEPRODUCTITEM:
      return updateObject(state, { productItemData : action.val })
    default:
      return state
  }
}

export default reducer
