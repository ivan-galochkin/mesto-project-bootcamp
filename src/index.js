import "./styles/index.css"
import {setValidation} from "./components/validate";
import {
    changePopupInfoValues,
    closePopup,
    closePopupOverlay, editProfile, handleFormSubmitAvatar,
    handleFormSubmitInfo,
    handleFormSubmitMesto,
    openPopup
} from "./components/modal";
import {cardsLoading, getProfile} from "./components/api";
import {createCard} from "./components/card";


export const page = document.querySelector(".page");

export const profile = page.querySelector(".profile");
export const profileEditButton = profile.querySelector(".profile__edit-button");
export const profileAddButton = profile.querySelector(".profile__add-button");
export const profileButtonEditAvatar = profile.querySelector(".profile__avatar-button");

export const popupInfo = page.querySelector("#popup-info");
export const popupInfoForm = popupInfo.querySelector(".popup__form");
export const popupInfoCloseButton = popupInfo.querySelector(".popup__close-button");

export const popupMesto = page.querySelector("#popup-mesto");
export const popupAvatar = page.querySelector("#popup-avatar");
export const popupAvatarCloseButton = popupAvatar.querySelector(".popup__close-button");
export const popupMestoForm = popupMesto.querySelector(".popup__form");
export const popupMestoCloseButton = popupMesto.querySelector(".popup__close-button");
export const formAvatar = popupAvatar.querySelector(".popup__form")

export const popupImage = page.querySelector(".popup-image");
export const popupImageCloseButton = popupImage.querySelector(".popup__close-button");
export const elementTemplate = page.querySelector("#element").content;

export const popupList = page.querySelectorAll(".popup");
export const profileName = profile.querySelector(".profile__header");
export const profileDescription = profile.querySelector(".profile__subtitle");
export const popupImagePicture = popupImage.querySelector(".popup-image__image");
export const popupImageSubtitle = popupImage.querySelector(".popup-image__subtitle");

export const elements = page.querySelector(".elements");
export const profileAvatar = profile.querySelector(".profile__avatar");

export const popupMestoNameInput = popupMestoForm.querySelector("#popup-mesto-name__input")
export const popupMestoLinkInput = popupMestoForm.querySelector("#popup-mesto-link__input")
export const popupAvatarInput = popupAvatar.querySelector("#popup-avatar__input")
export const popupInfoNameInput = popupInfo.querySelector("#popup-info-name__input");
export const popupInfoProfessionInput = popupInfo.querySelector("#popup-info-profession__input");

export const popupInfoButton = popupInfo.querySelector(".popup__button");
export const popupAvatarButton = popupAvatar.querySelector(".popup__button");
export const popupMestoButton = popupMesto.querySelector(".popup__button");

profileEditButton.addEventListener("click", () => {
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


export const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error'
}

closePopupOverlay(popupList);


setTimeout(function () {
    popupAvatar.classList.remove("popup_preload");
    popupMesto.classList.remove("popup_preload");
    popupInfo.classList.remove("popup_preload");
    popupImage.classList.remove("popup_preload");
}, 500);


let userData;
let cards;
Promise.all([getProfile(), cardsLoading()])
    .then(values => ([userData, cards] = values))
    .then(([userData, cards]) => {
        editProfile(userData)
        cards.slice().reverse().forEach((dataCard) => createCard(dataCard.name, dataCard.link, dataCard._id, dataCard.likes, dataCard.owner))
        changePopupInfoValues(popupInfo, profile)
        setValidation(settings, page)
    })
    .catch((err) => console.log(err))
;

