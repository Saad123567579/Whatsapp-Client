import cases from "./Constants";
export const initialState = {
    userinfo:undefined,
    newuser:undefined
}

const reducer = (state,action) => {
    switch(action.type){
        case cases.SET_USER_INFO:
            return {...state,userInfo:action.userInfo}
        case cases.SET_NEW_USER_INFO:
            return {...state,newuser:action.newuser}    




        default:return state;
    }
}

export default reducer

