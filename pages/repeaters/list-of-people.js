// Import needed functions
import { getDataFromDatabase, formatPhoneNumber } from 'backend/personnel'

$w.onReady(function () {
  // Prepare the repeater
  initiateRepeater()

  // Insert the data into the repeater
  insertData()
})

/**
 * Initiate the repeater with the fields that you want to have available.
 * This function is doing the work of preparing the repeater for the data
 * coming in from the database
 */
function initiateRepeater() {
  $w('#repeaterId').onItemReady(($item, itemData, index) => {
    $item('#name').text = itemData.name ? itemData.name : ''
    $item('#address1').text = itemData.address ? itemData.address.formatted : ''
    $item('#address2').text = itemData.address2
      ? itemData.address2.formatted
      : ''
    $item('#phone1').text = itemData.phone1 ? itemData.phone1.toString() : ''
    $item('#phone2').text = itemData.phone2 ? itemData.phone2.toString() : ''
    $item('#email1').html = itemData.email ? itemData.email : ''
    $item('#email2').html = itemData.email2 ? itemData.email2 : ''
    $item('#website').text = itemData.website ? itemData.website : ''
  })
}

async function insertData() {
  // Insert the data from the database directly into the repeater
  $w('#repeaterId').data = await getDataFromDatabase(
    'Personnel',
    'list',
    'name'
  )

  // Format some of the data to display the way we want to the users
  $w('#repeaterId').forEachItem(async ($item, itemData, index) => {
    $item('#name').text = itemData.name

    if (itemData.address) {
      $item('#address1').text = itemData.address.formatted
    } else {
      collapse($item, '#address1')
    }

    if (itemData.address2) {
      $item('#address2').text = itemData.address2.formatted
    } else {
      collapse($item, '#address2')
    }

    if (itemData.phone1) {
      $item('#phone1').text = await formatPhoneNumber(itemData.phone1)
    } else {
      collapse($item, '#phone1')
    }

    if (itemData.phone2) {
      $item('#phone2').text = await formatPhoneNumber(itemData.phone2)
    } else {
      collapse($item, '#phone2')
    }

    if (itemData.email) {
      $item('#email1').html = itemData.email
    } else {
      collapse($item, '#email1')
    }

    if (itemData.email2) {
      $item('#email2').html = itemData.email2
    } else {
      collapse($item, '#email2')
    }

    if (itemData.website) {
      $item('#website').text = itemData.website
    } else {
      collapse($item, '#website')
    }
  })
}

/**
 * Collapse both the field and its respective icon by ID so it is not visible
 * to the users
 *
 * @param item Object
 * @param id String
 */
export function collapse(item, id) {
  item(id).collapse()
  item(id + 'Icon').collapse()
}
