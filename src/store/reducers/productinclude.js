import * as actionTypes from '../actions/actionType'
import { updateObject } from '../utility'

const initialState = {
    productIncludeData: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GETPRODUCTINCLUDE:
      return updateObject(state, { productIncludeData: action.val })
    case actionTypes.ADDPRODUCTINCLUDE:
      return updateObject(state, { productIncludeData: action.val })
    case actionTypes.UPDATEPRODUCTINCLUDE:
      return updateObject(state, { productIncludeData: action.val })
    case actionTypes.DELETEPRODUCTINCLUDE:
      return updateObject(state, { productIncludeData: action.val })
    default:
      return state
  }
}

export default reducer
