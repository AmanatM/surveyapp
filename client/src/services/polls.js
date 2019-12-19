import axios from 'axios'

const mockAllPolls = [
    {
        id: 1047810,
        title: 'Что лушче "Гиппопотам" или "Сметана"?',
        createdDate: '11 Мая, 2019',
        createdTime: '06:30',
        rating: 1000,
        user: {
            name: 'Том',
            surname: 'Круз',
            username: 'tomcr'
        }
    },

    {
        id: 1203971,
        title: 'Что подарить девушке?',
        createdDate: '12 Мая, 2019',
        createdTime: '8:43',
        rating: 700,
        user: {
            name: 'Джейсон',
            surname: 'Вурхиз',
            username: 'jasonloveman'
        }  
    },
    {
        id: 2098741,
        title: 'Протеин или креатин?',
        createdDate: '31 Мая, 2019',
        createdTime: '12:33',
        rating: 700,
        user: {
            name: 'Алексей',
            surname: 'Буцилин',
            username: 'bitsuhaboy'
        }
    }
]

const mockPolls = [
    {
        id: 1047810,
        name: 'Это название опроса',
        description: 'Тут должно быть какое-то описание',
        author: 'Нео Бисов',
        questions: [
            {
            number: 1,
            name: 'Какой цвет лучше?',
            images: [],
            type: 'option',
            answers: [
                'Крысный',
                'Черный',
                'Белый'
            ]
            },

            {
                number: 2,
                name: 'Выберите дату!',
                images: [],
                type: 'date'
            },
            {
                number: 3,
                name: 'А здесь укажите время',
                images: [],
                type: 'time'
            },
            {
                number: 4,
                name: 'Сюда просто введите что думаете',
                images: [],
                type: 'text'
            }
        ]
      },

      {
          id: 123
      }
]

const mockPollList = [
    {
        id: 34543,
        name: 'Устроить вечеринку?',
        nickname: 'neobisov',
        createDate: '10 Мая, 2019'
    },
    {
        id: 98762,
        name: ' Во что покарсить стену?',
        nickname: 'neobisov',
        createDate: '8 Марта, 2019'
    },
]

const mockPollsStat = [
    {
        id: 34543,
        countries: [
            {
                name: 'Кыргызстан',
                number: 45
            }, 

            {
                name: 'Россия',
                number: 34
            },       
            {
                name: 'Казахстан',
                number: 14
            }, 
            {
                name: 'Монголоия',
                number: 10
            }, 
            {
                name: 'США',
                number: 20
            },
            
        ],
        ages: '',
        maleNumber: '32',
        femaleNumber: '12'
    },

    {
        id: 98762,
        countries: [
            {
                name: 'Кыргызстан',
                number: 29
            }, 

            {
                name: 'Россия',
                number: 34
            }, 
            
        ],
        ages: '',
        maleNumber: '40',
        femaleNumber: '52'
    }
]


// This is the simulaton of fetching
async function wait(stallTime = 500) {
    await new Promise(resolve => setTimeout(resolve, stallTime));
}



let url = 'https://neobis-survey-app.herokuapp.com/api/v1/survey'
//const url = 'https://b6465aa0.ngrok.io/api/v1/survey'


let token = ''
let userId = ''


export const getPollStatsById = async (id) => {


    if(window.sessionStorage.getItem('user')) {
        let user = JSON.parse(window.sessionStorage.getItem('user'))
        token = user.token
        userId = user.user_id
    }

    const headers = {
        'Authorization': `Token ${token}`
    }

    let res = await axios.get(`${url}/statistics/${id}/`, { headers })
    return(res.data)

}

export const postPoll = async (poll) => {
    if(window.sessionStorage.getItem('user')) {
        let user = JSON.parse(window.sessionStorage.getItem('user'))
        token = user.token
        userId = user.user_id
    }

    const headers = {
        'Authorization': `Token ${token}`
    }
    let res = await axios.post(`${url}/create/`, poll, {headers})
    return res.data
}

export const editPollName = async (id, name) => {
    if(window.sessionStorage.getItem('user')) {
        let user = JSON.parse(window.sessionStorage.getItem('user'))
        token = user.token
        userId = user.user_id
    }

    const headers = {
        'Authorization': `Token ${token}`
    }

    let res = axios.put(`${url}/${id}/`, name, {headers})
    return res.data
}   

export const getMyPollList = async (offset) => {
    if(window.sessionStorage.getItem('user')) {
        let user = JSON.parse(window.sessionStorage.getItem('user'))
        token = user.token
        userId = user.user_id
    }

    const headers = {
        'Authorization': `Token ${token}`
    }
    let res = await axios.get(`${url}/list/?limit=7&offset=${offset}`,  { headers })
    return(res.data)
}

export const getStatsList = async (offset) => {
    if(window.sessionStorage.getItem('user')) {
        let user = JSON.parse(window.sessionStorage.getItem('user'))
        token = user.token
        userId = user.user_id
    }

    const headers = {
        'Authorization': `Token ${token}`
    }
    let res = await axios.get(`${url}/list/?limit=99&offset=${offset}`,  { headers })
    return(res.data)
}


export const getAllPolls = async (offset) => {
    if(window.sessionStorage.getItem('user')) {
        let user = JSON.parse(window.sessionStorage.getItem('user'))
        token = user.token
        userId = user.user_id
    }

    const headers = {
        'Authorization': `Token ${token}`
    }

    let res = await axios.get(`${url}/list/all/?limit=7&offset=${offset}`, { headers })
    return(res.data)
}

export const getPollList = async () => {
    let data = await mockPollList
    await wait(0)
    return(data)
}

export const getPoll = async (id) => {
    
    let data = await mockPolls.find(poll => poll.id === +(id))
    await wait(500)
    return(data)

}

