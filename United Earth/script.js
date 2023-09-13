"use strict";

// ////// STICKY NAVIGATION ////// //
const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

// ////// SET CURRENT YEAR: ////// //
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// ////// GALLERY OVERLAY ////// //
// OPEN / CLOSE //
const galleryOverlayItemEl = document.querySelector(".gallery-overlay-item");
const galleryImgMainEl = document.querySelector("#gallery-img-main");

// Open on click
const addEventListenerAll = (targets, type, listener, options, useCapture) => {
  targets.forEach((target) =>
    target.addEventListener(type, listener, options, useCapture)
  );
};

const galleryContainerEl = document.querySelector(".gallery-container");
const galleryItemEl = document.querySelectorAll(".gallery-item");
const sectionGalleryEl = document.querySelector(".section-gallery");

function manageOverlay(e) {
  galleryContainerEl.classList.add("overlay-open");
  // Disable scrolling:
  sectionGalleryEl.classList.add("backdrop");

  // Calling images:
  let child = e.target.parentNode.querySelector("img");

  // Set img properties
  let imgPosition = allImgs.indexOf(child);

  galleryImgMainEl.src = child.src;
  galleryImgMainEl.alt = child.alt;
  galleryImgMainEl.dataset.image = imgPosition;
}

addEventListenerAll(galleryItemEl, "click", manageOverlay);

// Close on click
const overlayCloseEl = document.querySelector(".overlay-close");

overlayCloseEl.addEventListener("click", function () {
  galleryContainerEl.classList.remove("overlay-open");
  sectionGalleryEl.classList.remove("backdrop");
});

// NAVIGATE BETWEEN IMAGES //
const allImgs = [];
const figureCount = galleryItemEl.length;
const imgArrayLength = initImgArray();

function initImgArray() {
  for (let i = 1; i <= figureCount; i++) {
    allImgs.push(document.querySelector("#gallery-img--" + i));
  }
  return allImgs.length;
}

// Backwards:
const btnBackwardsEl = document.querySelector(".btn-backwards");

btnBackwardsEl.addEventListener("click", function () {
  let imgPosition = galleryImgMainEl.dataset.image;
  let newPosition;

  if (imgPosition === "0") {
    newPosition = imgArrayLength - 1;
  } else {
    newPosition = imgPosition - 1;
  }

  manageSlider(newPosition);
});

// Forwards:
const btnForwardsEl = document.querySelector(".btn-forwards");

btnForwardsEl.addEventListener("click", function () {
  let imgPosition = galleryImgMainEl.dataset.image;
  let newPosition;

  if (imgPosition == imgArrayLength - 1) {
    newPosition = 0;
  } else {
    newPosition = Number(imgPosition) + 1;
  }

  manageSlider(newPosition);
});

function manageSlider(imgPosition) {
  galleryImgMainEl.src = allImgs[imgPosition].src;
  galleryImgMainEl.alt = allImgs[imgPosition].alt;
  galleryImgMainEl.dataset.image = imgPosition;
}

// ////// MOBILE NAVIGATION OVERLAY ////// //
const menuOpenEl = document.querySelector(".menu-open");
const menuCloseEl = document.querySelector(".menu-close");
const headerEl = document.querySelector(".header");

menuOpenEl.addEventListener("click", function () {
  headerEl.classList.add("nav-open");
});

menuCloseEl.addEventListener("click", function () {
  headerEl.classList.remove("nav-open");
});
