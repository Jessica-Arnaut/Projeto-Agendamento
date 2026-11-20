import dayjs from "../libs/dayjs.js"
import { notify } from "../modules/ui/notify.js"
import { apiConfig } from "./api-config.js"

export async function scheduleFetchByDay({ date, throwOnError = false }) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/schedules`)

    if (!response.ok) {
      throw new Error(`Erro ao buscar agendamentos: ${response.status}`)
    }

    const data = await response.json()

    const dailySchedules = data
      .filter((schedule) => dayjs(date).isSame(schedule.when, "day"))
      .sort((a, b) => dayjs(a.when).valueOf() - dayjs(b.when).valueOf())

    return dailySchedules
  } catch (error) {
    console.log(error)

    if (throwOnError) {
      throw error
    }

    notify(
      "Não foi possível buscar os agendamentos do dia selecionado.",
      "error"
    )
    return []
  }
}
