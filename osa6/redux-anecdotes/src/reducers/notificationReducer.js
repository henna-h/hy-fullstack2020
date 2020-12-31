const initialState = null

export const setNotification = (text, showTime) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {
                text,
                timer: setTimeout(() => {
                    dispatch(removeNotification())
                }, showTime)
            }
        })
    }
}

export const removeNotification = () => {
    return async dispatch => {
        dispatch({
            type: 'REMOVE_NOTIFICATION'
        })
    }
}

const notificationReducer = (state = initialState, action) => {
    console.log(action)
    switch(action.type){
        case 'SET_NOTIFICATION':
            console.log(action.data.timer)
            return action.data
        
        case 'REMOVE_NOTIFICATION':
            return initialState

        default:
            return state
    }
}


export default notificationReducer