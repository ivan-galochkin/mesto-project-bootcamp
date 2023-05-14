import {openImagePopup} from "./modal";

const page = document.querySelector(".page");


const elementTemplate = page.querySelector("#element").content;
const elements = page.querySelector(".elements");

export function toggleLike(cardLike) {
    cardLike.classList.toggle("element__like_active");
}

export function deleteCard(cardId) {
    console.log(cardId)
    elements.querySelector(`#card-${cardId}`).remove();
}

export function getCard(title, link, index) {
    const card = elementTemplate
        .querySelector(".element")
        .cloneNode(true);
    const cardTitle = card.querySelector(".element__title");
    cardTitle.textContent = title;

    const cardImage = card.querySelector(".element__image")
    card.setAttribute("id", "card-" + index);
    cardImage.src = link;
    cardImage.alt = title;
    cardImage.addEventListener("click", () => openImagePopup(title, link));

    const cardDeleteButton = card.querySelector(".element__delete-button");
    cardDeleteButton.addEventListener("click", () => deleteCard(index));

    const cardLike = card.querySelector(".element__like");
    cardLike.addEventListener("click", () => toggleLike(cardLike));
    return card;
}

export function createCard(title, link, index) {
    const card = getCard(title, link, index);
    elements.prepend(card);
}
