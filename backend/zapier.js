import axios from 'axios'
import moment from 'moment'

// Makes the HTTP Post request
function postData(data) {
  const url = ''
  // console.log(data);

  axios.post(url, data)
}

// Prepares the data to use the Zapier WebHooks
export function sendToZapier(data) {
  const userData = {
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    address1:
      data.address.streetAddress.number + ' ' + data.address.streetAddress.name,
    city: data.address.city,
    state: data.address.subdivision,
    zip: data.address.postalCode.slice(0, 5),
    dateOfBirth: moment(data.dob).format('YYYY-MM-DD'),
    timestamp: moment(new Date()).format('MM/DD/YYYY HH:mm:ss'),
    // trustedForm: data.trustedForm,
  }

  postData(userData)
}
