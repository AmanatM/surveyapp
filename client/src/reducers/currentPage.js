const reducer = (state = '', action) => {
    switch(action.type) {
        case 'PAGE_CHANGE':
            return action.data
        default:
            return state
        
    }
}

export const changePage = (pageName) => {
    return {
        type: 'PAGE_CHANGE',
        data: pageName
    }
}

export default reducer