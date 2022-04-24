import { getSecret } from 'wix-secrets-backend'
import { fetch } from 'wix-fetch'

// Format phone number to not have hyphens, parenthesis, or spaces
function formatPhoneNumber(string) {
  return (
    '+1' +
    string
      .replace(/-/g, '')
      .replace(/\(/g, '')
      .replace(/\)/g, '')
      .replace(/ /g, '')
  )
}

// Use wix fetch method to make a post request to Glic Healths API
function postUser(url, data) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  }

  fetch(url, options).then((httpResponse) => {
    console.log(httpResponse)
  })
}

// Gather the data needed to be sent to Glic Health
export async function sendToGlic({ firstName, lastName, email, phone }) {
  const brokerEmail = await getSecret('broker_email')
  const brokerGroupNumber = await getSecret('broker_groupnumber')

  const testUrl = 'https://uatapi.glichealth.com/data/v3/rawtransaction'
  const liveUrl = 'https://api.glichealth.com/data/v3/rawtransaction'

  const data = {
    broker_email: brokerEmail,
    broker_groupnumber: brokerGroupNumber,
    userdetail: [
      {
        fname: firstName,
        lname: lastName,
        email: email,
        phone: formatPhoneNumber(phone),
      },
    ],
  }

  postUser(testUrl, data)
}
