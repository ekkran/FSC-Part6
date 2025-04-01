import { createSlice } from "@reduxjs/toolkit"

const notificationReducer = createSlice({
  name:'notification',
  initialState : '',
  reducers:{
    setNotification(state, action){
      return action.payload
    },
    removeNotification(){
      return ''
    }
  }
})

export const { setNotification, removeNotification} = notificationReducer.actions

export const notify = (content, timeout) => {
  return async dispatch => {
    dispatch(setNotification(content))
    setTimeout(() => {
      dispatch(removeNotification)
    }, timeout * 1000);
  }
}

export default notificationReducer.reducer