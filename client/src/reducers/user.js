import loginService from '../services/user'
 
const reducer = (state = null, action) => {
    switch(action.type) {
        case 'LOGIN':
            return action.data

        case 'LOGOUT':
            return null

        case 'INITUSER':
            return action.data
            
        case  'UPDATE_USER':
            return action.data

        default:
            return state
        
    }
}

export const initUser = () => {

    const userFromSessionStorage = window.sessionStorage.getItem('user')

    if (userFromSessionStorage) {

        let loggedUser = JSON.parse(userFromSessionStorage)

        return {
            type: 'INITUSER',
            data: loggedUser
        }
    }

    return {
        type: 'INITUSER',
        data: null
    }
 
}

export const updateUser = (data) => {


    window.sessionStorage.setItem('user', JSON.stringify(data))


    return {
        type: 'UPDATE_USER',
        data: data
    }
}


export const loginUser = (credentials) => {

    window.sessionStorage.setItem(
        'user', JSON.stringify(credentials)
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