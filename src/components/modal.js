import {patchAvatarProfile, patchProfile, postCard} from "./api";
import {
    formAvatar,
    popupAvatar,
    popupAvatarButton, popupAvatarInput, popupImage, popupImagePicture, popupImageSubtitle, popupInfo,
    popupInfoButton, popupInfoNameInput, popupInfoProfessionInput, popupMesto,
    popupMestoButton, popupMestoForm, popupMestoLinkInput, popupMestoNameInput,
    profileAvatar,
    profileDescription,
    profileName, settings
} from "../index";
import {createCard} from "./card";
import {isValid, toggleButtonState} from "./validate";

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
    patchProfile(popupInfoNameInput.value, popupInfoProfessionInput.value).then(data => editProfile(data))
        .then(() => closePopup(popupInfo))
        .finally(() => popupInfoButton.textContent = "Сохранить")
        .catch((err) => console.log(err))
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
    postCard(event).then(data => createCard(data.name, data.link, data._id, data.likes, data.owner))
        .then(() => closePopup(popupMesto))
        .then(() => event.target.reset())
        .then(() => toggleButtonState([popupMestoNameInput, popupMestoLinkInput], popupMestoButton, settings))
        .then(() => isValid(popupMestoForm, popupMestoNameInput, settings))
        .then(() => isValid(popupMestoForm, popupMestoLinkInput, settings))
        .catch((err) => console.log(err))
        .finally(() => popupMestoButton.textContent = "Создать")
}
export function handleFormSubmitAvatar(event) {
    event.preventDefault();
    const avatarSrc = popupAvatarInput.value;
    popupAvatarButton.textContent = "Сохранение...";
    patchAvatarProfile(event).then(() => profileAvatar.src = avatarSrc)
        .then(() => closePopup(popupAvatar))
        .then(() => event.target.reset())
        .then(() => toggleButtonState([popupAvatarInput], popupAvatarButton, settings))
        .then(() => isValid(formAvatar, popupAvatarInput, settings))
        .catch((err) => console.log(err))
        .finally(() => popupAvatarButton.textContent = "Сохранить")
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
    popupInfoNameInput.value = profile.querySelector(".profile__header").textContent;
    popupInfoProfessionInput.value = profile.querySelector(".profile__subtitle").textContent;
}


