const initialState = { filter: '' }

//6.12 DOES NOT WORK
const filterReducer = (state = initialState, action) => {
    console.log(action.type)
    switch (action.type) {
        case 'SET_FILTER':
            return action.filter

        default:
            return state
    }
}

export const setFilter = (filter) => {
    console.log(filter)
    return {
        type: 'SET_FILTER',
        filter,
    }
}

export default filterReducer