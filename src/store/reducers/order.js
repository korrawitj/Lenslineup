import * as actionTypes from '../actions/actionType'
import { updateObject } from '../utility'

const initialState = {
  orderDetailData: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EDITORDERDETAIL:
      return updateObject(state, { orderDetailData: action.val })
    default:
      return state
  }
}

export default reducer
