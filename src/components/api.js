import {closePopup, editProfile} from "./modal";
import {createCard} from "./card";

const page = document.querySelector(".page");

const profile = page.querySelector(".profile");

const elements = page.querySelector(".elements");

const popupMesto = page.querySelector("#popup-mesto");
const popupInfo = page.querySelector("#popup-info");
const popupAvatar = page.querySelector("#popup-avatar");

const profileAvatar = profile.querySelector(".profile__avatar");

const popupMestoForm = popupMesto.querySelector(".popup__form");

const popupMestoNameInput = popupMestoForm.querySelector("#popup-mesto-name__input")
const popupMestoLinkInput = popupMestoForm.querySelector("#popup-mesto-link__input")
const popupAvatarInput = popupAvatar.querySelector("#popup-avatar__input")
const popupInfoNameInput = popupInfo.querySelector("#popup-info-name__input");
const popupInfoProfessionInput = popupInfo.querySelector("#popup-info-profession__input");

const popupInfoButton = popupInfo.querySelector(".popup__button");
const popupAvatarButton = popupAvatar.querySelector(".popup__button");
const popupMestoButton = popupMesto.querySelector(".popup__button");

export const patchProfile = function () {
    return fetch('https://nomoreparties.co/v1/exp-mipt-fbc-1/users/me', {
        method: 'PATCH',
        headers: {
            authorization: '8bf2e7ea-b387-4df1-bce9-c81af37b4521',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: popupInfoNameInput.value,
            about: popupInfoProfessionInput.value
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(data => editProfile(data))
        .then(() => closePopup(popupInfo))
        .then(() => popupInfoButton.textContent = "Сохранить")
        .catch((err) => console.log(err))
}

export const postCard = function (event) {
    return fetch('https://nomoreparties.co/v1/exp-mipt-fbc-1/cards', {
        method: 'POST',
        headers: {
            authorization: '8bf2e7ea-b387-4df1-bce9-c81af37b4521',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: popupMestoNameInput.value,
            link: popupMestoLinkInput.value
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(data => createCard(data.name, data.link, data._id, 0, data.owner))
        .then(() => closePopup(popupMesto))
        .then(() => popupMestoButton.textContent = "Создать")
        .then(() => event.target.reset())
        .catch((err) => console.log(err))
}

export const patchAvatarProfile = function (event) {
    const avatarSrc = popupAvatarInput.value;
    return fetch('https://nomoreparties.co/v1/exp-mipt-fbc-1/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: '8bf2e7ea-b387-4df1-bce9-c81af37b4521',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: popupAvatarInput.value
        })
    })
        .then(res => {
            if (res.ok) {
                return;
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(() => profileAvatar.src = avatarSrc)
        .then(() => closePopup(popupAvatar))
        .then(() => popupAvatarButton.textContent = "Сохранить")
        .then(() => event.target.reset())
        .catch((err) => console.log(err))
}

export const getProfile = function () {
    return fetch('https://nomoreparties.co/v1/exp-mipt-fbc-1/users/me', {
        headers: {
            authorization: '8bf2e7ea-b387-4df1-bce9-c81af37b4521'
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(data => editProfile(data))
        .catch((err) => console.log(err))
}

export const cardsLoading = function () {
    return fetch('https://nomoreparties.co/v1/exp-mipt-fbc-1/cards', {
        headers: {
            authorization: '8bf2e7ea-b387-4df1-bce9-c81af37b4521'
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(data => data.slice().reverse().forEach((dataCard) => createCard(dataCard.name, dataCard.link, dataCard._id, dataCard.likes.length, dataCard.owner)))
        .catch((err) => console.log(err))
}

export const deleteCard = function (cardId) {
    return fetch('https://nomoreparties.co/v1/exp-mipt-fbc-1/cards/' + cardId, {
        method: 'DELETE',
        headers: {
            authorization: '8bf2e7ea-b387-4df1-bce9-c81af37b4521',
        }
    })
        .then(res => {
            if (res.ok) {
                return;
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(() => elements.querySelector(`[id='${cardId}']`).remove())
        .catch((err) => console.log(err))
}

export const putLike = function (cardLike) {
    const cardId = cardLike.parentElement.parentElement.parentElement.id;
    const cardNumberLike = cardLike.parentElement.lastElementChild;
    return fetch('https://nomoreparties.co/v1/exp-mipt-fbc-1/cards/likes/' + cardId, {
        method: 'PUT',
        headers: {
            authorization: '8bf2e7ea-b387-4df1-bce9-c81af37b4521',
        }
    })
        .then(res => {
            if (res.ok) {
                return;
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(() => cardLike.classList.add("element__like_active"))
        .then(() => cardNumberLike.textContent = Number(cardNumberLike.textContent) + 1)
        .catch((err) => console.log(err))
}

export const deleteLike = function (cardLike) {
    const cardId = cardLike.parentElement.parentElement.parentElement.id;
    const cardNumberLike = cardLike.parentElement.lastElementChild;
    return fetch('https://nomoreparties.co/v1/exp-mipt-fbc-1/cards/likes/' + cardId, {
        method: 'DELETE',
        headers: {
            authorization: '8bf2e7ea-b387-4df1-bce9-c81af37b4521',
        }
    })
        .then(res => {
            if (res.ok) {
                return;
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(() => cardLike.classList.remove("element__like_active"))
        .then(() => cardNumberLike.textContent = Number(cardNumberLike.textContent) - 1)
        .catch((err) => console.log(err))
}
