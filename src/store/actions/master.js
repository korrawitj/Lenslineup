import * as actionTypes from './actionType'

export const holidaygetdata = value => {
  return {
    type: actionTypes.HOLIDAYGETDATA,
    val: value,
  }
}

export const holidayshopgetdata = value => {
  return {
    type: actionTypes.HOLIDAYSHOPGETDATA,
    val: value,
  }
}

export const managegetdata = value => {
  return {
    type: actionTypes.MANAGEGETDATA,
    val: value,
  }
}

export const pickupgetdata = value => {
  return {
    type: actionTypes.PICKUPGETDATA,
    val: value,
  }
}

export const holidayadddata = value => {
  return {
    type: actionTypes.HOLIDAYADDDATA,
    val: value,
  }
}
