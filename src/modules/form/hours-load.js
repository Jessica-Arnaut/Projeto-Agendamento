import dayjs from "../../libs/dayjs.js"

import { openingHours } from "../../utils/opening-hours.js"
import { hoursClick } from "./hours-click.js"

export function loadHours(date) {
  const hours = document.getElementById("hours")

  if (!hours) {
    return
  }

  // 1. Limpa a lista para não acumular horários antigos
  hours.innerHTML = ""

  const opening = openingHours.map((hour) => {
    // Recupera apenas a hora (ex: "09")
    const [scheduleHour] = hour.split(":")

    // Cria o objeto de data completo para o horário do agendamento
    const appointmentDate = dayjs(date || undefined)
      .hour(Number(scheduleHour))
      .minute(0)
      .second(0)

    // Verifica se o horário já passou do momento atual
    const isHourInPast = appointmentDate.isBefore(dayjs())

    return {
      hour,
      available: !isHourInPast,
    }
  })

  // 2. Renderiza os horários na tela seguindo o padrão do seu HTML
  opening.forEach((item) => {
    const li = document.createElement("li")

    // Adiciona a classe base 'hour' igual ao seu comentário de exemplo
    li.classList.add("hour")

    // Adiciona a classe de estado correta (sem o 's' no final)
    li.classList.add(item.available ? "hour-available" : "hour-unavailable")

    // Adiciona o atributo value se o seu projeto usar para pegar o valor no clique
    li.setAttribute("value", item.hour)

    // Define o texto visível (ex: 09:00)
    li.textContent = item.hour

    // Coloca o item dentro da <ul id="hours">
    if (item.hour === "9:00") {
      addHourHeader(hours, "Manhã")
    } else if (item.hour === "13:00") {
      addHourHeader(hours, "Tarde")
    } else if (item.hour === "18:00") {
      addHourHeader(hours, "Noite")
    }
    hours.appendChild(li)
  })

  hoursClick() //adiciona o evento de clique aos horários disponíveis
}

function addHourHeader(hoursContainer, title) {
  const header = document.createElement("li")
  header.classList.add("hour-header")
  header.textContent = title

  hoursContainer.append(header)
}
