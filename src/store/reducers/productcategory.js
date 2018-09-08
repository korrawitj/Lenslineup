import * as actionTypes from '../actions/actionType'
import { updateObject } from '../utility';

const initialState = {
  new_color: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INSERTDATA:
      return state
    case actionTypes.GETDATA:
      return updateObject(state, action.val);

    default:
      return state
  }
}

export default reducer
