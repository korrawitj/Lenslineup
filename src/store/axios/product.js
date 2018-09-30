import axios from 'axios'
import * as actionCreators from '../actions/index'

export function getAllProduct() {
  return dispatch => {
    return axios
      .get('/API/product/getAll')
      .then(response => {
        dispatch(actionCreators.getAllProduct(response.data.productData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function getAllData() {
  return dispatch => {
    return axios
      .get('/API/category/getAll')
      .then(response => {
        dispatch(actionCreators.getAllproductcat(response.data.categoryData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function getAllProductItem() {
  return dispatch => {
    return axios
      .get('/API/product/productItem/getAll')
      .then(response => {
        dispatch(actionCreators.getAllproductitemdata(response.data.productItemData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function getProductItem(data) {
  return dispatch => {
    return axios
      .post('/API/product/productItem/get', data)
      .then(response => {
        dispatch(actionCreators.getproductitemdata(response.data.productItemData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function getProductInclude(data) {
  return dispatch => {
    return axios
      .post('/API/product/productInclude/get', data)
      .then(response => {
        dispatch(actionCreators.getproductincludedata(response.data.productIncludeData))
      })
      .catch(error => {
        console.log('Error axios ' + error)
      })
  }
}

export function uploadProductPhoto(data) {
  const formData = new FormData()
  // fileList.forEach((file) => {
  //   formData.append('files[]', file);
  // });
  axios
    .post()
    .then(result => {})
    .catch(err => {})
}

// export function get(Id) {
//   return dispatch => {
//     return axios
//       .ProductId('/API/category/getAll', { ProductId: Id })
//       .then(response => {
//         dispatch(actionCreators.getdata(response.data.categoryData))
//       })
//       .catch(error => {
//         console.log('Error axios ' + error)
//       })
//   }
// }

// export function Add() {
//   return dispatch => {
//     return axios
//       .get('/API/category/getAll')
//       .then(response => {
//         dispatch(actionCreators.getdata(response.data.categoryData))
//       })
//       .catch(error => {
//         console.log('Error axios ' + error)
//       })
//   }
// }

// export function Update() {
//   return dispatch => {
//     return axios
//       .get('/API/category/getAll')
//       .then(response => {
//         dispatch(actionCreators.getdata(response.data.categoryData))
//       })
//       .catch(error => {
//         console.log('Error axios ' + error)
//       })
//   }
// }

// export function Delete() {
//   return dispatch => {
//     return axios
//       .get('/API/category/getAll')
//       .then(response => {
//         dispatch(actionCreators.getdata(response.data.categoryData))
//       })
//       .catch(error => {
//         console.log('Error axios ' + error)
//       })
//   }
// }
