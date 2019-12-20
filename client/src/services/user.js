import axios from 'axios'
//const baseUrl = 'https://neobis-survey-app.herokuapp.com/api/v1/user'
const baseUrl = 'https://4ab6e111.ngrok.io/api/v1/user'


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

export default { login }