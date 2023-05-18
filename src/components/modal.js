import {patchAvatarProfile, patchProfile, postCard} from "./api";

const page = document.querySelector(".page");


const profile = page.querySelector(".profile");
const profileName = profile.querySelector(".profile__header");
const profileDescription = profile.querySelector(".profile__subtitle");
const profileAvatar = profile.querySelector(".profile__avatar");

const popupImage = page.querySelector(".popup-image");

const popupMesto = page.querySelector("#popup-mesto");
const popupAvatar = page.querySelector("#popup-avatar");

const popupImagePicture = popupImage.querySelector(".popup-image__image");
const popupImageSubtitle = popupImage.querySelector(".popup-image__subtitle");

const popupInfo = page.querySelector("#popup-info");
const popupMestoButton = popupMesto.querySelector(".popup__button");
const popupAvatarButton = popupAvatar.querySelector(".popup__button");
const popupInfoButton = popupInfo.querySelector(".popup__button");

export let myId = 0;

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
    popupInfoButton.textContent = "Сохранение...";
    patchProfile();
}

export const editProfile = function (data) {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    profileAvatar.src = data.avatar;
    myId = data._id;
}


export function handleFormSubmitMesto(event) {
    event.preventDefault();
    popupMestoButton.textContent = "Сохранение...";
    postCard(event);
}


export function handleFormSubmitAvatar(event) {
    event.preventDefault();
    popupAvatarButton.textContent = "Сохранение...";
    patchAvatarProfile(event);
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


