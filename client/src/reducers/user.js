const reducer = (state = null, action) => {
    switch(action.type) {
        case 'LOGIN':
            return action.data

        case 'LOGOUT':
            return null

        case 'INITUSER':
            return action.data

        default:
            return state
        
    }
}


export const initUser = () => {

    const loggedUserJSON = window.sessionStorage.getItem('loggedUser')

    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)

        return {
            type: 'INITUSER',
            data: user
        }
    }

    return {
        type: 'INITUSER',
        data: null
    }
 
}

export const loginUser = (credentials) => {

    window.sessionStorage.setItem(
        'loggedUser', JSON.stringify(credentials)
    ) 

    return {
        type: 'LOGIN',
        data: credentials
    }
}

export const logoutUser = () => {

    window.sessionStorage.clear()

    return {
        type: 'LOGOUT'
    }
}

export default reducer