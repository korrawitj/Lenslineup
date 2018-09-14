import * as actionTypes from '../actions/actionType'
import { updateObject } from '../utility'

const initialState = {
  holidayData: [],
  holidayShopData: [],
  manageRecurringData: [],
  masterPickupData: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HOLIDAYGETDATA:
      return updateObject(state, { holidayData: action.val })
    case actionTypes.HOLIDAYSHOPGETDATA:
      return updateObject(state, { holidayShopData : action.val })
    case actionTypes.MANAGEGETDATA:
      return updateObject(state, { manageRecurringData: action.val })
    case actionTypes.PICKUPGETDATA:
      return updateObject(state, { masterPickupData: action.val })
    case actionTypes.HOLIDAYADDDATA:
      return updateObject(state, { holidayData: action.val })
    default:
      return state
  }
}

export default reducer
