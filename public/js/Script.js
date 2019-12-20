const form = document.querySelector("form");
let Input = document.querySelector("#Location");
let Detail = document.querySelector("#Detail");
let LocationInput = document.querySelector("#LocationInput");
let Temp = document.querySelector("#Temp");
form.addEventListener("submit", e => {
  e.preventDefault();
  Detail.innerHTML = "";
  LocationInput.innerHTML = "";
  Detail.style.color = "black";
  Detail.innerHTML = "Loading...";
  Input.value = Input.value.replace(/\s{2,}/g, " ");
  if (Input.value === "" || Input.value === " ") {
    Detail.innerHTML = "Please enter location first";
    Detail.style.color = "red";
    return;
  }
  fetch("http://localhost:3000/weather?address=" + Input.value)
    .then(data => data.json())
    .then(data => {
      if (data.error) {
        Detail.innerHTML = data.error;
        Detail.style.color = "red";
      } else {
        Input.value = "";
        Detail.innerHTML = "Forecast =" + data.res;
        LocationInput.innerHTML = "Location =" + data.location;
        Detail.style.color = "blue";
        LocationInput.style.color = "blue";
      }
    });
});
