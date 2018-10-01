export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues,
  }
}
export const updateObjectArray = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    updatedValues,
  }
}
