//importing array of images
import { default as galleryItems } from "./gallery-items.js";


//markup for the array of images
function getGalleryItemsMarkup (galleryItems) {  
    return galleryItems.map(galleryItem => {
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
}

// close modal window on button click
function closeModalWingowOnClick(event) {
    const modalWindow = document.querySelector("div.lightbox");
    modalWindow.classList.remove("is-open");
    const modalImage =  modalWindow.querySelector("img.lightbox__image");
    modalImage.src = "";
    modalImage.alt = "";
}

// add listener to the gallery for clicking on its images
function setGalleryImagesClicksListener(howToReact) {
    document.querySelector("ul.js-gallery").addEventListener("click", howToReact);
}

// add listener to the modal window close button for click event
function setModalWindowCloseButtonListener(howToReact) {
    document.querySelector('button[data-action="close-lightbox"]').addEventListener("click", howToReact);
}

// page overall behavior (kinda main :) )
renderGallery(galleryItems);
setGalleryImagesClicksListener(openModalWingowOnClick);
setModalWindowCloseButtonListener(closeModalWingowOnClick);

