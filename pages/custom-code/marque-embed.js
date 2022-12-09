import wixData from 'wix-data'

$w.onReady(function () {
  //
})

function getData() {
  return wixData
    .query('ElectionResults')
    .find()
    .then((results) => {
      return results.items
    })
}

async function getActiveScrollContent() {
  const results = await getData();
  const activeItem = results.find((item) => item['active'])
  return activeItem.scrollContent
}

export async function electionResultsDataset_ready() {
  const scrollContent = await getActiveScrollContent()
  $w('#resultsScroll').postMessage(scrollContent);
}
