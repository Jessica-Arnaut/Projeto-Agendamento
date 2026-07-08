import { loadHours } from '../form/hours-load.js'

//seleciona o input de data
const selectedDate = document.getElementById('date')

export function scheduleDay() {
  const date = selectedDate?.value

  // buscar na api os horários disponíveis para o dia selecionado
  loadHours(date)
}
