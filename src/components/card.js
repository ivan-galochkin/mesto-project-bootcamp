import {openImagePopup} from "./modal";
import {myId} from "./modal";
import {deleteCard, deleteLike, putLike} from "./api";
import {elements, elementTemplate} from "../index";
export function toggleLike(cardLike) {
    const cardNumberLike = cardLike.nextElementSibling;
    if (!cardLike.classList.contains("element__like_active")) {
        putLike(cardLike).then(data => cardNumberLike.textContent = data.likes.length)
            .then(() => cardLike.classList.add("element__like_active"))
            .catch((err) => console.log(err))
        ;
    }
    else {
        deleteLike(cardLike).then(data => cardNumberLike.textContent = data.likes.length)
            .then(() => cardLike.classList.remove("element__like_active"))
            .catch((err) => console.log(err))
        ;
    }
}

export function checkLike(likeList, cardLike) {
    likeList.forEach((userId) => {
        if (userId._id === myId) {
            cardLike.classList.add("element__like_active");
        }
    })
}
export function getCard(title, link, index, likeList, owner) {
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
    cardDeleteButton.addEventListener("click", () => deleteCard(index).then(() => elements.querySelector(`[id='${index}']`).remove())
        .catch((err) => console.log(err))
    );
    if (owner._id !== myId) {
        cardDeleteButton.remove();
    }
    const cardLike = card.querySelector(".element__like");
    cardLike.addEventListener("click", () => toggleLike(cardLike));
    checkLike(likeList, cardLike);
    const cardNumberLike = card.querySelector(".element__like-number");
    cardNumberLike.textContent = likeList.length;
    return card;
}

export function createCard(title, link, index, likeList, owner) {
    const card = getCard(title, link, index, likeList, owner);
    elements.prepend(card);
}

