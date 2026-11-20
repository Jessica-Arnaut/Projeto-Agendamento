import { scheduleCancel } from "../../services/schedule-cancel.js"
import { confirmDialog } from "../ui/notify.js"
import { scheduleDay } from "./load.js"

const periods = document.querySelectorAll(".period")

periods.forEach((period) => {
  period.addEventListener("click", async (event) => {
    if (event.target.classList.contains("cancel-icon")) {
      const item = event.target.closest("li")
      const { id } = item.dataset

      if (id) {
        const isConfirm = await confirmDialog(
          "Tem certeza que deseja cancelar o agendamento?"
        )

        if (isConfirm) {
          const canceled = await scheduleCancel({ id })
          if (canceled) {
            await scheduleDay()
          }
        }
      }
    }
  })
})
