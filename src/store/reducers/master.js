import * as actionTypes from '../actions/actionType';
import { updateObject } from '../utility';

const initialState = {
    holidayData: [],
    holidayShopData: [],
    manageRecurringData: [],
    // holidayData: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.HOLIDAYGETDATA:
            return updateObject(state, { holidayData: action.val });
        case actionTypes.HOLIDAYSHOPGETDATA:
            return updateObject(state, { holidayShopData: action.val });
        case actionTypes.HOLIDAYGETDATA:
            return updateObject(state, { MANAGEGETDATA: action.val });
        case actionTypes.HOLIDAYGETDATA:
            return updateObject(state, { PICKUPGETDATA: action.val });
        default:
            return state
    }
}

export default reducer;
