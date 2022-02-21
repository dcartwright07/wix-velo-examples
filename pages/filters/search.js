/*
 * This function fires when the search button is clicked.
 * The onClick action is set in the Properties and Events
 * section of the code panel. This function declaration is
 * automtically created with the event is created.
 */
export function searchButton_click(event) {
  const directoryQuery = wixData.query("StaffDirectory");
  const value = $w("#searchField").value;

  directoryQuery
    .contains("firstName", value)
    .or(directoryQuery.contains("lastName", value))
    .or(directoryQuery.contains("department", value))
    .or(directoryQuery.contains("title", value))
    .ascending("lastName", "firstName")
    .find()
    .then(({ items }) => {
      $w("#resultsTable").rows = items;
    });
}
