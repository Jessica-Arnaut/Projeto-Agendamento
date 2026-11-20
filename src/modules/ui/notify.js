function getToastContainer() {
  let container = document.getElementById("toasts")

  if (!container) {
    container = document.createElement("div")
    container.id = "toasts"
    container.setAttribute("role", "status")
    container.setAttribute("aria-live", "polite")
    document.body.appendChild(container)
  }

  return container
}

// exibe uma mensagem temporária na tela (type: "success" | "error" | "info")
export function notify(message, type = "info") {
  const toast = document.createElement("div")
  toast.classList.add("toast", `toast-${type}`)
  toast.textContent = message

  getToastContainer().appendChild(toast)

  setTimeout(() => toast.remove(), 4000)
}

// exibe uma janela de confirmação e retorna uma Promise<boolean>
export function confirmDialog(message) {
  return new Promise((resolve) => {
    const overlay = document.createElement("div")
    overlay.classList.add("dialog-overlay")

    const dialog = document.createElement("div")
    dialog.classList.add("dialog")
    dialog.setAttribute("role", "alertdialog")

    const text = document.createElement("p")
    text.textContent = message

    const actions = document.createElement("div")
    actions.classList.add("dialog-actions")

    const cancelButton = document.createElement("button")
    cancelButton.type = "button"
    cancelButton.classList.add("dialog-button")
    cancelButton.textContent = "Voltar"

    const confirmButton = document.createElement("button")
    confirmButton.type = "button"
    confirmButton.classList.add("dialog-button", "dialog-button-confirm")
    confirmButton.textContent = "Confirmar"

    const close = (result) => {
      overlay.remove()
      resolve(result)
    }

    cancelButton.addEventListener("click", () => close(false))
    confirmButton.addEventListener("click", () => close(true))
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) close(false)
    })

    actions.append(cancelButton, confirmButton)
    dialog.append(text, actions)
    overlay.appendChild(dialog)
    document.body.appendChild(overlay)

    confirmButton.focus()
  })
}
