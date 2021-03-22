const refreshButton = document.getElementById("refreshButton");

let loopActive = false;

const onClickRefreshButton = () => {
  fetch("http://127.0.0.1:5000/api/v1/resources/books/all", {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  })
    .then((response) => {
      //   if (!response.ok) {
      //     throw new Error("Network response was not ok");
      //   }
      return response.json();
    })
    .then((json) => {
      console.log(json);
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
