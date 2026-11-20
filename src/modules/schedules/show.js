import dayjs from "../../libs/dayjs.js"
import { notify } from "../ui/notify.js"

const periodMorning = document.getElementById("period-morning")
const periodAfternoon = document.getElementById("period-afternoon")
const periodNight = document.getElementById("period-night")

function addEmptyMessage(period) {
  if (period.children.length === 0) {
    const empty = document.createElement("li")
    empty.classList.add("empty")
    empty.textContent = "Nenhum agendamento neste período"
    period.appendChild(empty)
  }
}

export function schedulesShow({ dailySchedules }) {
  try {
    periodMorning.innerHTML = ""
    periodAfternoon.innerHTML = ""
    periodNight.innerHTML = ""

    dailySchedules.forEach((schedule) => {
      const item = document.createElement("li")
      const time = document.createElement("strong")
      const name = document.createElement("span")

      item.setAttribute("data-id", schedule.id)

      time.textContent = dayjs(schedule.when).format("HH:mm")
      name.textContent = schedule.name

      const cancelIcon = document.createElement("img")
      cancelIcon.classList.add("cancel-icon")
      cancelIcon.setAttribute("src", "./src/assets/cancel.svg")
      cancelIcon.setAttribute("alt", "Cancelar")

      item.append(time, name, cancelIcon)

      const hour = dayjs(schedule.when).hour()

      if (hour <= 12) {
        periodMorning.appendChild(item)
      } else if (hour > 12 && hour <= 18) {
        periodAfternoon.appendChild(item)
      } else {
        periodNight.appendChild(item)
      }
    })

    addEmptyMessage(periodMorning)
    addEmptyMessage(periodAfternoon)
    addEmptyMessage(periodNight)
  } catch (error) {
    notify("Não foi possível exibir os agendamentos.", "error")
    console.log(error)
  }
}
