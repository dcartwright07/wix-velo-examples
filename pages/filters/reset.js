/*
 * This function fires when the reset button is clicked.
 * The onClick action is set in the Properties and Events
 * section of the code panel. This function declaration is
 * automtically created with the event is created.
 */
export function resetButton_click(event) {
	const directoryQuery = wixData.query('StaffDirectory')

	$w('#searchField').value = ''

	directoryQuery
		.ascending('lastName', 'firstName')
		.find()
		.then(({ items }) => {
			$w('#resultsTable').rows = items
		})
}
