import * as actionCreators from '../actions/index'

export function upDateOrderDetail(orderData) {
  return dispatch => dispatch(actionCreators.EditOrderDetail(orderData))
}
