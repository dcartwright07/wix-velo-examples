import { sendToGlic } from 'backend/glic'

// Send data to be processed
export function submitButton_click(event) {
  const userData = {
    firstName: $w('#firstName').value,
    lastName: $w('#lastName').value,
    email: $w('#email').value,
    phone: $w('#phone').value,
  }

  sendToGlic(userData)
}
