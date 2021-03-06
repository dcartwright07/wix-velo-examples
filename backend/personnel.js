import wixData from 'wix-data'

/**
 * Format a string phone number to look like (000) 000-0000
 *
 * @param phoneNumberString String
 */
export function formatPhoneNumber(phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }

  return null
}

/**
 * Returns data from the dataset PersonnelAssociations
 *
 * @param databaseKey String
 * @param type String
 * @param orderBy String
 */
export function getDataFromDatabase(databaseKey, type, orderBy) {
  return wixData
    .query(databaseKey)
    .eq(type, true)
    .ascending(orderBy)
    .find()
    .then((results) => {
      return results.items
    })
}
