const page = document.querySelector(".page");

const profile = page.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileHeader = profile.querySelector(".profile__header");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const profileAddButton = profile.querySelector(".profile__add-button");

const elements = page.querySelector(".elements");

const popupInfo = page.querySelector("#popup-info");
const popupInfoForm = popupInfo.querySelector(".popup__form");
const popupInfoCloseButton = popupInfo.querySelector(".popup__close-button");

const popupInfoNameInput = popupInfo.querySelector("#popup-info-name__input");
const popupInfoProfessionInput = popupInfo.querySelector("#popup-info-profession__input");

const popupMesto = page.querySelector("#popup-mesto");
const popupMestoForm = popupMesto.querySelector(".popup__form");
const popupMestoCloseButton = popupMesto.querySelector(".popup__close-button");

const popupMestoNameInput = popupMestoForm.querySelector("#popup-mesto-name__input")
const popupMestoLinkInput = popupMestoForm.querySelector("#popup-mesto-link__input")

const popupImage = page.querySelector(".popup-image");
const popupImageCloseButton = popupImage.querySelector(".popup__close-button");
const popupImagePicture = popupImage.querySelector(".popup-image__image");
const popupImageSubtitle = popupImage.querySelector(".popup-image__subtitle");

const elementTemplate = page.querySelector("#element").content;

function handleFormSubmitInfo(event) {
    event.preventDefault();
    profileHeader.textContent = popupInfoNameInput.value;
    profileSubtitle.textContent = popupInfoProfessionInput.value;
    closePopup(popupInfo)
}

function handleFormSubmitMesto(event) {
    event.preventDefault();
    createCard(popupMestoNameInput.value, popupMestoLinkInput.value, elements.children.length - 1);
    event.target.reset();
    closePopup(popupInfo);
}


function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

function openImagePopup(title, link) {
    popupImagePicture.src = link;
    popupImagePicture.alt = title;
    popupImageSubtitle.textContent = title;
    openPopup(popupImage);
}


function toggleLike(cardLike) {
    cardLike.classList.toggle("element__like_active");
}

function deleteCard(cardId) {
    elements.querySelector(`#card-${cardId}`).remove();
}

function getCard(title, link, index) {
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

function createCard(title, link, index) {
    const card = getCard(title, link, index);
    elements.prepend(card);
}

initialCards.forEach((card, index) => createCard(card.name, card.link, index))
profileEditButton.addEventListener("click", () => openPopup(popupInfo));

profileAddButton.addEventListener("click", () => openPopup(popupMesto));

popupMestoCloseButton.addEventListener("click", () => closePopup(popupMesto));
popupMestoForm.addEventListener("submit", (event) => handleFormSubmitMesto(event));
popupInfoCloseButton.addEventListener("click", () => closePopup(popupInfo));
popupInfoForm.addEventListener("submit", (event) => handleFormSubmitInfo(event));
popupImageCloseButton.addEventListener("click", () => closePopup(popupImage));

setTimeout(function () {
    popupMesto.classList.remove("popup_preload");
    popupInfo.classList.remove("popup_preload");
    popupImage.classList.remove("popup_preload");
}, 500);
