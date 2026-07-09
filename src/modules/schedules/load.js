import { loadHours } from "../form/hours-load.js"

export function scheduleDay() {
  const selectedDate = document.getElementById("date")
  const date = selectedDate?.value

  // buscar na api os horários disponíveis para o dia selecionado
  loadHours(date)
}
