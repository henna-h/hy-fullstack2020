const initialState = 'this is a notification'

const notificationReducer = (state = initialState, action) => {
    console.log(action)
    switch(action.type){
        default:
            return state
    }
}

export default notificationReducer