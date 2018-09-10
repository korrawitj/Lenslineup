import * as actionTypes from '../actions/actionType'
import { updateObject } from '../utility'

const initialState = {
  categoryData: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADDPRODUCTCAT:
      return state
    case actionTypes.GETALLPRODUCTCAT:
      return updateObject(state, { categoryData: action.val })
    default:
      return state
  }
}

export default reducer
