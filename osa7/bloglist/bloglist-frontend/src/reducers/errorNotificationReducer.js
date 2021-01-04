const errorNotificationReducer = (state = null, action) => {
    switch(action.type){
        case 'SET_ERROR_NOTIFICATION':
            if(state !== null){
                clearTimeout(state.timer)
            }
            return action.data           
        case 'REMOVE_NOTIFICATION':
            return null
        default:
            return state
    }
}
export const setErrorNotification = (text, showTime) => {
    return async dispatch => {
        dispatch({
            type: 'SET_ERROR_NOTIFICATION',
            data: {
                text,
                timer: setTimeout(() => {
                    dispatch(removeErrorNotification())
                }, showTime)
            }
        })
    }
}

export const removeErrorNotification = () => {
    return async dispatch => {
        dispatch({
            type: 'REMOVE_NOTIFICATION'
        })
    }
}

export default errorNotificationReducer