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
  let listItems = "";
  if (Array.isArray(json)) {
    json.forEach((entry) => (listItems += createHtmlForSingleEntry(entry)));
  }

  const target = document.getElementById("dataContainer");
  target.innerHTML += listItems;
}

// {id: 0, timestamp: "2021-03-24", value1: 13.4, value2: "14", value3: 123}
function createHtmlForSingleEntry(singleEntry) {
  let listItems = `
        <li id='timestamp'>
        Timestamp: ${singleEntry.timestamp}
        </li>
        <li id='value1'>
        Value1: ${singleEntry.value1}
        </li>
        <li id='value2'>
        Value2: ${singleEntry.value2}
        </li>
        <li id='value3'>
        Value3: ${singleEntry.value3}
        </li>`;

  const listTemplate = `
    <ul class='valueList'>
        ${listItems}
    </ul>`;
  return listTemplate;
}
