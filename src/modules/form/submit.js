import dayjs from 'dayjs'

const form = document.querySelector('form')
const selectedDate = document.getElementById('date')
//carrega a data atual
selectedDate.value = dayjs().format('YYYY-MM-DD')

//definir data minima como a data atual
selectedDate.min = dayjs().format('YYYY-MM-DD')

form.onsubmit = (event) => {
  //previne comportamento padrão do formulário
  event.preventDefault()
}
