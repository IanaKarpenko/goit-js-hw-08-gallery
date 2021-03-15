//importing array of images
import { default as galleryItems } from "./gallery-items.js";


//markup for the array of images
function getGalleryItemsMarkup (galleryItems) {  
    return galleryItems.map((galleryItem, index) => {
        return `
        <li class="gallery__item">
            <a
                class="gallery__link"
                href="${galleryItem.original}"
            >
            <img
                class="gallery__image"
                src="${galleryItem.preview}"
                data-source="${galleryItem.original}"
                data-index="${index}"
                alt="Tulips"
            />
            </a>
        </li>`;
    }).join('');
};

// rendering current state of the gallery
function renderGallery(galleryItems) {
    document.querySelector("ul.js-gallery").innerHTML = getGalleryItemsMarkup(galleryItems);
}

// receiving url and alt for the big image for each gallery preview
function receiveBigImageFromClickEvent(event) {
    return {
        src: event.target.dataset.source,
        alt: event.target.alt,
        index: event.target.dataset.index,
    }
}

// delegate function to receive big images on click and open modal
function openModalWingowOnClick(event) {
    event.preventDefault();
    //receive big image
    const selectedImage = receiveBigImageFromClickEvent(event);
    // open modal
    const modalWindow = document.querySelector("div.lightbox");
    modalWindow.classList.add("is-open");
    const modalImage =  modalWindow.querySelector("img.lightbox__image");
    modalImage.src = selectedImage.src;
    modalImage.alt = selectedImage.alt;
    modalImage.setAttribute("data-index", selectedImage.index);
    window.addEventListener("keydown", closeModalWingowOnClick);
    window.addEventListener("keydown", swipeGalleryImages);
}

// close modal window on button click
function closeModalWingowOnClick(event) {
    if (event.type === "keydown" && event.key !== "Escape") {
        return;
    }
    const modalWindow = document.querySelector("div.lightbox");
    modalWindow.classList.remove("is-open");
    const modalImage =  modalWindow.querySelector("img.lightbox__image");
    modalImage.src = "";
    modalImage.alt = "";
    window.removeEventListener("keydown", closeModalWingowOnClick);
    window.removeEventListener("keydown", swipeGalleryImages);
}

// swiping gallery using ArrowLeft and ArrowRight
function swipeGalleryImages(event) {
    if (event.key === "ArrowRight") {
        const modalImage = document.querySelector("img.lightbox__image");
        const currentIndex = Number(modalImage.dataset.index);
        if (currentIndex < galleryItems.length - 1) {
            const nextImage = document.querySelector(`img.gallery__image[data-index="${currentIndex + 1}"]`);
            modalImage.src = nextImage.dataset.source;
            modalImage.alt = nextImage.alt;
            modalImage.dataset.index = nextImage.dataset.index;
        } else {
            return
        }
    }
    if (event.key === "ArrowLeft") {
        const modalImage = document.querySelector("img.lightbox__image");
        const currentIndex = Number(modalImage.dataset.index);
        if (currentIndex > 0) {
            const nextImage = document.querySelector(`img.gallery__image[data-index="${currentIndex - 1}"]`);
            modalImage.src = nextImage.dataset.source;
            modalImage.alt = nextImage.alt;
            modalImage.dataset.index = nextImage.dataset.index;
        } else {
            return
        }
    } else {
        return;
    }
}

// add listener to the gallery for clicking on its images
function setGalleryImagesClicksListener(howToReact) {
    document.querySelector("ul.js-gallery").addEventListener("click", howToReact);
}

// add listener to the modal window close button for click event
function setModalWindowCloseButtonListener(howToReact) {
    document.querySelector('button[data-action="close-lightbox"]').addEventListener("click", howToReact);
}

// add listener to the modal window overlay for click event
function setModalWindowOverlayClickListener(howToReact) {
    document.querySelector("div.lightbox__overlay").addEventListener("click", howToReact);
}

// page overall behavior (kinda main :) )
renderGallery(galleryItems);
setGalleryImagesClicksListener(openModalWingowOnClick);
setModalWindowCloseButtonListener(closeModalWingowOnClick);
setModalWindowOverlayClickListener(closeModalWingowOnClick);


