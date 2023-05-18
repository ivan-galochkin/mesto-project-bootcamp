import "./styles/index.css"
import {setValidation} from "./components/validate";
import {
    changePopupInfoValues,
    closeByEscape,
    closePopup,
    closePopupOverlay, handleFormSubmitAvatar,
    handleFormSubmitInfo,
    handleFormSubmitMesto,
    openPopup
} from "./components/modal";
import {cardsLoading, getProfile} from "./components/api";


const page = document.querySelector(".page");

const profile = page.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileAddButton = profile.querySelector(".profile__add-button");
const profileButtonEditAvatar = profile.querySelector(".profile__avatar-button");

const popupInfo = page.querySelector("#popup-info");
const popupInfoForm = popupInfo.querySelector(".popup__form");
const popupInfoCloseButton = popupInfo.querySelector(".popup__close-button");

const popupMesto = page.querySelector("#popup-mesto");
const popupAvatar = page.querySelector("#popup-avatar");
const popupAvatarCloseButton = popupAvatar.querySelector(".popup__close-button");
const popupMestoForm = popupMesto.querySelector(".popup__form");
const popupMestoCloseButton = popupMesto.querySelector(".popup__close-button");
const formAvatar = popupAvatar.querySelector(".popup__form")

const popupImage = page.querySelector(".popup-image");
const popupImageCloseButton = popupImage.querySelector(".popup__close-button");

const popupList = page.querySelectorAll(".popup");

profileEditButton.addEventListener("click", () => {
    changePopupInfoValues(popupInfo, profile)
    openPopup(popupInfo)
});
profileButtonEditAvatar.addEventListener("click", () => {
    openPopup(popupAvatar);
})
popupAvatarCloseButton.addEventListener("click", () => closePopup(popupAvatar));
profileAddButton.addEventListener("click", () => openPopup(popupMesto));
popupMestoCloseButton.addEventListener("click", () => closePopup(popupMesto));
popupMestoForm.addEventListener("submit", (event) => handleFormSubmitMesto(event));
popupInfoCloseButton.addEventListener("click", () => closePopup(popupInfo));
popupInfoForm.addEventListener("submit", (event) => handleFormSubmitInfo(event));
popupImageCloseButton.addEventListener("click", () => closePopup(popupImage));
formAvatar.addEventListener("submit", (event) => handleFormSubmitAvatar(event));


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
    popupAvatar.classList.remove("popup_preload");
    popupMesto.classList.remove("popup_preload");
    popupInfo.classList.remove("popup_preload");
    popupImage.classList.remove("popup_preload");
}, 500);

getProfile();
cardsLoading();
