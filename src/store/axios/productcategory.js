import axios from 'axios'
import * as actionCreators from '../actions/index'

export function getData() {
    return dispatch => {
        return axios.get('/json/color/random')
            .then(response => {
                dispatch(actionCreators.getdata(response.data.new_color))
            })
            .catch(error => {
                console.log('Error axios ' + error)
            })
    }
}
