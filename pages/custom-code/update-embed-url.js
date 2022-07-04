import wixData from 'wix-data'
import wixLocation from 'wix-location'

$w.onReady(async function () {
  const urlString = '/' + wixLocation.prefix + '/' + wixLocation.path // Recreate url path
  const database = 'Projects' // Collection Name

  const projects = await getData(database) // Get data from dataset

  // Find the item that matches the create url path
  const project = projects.find(
    (item) => item['link-projects-1-title'] === urlString
  )

  // Insert url into the embed element on the page
  $w('#websitePreview').src = project.newField
})

/**
 * Returns data from the dataset Projects
 *
 * @param database String
 */
function getData(database) {
  return wixData
    .query(database)
    .find()
    .then((results) => {
      return results.items
    })
}
