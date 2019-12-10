// import axios from 'axios'
// const baseUrl = 'https://neobis-survey-app.herokuapp.com/api/v1/'


let mockPolls = [
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


// This is the simulaton of fecth

async function wait(stallTime = 500) {
    await new Promise(resolve => setTimeout(resolve, stallTime));
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

export const getPollStatsById = async (id) => {
    let data = await mockPollsStat.find(poll => poll.id === +(id))
    await wait(500)
    return(data)
}

export default getPoll 