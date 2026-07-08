import { scheduleDay } from './load.js'

document.addEventListener('DOMContentLoaded', () => {
  const selectedDate = document.getElementById('date')

  scheduleDay()

  selectedDate?.addEventListener('change', scheduleDay)
})
