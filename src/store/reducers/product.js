import * as actionTypes from '../actions/actionType'
import { updateObject, updateObjectArray } from '../utility'

const initialState = {
  productData: [],
  productCate: [],
  productItemData: [],
  productIncludeData: [],
  productItemDataAll: [],
  fileData: [],
  productBrand: [],
  productDataID: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GETALLPRODUCT:
      return updateObject(state, { productData: action.val })
    case actionTypes.GETPRODUCT:
      return updateObject(state, { productDataID: action.val })
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
    case actionTypes.UPLOADIMAGEPRODUCT:
      return updateObject(state, { fileData: action.val })
    case actionTypes.GETALLPRODUCTBRAND:
      return updateObject(state, { productBrand: action.val })
    default:
      return state
  }
}

export default reducer
