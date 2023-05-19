import {
    popupAvatarInput,
    popupMestoLinkInput,
    popupMestoNameInput
} from "../index";
import {checkResponse} from "./utils";

const config = {
    baseUrl: 'https://nomoreparties.co/v1/exp-mipt-fbc-1',
    headers: {
        authorization: '8bf2e7ea-b387-4df1-bce9-c81af37b4521',
        'Content-Type': 'application/json'
    }
}

export const patchProfile = function (infoName, infoAbout) {
    return fetch(config.baseUrl + '/users/me', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: infoName,
            about: infoAbout
        })
    })
        .then(checkResponse)
}

export const postCard = function () {
    return fetch(config.baseUrl + '/cards', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: popupMestoNameInput.value,
            link: popupMestoLinkInput.value
        })
    })
        .then(checkResponse)
}

export const patchAvatarProfile = function () {
    return fetch(config.baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: popupAvatarInput.value
        })
    })
        .then(checkResponse)
}

export const getProfile = function () {
    return fetch(config.baseUrl + '/users/me', {
        headers: config.headers,
    })
        .then(checkResponse)
}

export const cardsLoading = function () {
    return fetch(config.baseUrl + '/cards', {
        headers: config.headers
    })
        .then(checkResponse)
}

export const deleteCard = function (cardId) {
    return fetch(config.baseUrl + '/cards/' + cardId, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(checkResponse)
}
export const putLike = function (cardLike) {
    const cardId = cardLike.closest(".element").id;
    return fetch(config.baseUrl + '/cards/likes/' + cardId, {
        method: 'PUT',
        headers: config.headers
    })
        .then(checkResponse)
}

export const deleteLike = function (cardLike) {
    const cardId = cardLike.closest(".element").id;
    return fetch(config.baseUrl + '/cards/likes/' + cardId, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(checkResponse)
}
