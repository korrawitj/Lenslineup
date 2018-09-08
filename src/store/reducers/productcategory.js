import * as actionTypes from '../actions/actionType'
import { updateObject } from '../utility'

const initialState = {
  new_color: 'red',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INSERTDATA:
      return state
    case actionTypes.GETDATA:
      console.log(action.val)
      return updateObject(state, { new_color: action.val });
    default:
      return state
  }
}

export default reducer
