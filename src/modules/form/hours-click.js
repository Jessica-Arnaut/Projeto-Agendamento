export function hoursClick() {
  const hours = document.querySelectorAll(".hour-available")

  

  hours.forEach((availableHour) => {
    availableHour.addEventListener("click", (selectedHour) => {
      // Lógica para lidar com o clique no horário disponível

      hours.forEach((hour) => {
        hour.classList.remove("hour-selected")
      })

      selectedHour.currentTarget.classList.add("hour-selected")
    })
  })
}
