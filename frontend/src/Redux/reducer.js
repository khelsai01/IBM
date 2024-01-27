import { ERROR, LODING, LOGIN } from "./actionType";

const initState={
    isLoading:false,
    isError:false,
    isAuth:false,
    token:"",
    bugs:[]
}

export const reducer = (state=initState,{type,payload})=>{
    switch(type){

        case LODING:{
            return{...state,isLoading:true}
        }
        case ERROR:{
            return {...state,isLoading:false,isError:true}
        }
        case LOGIN :{
            return{...state, isLoading:false,isAuth:true}
        }
        default:return state;
    }
}