import { scheduleDay } from "../schedules/load.js"

// seleciona o input de data
const dateInput = document.getElementById("date")

// recarrega a lista de horários disponíveis quando a data é alterada
dateInput?.addEventListener("change", scheduleDay)
