import { apiConfig } from "./api-config.js"

export async function scheduleNew({ id, name, when }) {
  const response = await fetch(`${apiConfig.baseURL}/schedules`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, name, when }),
  })

  if (!response.ok) {
    throw new Error(`Erro ao criar agendamento: ${response.status}`)
  }

  alert("Agendamento realizado com sucesso!")
}
