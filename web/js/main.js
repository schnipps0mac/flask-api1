const refreshButton = document.getElementById("refreshButton");

let loopActive = false;

const onClickRefreshButton = () => {
  fetch("http://127.0.0.1:5000/api/v1/energymonitor/all", {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      // create html from json data
      createHtmlFromJson(json);
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
};

const onClickToggleLoop = () => {
  loopActive = !loopActive;
};

function createHtmlFromJson(json) {
  let tableRows = "";
  if (Array.isArray(json)) {
    json.forEach((entry) => (tableRows += createHtmlForSingleEntry(entry)));
  }

  const table = `<table class='dataTable' style="width:100%"> 
    <tr>
        <th>timestamp</th>
        <th>value 1</th>
        <th>value 2</th>
        <th>value 3</th>
    </tr>
    ${tableRows}
    </table>`;

  const target = document.getElementById("dataContainer");
  target.innerHTML += table;
}

// {id: 0, timestamp: "2021-03-24", value1: 13.4, value2: "14", value3: 123}
function createHtmlForSingleEntry(singleEntry) {
  let tableData = `
        <td>
            ${singleEntry.timestamp}
        </td>
        <td>
            ${singleEntry.value1}
        </td>
        <td>
            ${singleEntry.value2}
        </td>
        <td>
            ${singleEntry.value3}
        </td>
    `;

  const tableRow = `
    <tr>
        ${tableData}
    </tr>`;
  return tableRow;
}
