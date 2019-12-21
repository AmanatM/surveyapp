import axios from 'axios'
const baseUrl = 'https://neobis-survey-app.herokuapp.com/api/v1/user'
//const baseUrl = 'https://d4b166a1.ngrok.io/api/v1/user'


export const login = async (credentials) => {
    const res = await axios.post(`${baseUrl}/login/`, credentials)
    return res.data
}

export const register = async (data) => {
    const res = await axios.post(`${baseUrl}/registration/`, data)
    return res.data
}

export const changePassword = async (data) => {
    
    const headers = {
        'Authorization': `Token ${JSON.parse(window.sessionStorage.getItem('user')).token}`
    }

    const res = await axios.put(`${baseUrl}/change-password/`, data, {headers})
    return res.data
}


export const editProfile = async (data) => {
    const headers = {
        'Authorization': `Token ${JSON.parse(window.sessionStorage.getItem('user')).token}`
    }

    const res = await axios.put(`${baseUrl}/profile-update/${JSON.parse(window.sessionStorage.getItem('user')).user_id}/`, data, {headers})
    return res.data
}

export const getUserData = async (id) => {
    const headers = {
        'Authorization': `Token ${JSON.parse(window.sessionStorage.getItem('user')).token}`
    }
    const userId = JSON.parse(window.sessionStorage.getItem('user')).user_id

    const res = await axios.get(`${baseUrl}/profile-data/${id}/`, {headers})
    return res.data

}

export default { login }