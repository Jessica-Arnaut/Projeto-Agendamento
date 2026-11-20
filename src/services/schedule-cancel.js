import { notify } from "../modules/ui/notify.js"
import { apiConfig } from "./api-config.js"

export async function scheduleCancel({ id }) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/schedules/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error(`Erro ao cancelar agendamento: ${response.status}`)
    }

    notify("Agendamento cancelado com sucesso!", "success")
    return true
  } catch (error) {
    console.log(error)
    notify("Não foi possível cancelar o agendamento.", "error")
    return false
  }
}
