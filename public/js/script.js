let colorPicker = document.getElementById("colorPicker");
let BgPicker = document.getElementById("BgPicker");
let leftSide = document.querySelector(".left-side");
let leftSidePicker = document.getElementById("leftSidePicker");

BgPicker.addEventListener("change", (e) => {
  document.body.style.background = e.target.value;
});

leftSidePicker.addEventListener("change", (e) => {
  leftSide.style.background = e.target.value;
});
