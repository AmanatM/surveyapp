import axios from 'axios'
const baseUrl = 'https://neobis-survey-app.herokuapp.com/api/v1/user'


export const login = async (credentials) => {
    const res = await axios.post(`${baseUrl}/login/`, credentials)
    return res.data
}

export const register = async (data) => {
    const res = await axios.post(`${baseUrl}/registration/`, data)
    return res.data
}
export default { login }