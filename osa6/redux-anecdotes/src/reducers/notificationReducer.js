const initialState = {text: 'notification', timer: null}

//6.11 DOES NOT WORK
export const setNotification = (text) => {
    return {
        type: 'SET_NOTIFICATION',
        data: {
            text,
            timer: setTimeout(() => {removeNotification()}, 5*1000)
        }
    }
}

const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

const notificationReducer = (state = initialState, action) => {
    console.log(action)
    switch(action.type){
        case 'SET_NOTIFICATION':
            console.log(action.data.timer)
            clearTimeout(action.data.timer)
            return action.data
        
        case 'REMOVE_NOTIFICATION':
            return initialState

        default:
            return state
    }
}


export default notificationReducer