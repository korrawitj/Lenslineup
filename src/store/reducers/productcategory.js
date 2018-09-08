import * as actionTypes from '../actions/actionType'

const initialState = {
  Fullname: '',
  Shortname: '',
  Order: '',
  Parentcategory: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INSERTDATA:
      return state
    default:
      return state
  }
}

export default reducer
