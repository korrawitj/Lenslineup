import * as actionTypes from '../actions/actionType'
import { updateObject } from '../utility'

const initialState = {
  productPackageData: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GETALLPRODUCTPACKEAGE:
      return updateObject(state, { productPackageData: action.val })
    default:
      return state
  }
}

export default reducer
