const successNotificationReducer = (state = null, action) => {
    switch(action.type){
        case 'SET_SUCCESS_NOTIFICATION':
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
export const setSuccessNotification = (text, showTime) => {
    return async dispatch => {
        dispatch({
            type: 'SET_SUCCESS_NOTIFICATION',
            data: {
                text,
                timer: setTimeout(() => {
                    dispatch(removeSuccessNotification())
                }, showTime)
            }
        })
    }
}

export const removeSuccessNotification = () => {
    return async dispatch => {
        dispatch({
            type: 'REMOVE_NOTIFICATION'
        })
    }
}

export default successNotificationReducer