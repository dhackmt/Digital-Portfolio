let dayNight = document.querySelector(".dayNight");
let banner = document.querySelector(".banner");

dayNight.addEventListener("click", () => {
  banner.classList.toggle("night");
});

let typingEffect = new Typed("#text", {
  strings: ["Drishti", "Software Engineer", "Product Engineer"],
  loop: true,
  typeSpeed: 100,
  backSpeed: 100,
  backdelay: 1000,
});
