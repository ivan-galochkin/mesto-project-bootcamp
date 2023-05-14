import {initialCards} from "./components/constants";
import "./styles/index.css"
import {setValidation} from "./components/validate";
import {
    changePopupInfoValues,
    closeByEscape,
    closePopup,
    closePopupOverlay,
    handleFormSubmitInfo,
    handleFormSubmitMesto,
    openPopup
} from "./components/modal";
import {createCard} from "./components/card";


const page = document.querySelector(".page");

const profile = page.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");

const profileAddButton = profile.querySelector(".profile__add-button");

const popupInfo = page.querySelector("#popup-info");
const popupInfoForm = popupInfo.querySelector(".popup__form");
const popupInfoCloseButton = popupInfo.querySelector(".popup__close-button");

const popupMesto = page.querySelector("#popup-mesto");
const popupMestoForm = popupMesto.querySelector(".popup__form");
const popupMestoCloseButton = popupMesto.querySelector(".popup__close-button");

const popupImage = page.querySelector(".popup-image");
const popupImageCloseButton = popupImage.querySelector(".popup__close-button");

const popupList = page.querySelectorAll(".popup");
const elements = page.querySelector(".elements");


initialCards.forEach((card, index) => createCard(card.name, card.link, index, elements))

profileEditButton.addEventListener("click", () => {
    changePopupInfoValues(popupInfo, profile)
    openPopup(popupInfo)
});
profileAddButton.addEventListener("click", () => openPopup(popupMesto));
popupMestoCloseButton.addEventListener("click", () => closePopup(popupMesto));
popupMestoForm.addEventListener("submit", (event) => handleFormSubmitMesto(event));
popupInfoCloseButton.addEventListener("click", () => closePopup(popupInfo));
popupInfoForm.addEventListener("submit", (event) => handleFormSubmitInfo(event));
popupImageCloseButton.addEventListener("click", () => closePopup(popupImage));


document.removeEventListener('keydown', closeByEscape);


closePopupOverlay(popupList);
closeByEscape(popupList);
setValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error',
}, page);
setTimeout(function () {
    popupMesto.classList.remove("popup_preload");
    popupInfo.classList.remove("popup_preload");
    popupImage.classList.remove("popup_preload");
}, 500);
