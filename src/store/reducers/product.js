import * as actionTypes from '../actions/actionType'
import { updateObject, updateObjectArray } from '../utility'

const initialState = {
  productData: [],
  productCate: [],
  productItemData: [],
  productIncludeData: [],
  productItemDataAll: [],
}

const reducer = (state = initialState, action) => {
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
    case actionTypes.GETALLPRODUCTITEM:
      return updateObject(state, { productItemDataAll: action.val })
    case actionTypes.GETPRODUCTITEM:
      return {
        ...state,
        productItemData: [...state.productItemData.concat(action.val)],
      }
    case actionTypes.GETPRODUCTINCLUDE:
      return updateObject(state, { productIncludeData: action.val })
    default:
      return state
  }
}

export default reducer
