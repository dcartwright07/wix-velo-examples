import wixData from 'wix-data'

$w.onReady(function () {
  loadSlides('#heroSlideshow')
})

/**
 * Replaces the current slides with the data from the dataset
 *
 * @param slideshowId String
 */
async function loadSlides(slideshowId) {
  const slidesData = await getSlideshowDataFromDatabase('HomeSliderImages')
  const slides = $w(slideshowId).slides // Get all current slides

  // For each slide, change the image to its respective image in the dataset list
  slides.forEach((slide, index) => {
    if (slidesData[index]) {
      $w(`#${slide.id}`).background.src = slidesData[index].image
    }
  })
}

/**
 * Returns data from the dataset HomeSliderImage
 *
 * @param databaseKey String
 */
function getSlideshowDataFromDatabase(databaseKey) {
  return wixData
    .query(databaseKey)
    .find()
    .then((results) => {
      return results.items
    })
}
