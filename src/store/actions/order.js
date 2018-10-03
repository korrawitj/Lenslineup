import * as actionTypes from './actionType'

export const EditOrderDetail = value => {
  return {
    type: actionTypes.EDITORDERDETAIL,
    val: value,
  }
}
