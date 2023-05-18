import {openImagePopup} from "./modal";
import {myId} from "./modal";
import {deleteCard, deleteLike, putLike} from "./api";

const page = document.querySelector(".page");
const elementTemplate = page.querySelector("#element").content;
const elements = page.querySelector(".elements");

export function toggleLike(cardLike) {
    if (!cardLike.classList.contains("element__like_active")) {
        putLike(cardLike);
    }
    else {
        deleteLike(cardLike);
    }
}

export function getCard(title, link, index, numberLike, owner) {
    const card = elementTemplate
        .querySelector(".element")
        .cloneNode(true);
    const cardTitle = card.querySelector(".element__title");
    cardTitle.textContent = title;

    const cardImage = card.querySelector(".element__image")
    card.setAttribute("id", index);
    cardImage.src = link;
    cardImage.alt = title;
    cardImage.addEventListener("click", () => openImagePopup(title, link));
    const cardDeleteButton = card.querySelector(".element__delete-button");
    cardDeleteButton.addEventListener("click", () => deleteCard(index));
    if (owner._id !== myId) {
        cardDeleteButton.remove();
    }
    const cardLike = card.querySelector(".element__like");
    cardLike.addEventListener("click", () => toggleLike(cardLike));
    const cardNumberLike = card.querySelector(".element__like-number");
    cardNumberLike.textContent = numberLike;
    return card;
}

export function createCard(title, link, index, numberLike, owner) {
    const card = getCard(title, link, index, numberLike, owner);
    elements.prepend(card);
}

