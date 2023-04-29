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
const popupInfoConfirmButton = popupInfoForm.querySelector(".popup__button");

const popupInfoNameInput = popupInfo.querySelector("#popup-info-name__input");
const popupInfoProfessionInput = popupInfo.querySelector("#popup-info-profession__input");

const popupMesto = page.querySelector("#popup-mesto");
const popupMestoForm = popupMesto.querySelector(".popup__form");
const popupMestoCloseButton = popupMesto.querySelector(".popup__close-button");
const popupMestoCreateButton = popupMestoForm.querySelector(".popup__button");

const popupMestoNameInput = popupMestoForm.querySelector("#popup-mesto-name__input")
const popupMestoLinkInput = popupMestoForm.querySelector("#popup-mesto-link__input")


console.log(page.querySelector("#element"))
const elementTemplate = page.querySelector("#element").content;

popupInfoNameInput.value = "Жак-Ив Кусто"
popupInfoProfessionInput.value = "Исследователь океана"


function handleFormSubmitInfo(event) {
    event.preventDefault();
    profileHeader.textContent = popupInfoNameInput.value;
    profileSubtitle.textContent = popupInfoProfessionInput.value;
}

function handleFormSubmitMesto(event) {
    event.preventDefault();
    createCard(popupMestoNameInput.value, popupMestoLinkInput.value);
}


function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

function openImagePopup(link) {
    //
}


function toggleLike(cardLike) {
    cardLike.classList.toggle("element__like_active");
}

function createCard(title, link) {
    const card = elementTemplate
        .querySelector(".element")
        .cloneNode(true);
    const cardTitle = card.querySelector(".element__title");
    cardTitle.textContent = title;
    const cardImage = card.querySelector(".element__image")
    cardImage.src = link;
    cardImage.alt = title;
    cardImage.addEventListener("click", () => openImagePopup(link));

    const cardLike = card.querySelector(".element__like");
    cardLike.addEventListener("click", () => toggleLike(cardLike));
    elements.append(card);
}

initialCards.forEach((card) => createCard(card.name, card.link))
profileEditButton.addEventListener("click", () => openPopup(popupInfo));

profileAddButton.addEventListener("click", () => openPopup(popupMesto));

popupMestoCloseButton.addEventListener("click", () => closePopup(popupMesto));

popupMestoForm.addEventListener("submit", (event) => handleFormSubmitMesto(event));

popupMestoCreateButton.addEventListener("click", () => closePopup(popupMesto));
popupInfoCloseButton.addEventListener("click", () => closePopup(popupInfo));
popupInfoForm.addEventListener("submit", (event) => handleFormSubmitInfo(event));
popupInfoConfirmButton.addEventListener("click", () => closePopup(popupInfo));
