// This is main java script File
let imagesContainer = document.querySelector(".slider>.imagesContainer");
let images = document.querySelectorAll(".slider>.imagesContainer>.image");
let thumbnails = document.querySelectorAll(
  ".slider>.thumbnailsContainer>.thumbnail"
);
let dots = document.querySelectorAll(".slider>.dotsContainer>.dot");
let thumbnailsContainer = document.querySelector(
  ".slider>.thumbnailsContainer"
);
let dotsContainer = document.querySelector(".slider>.dotsContainer");
let next = document.getElementById("next");
let prev = document.getElementById("prev");

// get count images
let countImages = images.length;
let imageActive = 0;
// event next click
next.addEventListener("click", (e) => {
  imageActive = imageActive + 1;
  if (imageActive >= countImages) {
    imageActive = 0;
  }
  showSlider();
});
//event prev click
prev.addEventListener("click", (e) => {
  imageActive = imageActive - 1;
  if (imageActive < 0) {
    imageActive = countImages - 1;
  }
  showSlider();
});
//event dot click
dotsContainer.addEventListener("click", (e) => {
  if (e.target.matches(".dot")) {
    imageActive = e.target.dataset.id - 1;
    showSlider();
  }
});
// click thumbnail
thumbnailsContainer.addEventListener("click", (e) => {
  if (e.target.matches(".thumbnail>img")) {
    imageActive = e.target.closest(".thumbnail").dataset.id - 1;
    showSlider();
  }
});
// auto run slider
let refreshInterval = setInterval(() => {
  next.click();
}, 5000);
const showSlider = () => {
  // remove image active old
  let imageActiveOld = document.querySelector(
    ".slider>.imagesContainer>.image.active"
  );
  let thumbnailActiveOld = document.querySelector(
    ".slider>.thumbnailsContainer>.thumbnail.active"
  );
  let dotActiveOld = document.querySelector(
    ".slider>.dotsContainer>.dot.active"
  );
  imageActiveOld.classList.remove("active");
  thumbnailActiveOld.classList.remove("active");
  dotActiveOld.classList.remove("active");
  // active new item
  images[imageActive].classList.add("active");
  thumbnails[imageActive].classList.add("active");
  dots[imageActive].classList.add("active");
  setPositionThumbnail();

  // clear auto time run slider
  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    next.click();
  }, 5000);
};
function setPositionThumbnail() {
  let thumbnailActive = document.querySelector(
    ".slider>.thumbnailsContainer> .thumbnail.active"
  );
  let rect = thumbnailActive.getBoundingClientRect();
  if (rect.left < 0 || rect.right > window.innerWidth) {
    thumbnailActive.scrollIntoView({ behavior: "smooth", inline: "nearest" });
  }
}
// stop slider when hover slider
imagesContainer.addEventListener("mouseover", () => {
  clearInterval(refreshInterval);
});
// run slider when leave slider
imagesContainer.addEventListener("mouseout", () => {
  refreshInterval = setInterval(() => {
    next.click();
  }, 5000);
});
// remove event listener
next.removeEventListener("click");
prev.removeEventListener("click");
dotsContainer.removeEventListener("click");
thumbnailsContainer.removeEventListener("click");
imagesContainer.removeEventListener("mousemove");
imagesContainer.removeEventListener("mouseleave");
