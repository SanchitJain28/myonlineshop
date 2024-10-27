import {createSlice} from"@reduxjs/toolkit";

const initialState={
    alerts:[{isalert:"false",msg:"sasa"}],
    authentication:{
        data:null,
        isRegistered:undefined,
        isLogin:undefined
    }
}

export const todoSlice=createSlice({
    name:"alert",
    initialState,
    reducers:{
        UpdateAlert:(state,action)=>{
            const myalert={
                isalert:action.payload.status,
                msg:action.payload.msg
            }
            state.alerts=myalert
        },
      
        
    }

})

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        doRegister:async(state,action)=>{
            const url = 'http://localhost:8080/api/createuser'
            const response = await fetch(url, {
              method: "POST",
              body: JSON.stringify({ email: action.payload, password:action.payload }),

              headers: {
                "Content-Type": "application/json",
              }
            })
            const data = await response.json();
            state.authentication={
                data:data,
                isRegistered:data.success,
                isLogin:undefined
            }
        }
        
    }
})

export const {UpdateAlert,DeactivateAlert}=todoSlice.actions

export default todoSlice.reducer
