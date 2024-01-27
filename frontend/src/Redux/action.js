import axios from "axios"
import { ERROR, LODING, LOGIN, POST_BUG, REGISTER } from "./actionType"

const URL = "http://localhost:8080/api";


export const getLogin = (obj) => (dispatch) => {

    dispatch({ type: LODING })
    return axios.post(`${URL}/login`, obj).then((res) => {
        console.log(res.data)
        dispatch({ type: LOGIN })
        localStorage.setItem("bugtoken", (res.data.token))
    }).catch(() => {
        dispatch({ type: ERROR })
    })

}

export const getRegister = (obj) => (dispatch) => {

    dispatch({ type: LODING })

    axios.post(`${URL}/register`, obj).then((res) => {
        console.log(res.data);
        dispatch({ type: REGISTER })

    }).catch(() => {
        dispatch({ type: ERROR })
    })

}

export const addBug=(obj)=>(dispatch)=>{

    dispatch({ type: LODING })
   
    axios.post(`${URL}/bugs`, obj).then((res) => {
        console.log(res.data);
        dispatch({ type:POST_BUG })
    })
    .catch(() => {
        dispatch({ type: ERROR })
    })
}