//SKIPPED 6.18
const filterReducer = (state = 'ALL', action) => {
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