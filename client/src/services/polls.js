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


// This is the simulaton of fecth

async function wait(stallTime = 2000) {
    await new Promise(resolve => setTimeout(resolve, stallTime));
}


const getPoll = async (id) => {
    
    let data = await mockPolls.find(poll => poll.id === +(id))
    await wait(500)
    return(data)

}

export default  getPoll 