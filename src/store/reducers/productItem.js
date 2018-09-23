import * as actionTypes from '../actions/actionType'
import { updateObject } from '../utility'

const initialState = {
  productItemData: [],
  fileData: [],
}

const reducer = (state = initialState, action) => {
  console.log(action.actionTypes)
  switch (action.type) {
    case actionTypes.GETALLPRODUCTITEM:
      return updateObject(state, { productItemData: action.val })
    case actionTypes.GETPRODUCTITEM:
      return updateObject(state, { productItemData: action.val })
    case actionTypes.ADDPRODUCTITEM:
      return updateObject(state, { productItemData: action.val })
    case actionTypes.UPDATEPRODUCTITEM:
      return updateObject(state, { productItemData: action.val })
    case actionTypes.DELETEPRODUCTITEM:
      return updateObject(state, { productItemData: action.val })
    case actionTypes.UPLOADIMAGE:
      console.log(action.val)
      return updateObject(state, { fileData: action.val })
    default:
      return state
  }
}

export default reducer
