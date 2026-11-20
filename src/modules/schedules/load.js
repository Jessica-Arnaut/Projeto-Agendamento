import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js"
import { loadHours } from "../form/hours-load.js"
import { schedulesShow } from "./show.js"

export async function scheduleDay() {
  const selectedDate = document.getElementById("date")
  const date = selectedDate?.value

  // Busca na API os agendamentos do dia selecionado
  const dailySchedules = await scheduleFetchByDay({ date })

  // Exibe os agendamentos nos períodos (manhã, tarde, noite)
  schedulesShow({ dailySchedules })

  // Renderiza as horas disponíveis
  loadHours({ date, dailySchedules })
}
