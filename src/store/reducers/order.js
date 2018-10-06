import * as actionTypes from '../actions/actionType'
import { updateObject } from '../utility'

const initialState = {
  orderDetailData: [],
  productData: [],
  productCopy: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EDITORDERDETAIL:
      return updateObject(state, { orderDetailData: action.val })
    case actionTypes.GETPRODUCTORDERALL:
      return updateObject(state, { productData: action.val })
    case actionTypes.GETPRODUCTCOPYORDER:
      return updateObject(state, { productCopy: action.val })
    default:
      return state
  }
}

export default reducer
