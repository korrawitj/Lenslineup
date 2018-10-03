import * as actionTypes from '../actions/actionType'
import { updateObject } from '../utility'

const initialState = {
  orderDetailData: {
    productData: [
      {
        productName: null,
        productCopy: null,
        productSerial: null,
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null,
        rentCost: null,
      },
    ],
    startDate: null,
    startTime: null,
    endData: null,
    endTime: null,
    totalDay: null,
    totalRent: null,
    garunteeCost: null,
    recieveLocation: null,
    returnLocation: null,
    coupon: null,
  },
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
