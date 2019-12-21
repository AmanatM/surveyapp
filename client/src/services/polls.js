import axios from 'axios'


// This is the simulaton of fetching
async function wait(stallTime = 500) {
    await new Promise(resolve => setTimeout(resolve, stallTime));
}



const url = 'https://neobis-survey-app.herokuapp.com/api/v1/survey'
//const url = 'https://d4b166a1.ngrok.io/api/v1/survey'


let token = ''
let userId = ''

const authCredentials = () => {
    if(window.sessionStorage.getItem('user')) {
        let user = JSON.parse(window.sessionStorage.getItem('user'))
        token = user.token
        userId = user.user_id
    }

    const headers = {
        'Authorization': `Token ${token}`
    }

    return headers
}



export const getPollStatsById = async (id) => {
    let headers = authCredentials()
    let res = await axios.get(`${url}/statistics/${id}/`, { headers })
    return(res.data)

}

export const postPoll = async (poll) => {
    let headers = authCredentials()
    let res = await axios.post(`${url}/create/`, poll, {headers})
    return res.data
}

export const editPollName = async (id, name) => {
    let headers = authCredentials()
    let res = axios.put(`${url}/${id}/`, name, {headers})
    return res.data
}   

export const getMyPollList = async (offset) => {
    let headers = authCredentials()
    let res = await axios.get(`${url}/list/?limit=7&offset=${offset}`, { headers })
    return(res.data)
}

export const getStatsList = async (offset) => {
    let headers = authCredentials()
    let res = await axios.get(`${url}/list/?limit=99&offset=${offset}`,  { headers })
    return(res.data)
}


export const getAllPolls = async (offset, sorting) => {
    let headers = authCredentials()
    let res = await axios.get(`${url}/sorting/${sorting}/?limit=7&offset=${offset}`, { headers })
    return(res.data)
}


export const getPoll = async (id) => {
    let headers = authCredentials()

    let res = await axios.get(`${url}/${id}/`, { headers })
    return(res.data)
}

export const postUserResponse = async (data) => {
    let headers = authCredentials()
    let res = await axios.post(`${url}/response/`, data, { headers })
    return(res.data) 
}

export const searchPolls = async (keyword) => {
    let headers = authCredentials()
    console.log(`${url}/searching/${keyword}/?limit=5&offset=0`)

    let res = await axios.get(`${url}/searching/${keyword}/?limit=5&offset=0`, {headers})

    return (res.data)
}
