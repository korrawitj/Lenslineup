import axios from 'axios';
import * as actionCreators from '../actions/index';

export function getData() {
    return (dispatch) => {
        return axios.get('/API/category/getAll').then((response) => {
            dispatch(actionCreators.getdata(response.data.new_color));
        })
    }
}