import dayjs from "../../libs/dayjs.js"
import { scheduleNew } from "../../services/schedule-new.js"
import { scheduleDay } from "../schedules/load.js"

const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")

// carrega a data atual
selectedDate.value = dayjs().format("YYYY-MM-DD")

// definir data mínima como a data atual
selectedDate.min = dayjs().format("YYYY-MM-DD")

form.onsubmit = async (event) => {
  // previne comportamento padrão do formulário
  event.preventDefault()

  try {
    // recuperando o nome do cliente
    const name = clientName.value.trim()

    if (!name) {
      return alert("Por favor, informe o nome do cliente.")
    }

    // recuperando a hora selecionada
    const hourSelected = document.querySelector(".hour-selected")

    if (!hourSelected) {
      return alert("Por favor, selecione um horário.")
    }

    // RECUPERA SOMENTE A HORA
    const [hour] = hourSelected.innerText.split(":")

    // insere a hora na data
    const when = dayjs(selectedDate.value)
      .hour(Number(hour))
      .minute(0)
      .second(0)
      .millisecond(0)

    // gera um ID (string para compatibilidade com json-server v1)
    const id = String(new Date().getTime())

    // faz o agendamento na API
    await scheduleNew({
      id,
      name,
      when,
    })

    // recarrega os agendamentos do dia
    await scheduleDay()

    // limpa o input de nome do cliente
    clientName.value = ""
  } catch (error) {
    alert("Não foi possível realizar o agendamento.")
    console.log(error)
  }
}
