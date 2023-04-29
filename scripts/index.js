const page = document.querySelector(".page");


const profile = page.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileHeader = profile.querySelector(".profile__header");
const profileSubtitle = profile.querySelector(".profile__subtitle");


const popupInfo = page.querySelector(".popup-info");
const popupInfoForm = popupInfo.querySelector(".popup-info__form");
const popupInfoCloseButton = popupInfo.querySelector(".popup-info__close-button");
const popupInfoConfirmButton = popupInfoForm.querySelector(".popup-info__button");


const popupInfoNameInput = popupInfo.querySelector("#popup-name__input");
const popupInfoProfessionInput = popupInfo.querySelector("#popup-profession__input");

popupInfoNameInput.value = "Жак-Ив Кусто"
popupInfoProfessionInput.value = "Исследователь океана"


function handleFormSubmit(event) {
    event.preventDefault();
    profileHeader.textContent = popupInfoNameInput.value;
    profileSubtitle.textContent = popupInfoProfessionInput.value;
}


function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

profileEditButton.addEventListener("click", () => openPopup(popupInfo))
popupInfoCloseButton.addEventListener("click", () => closePopup(popupInfo));

popupInfoForm.addEventListener("submit", (event) => handleFormSubmit(event));
popupInfoConfirmButton.addEventListener("click", () => closePopup(popupInfo));
