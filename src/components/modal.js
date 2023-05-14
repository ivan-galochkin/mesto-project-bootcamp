import {createCard} from "./card";

const page = document.querySelector(".page");


const profile = page.querySelector(".profile");
const profileHeader = profile.querySelector(".profile__header");
const profileSubtitle = profile.querySelector(".profile__subtitle");


const popupImage = page.querySelector(".popup-image");

const popupImagePicture = popupImage.querySelector(".popup-image__image");
const popupImageSubtitle = popupImage.querySelector(".popup-image__subtitle");

const elements = page.querySelector(".elements");

const popupMesto = page.querySelector("#popup-mesto");


const popupMestoForm = popupMesto.querySelector(".popup__form");


const popupMestoNameInput = popupMestoForm.querySelector("#popup-mesto-name__input")
const popupMestoLinkInput = popupMestoForm.querySelector("#popup-mesto-link__input")

const popupInfo = page.querySelector("#popup-info");

const popupInfoNameInput = popupInfo.querySelector("#popup-info-name__input");
const popupInfoProfessionInput = popupInfo.querySelector("#popup-info-profession__input");


export const closePopupOverlay = function (popupList) {
    popupList.forEach((popupElement) => {
        popupElement.addEventListener('click', function (evt) {
            if (evt.target === evt.currentTarget) {
                closePopup(popupElement);
            }
        })
    })
}

export function handleFormSubmitInfo(event) {
    event.preventDefault();
    profileHeader.textContent = popupInfoNameInput.value;
    profileSubtitle.textContent = popupInfoProfessionInput.value;
    closePopup(popupInfo);
}

export function handleFormSubmitMesto(event) {
    event.preventDefault();
    createCard(popupMestoNameInput.value, popupMestoLinkInput.value, elements.children.length - 1, elements);
    event.target.reset();
    closePopup(popupMesto);
}

export function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}


export function closePopup(popup) {
    document.removeEventListener('keydown', closeByEscape);
    popup.classList.remove("popup_opened");
}

export function openPopup(popup) {
    document.addEventListener('keydown', closeByEscape);
    popup.classList.add("popup_opened");
}

export function openImagePopup(title, link) {
    popupImagePicture.src = link;
    popupImagePicture.alt = title;
    popupImageSubtitle.textContent = title;
    openPopup(popupImage);
}


export function changePopupInfoValues(popupInfo, profile) {
    const name = popupInfo.querySelector("#popup-info-name__input")
    const profession = popupInfo.querySelector("#popup-info-profession__input")
    name.value = profile.querySelector(".profile__header").textContent;
    profession.value = profile.querySelector(".profile__subtitle").textContent;
}
