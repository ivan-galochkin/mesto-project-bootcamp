export const setValidation = function (settings, page) {
    const forms = Array.from(page.querySelectorAll(".popup__form"));
    forms.forEach((form) => {
        setEventListener(form, settings);
    })
}

const setEventListener = function (formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const button = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, button, settings);
    inputList.forEach((input) => {
        isValid(formElement, input, settings);
    });
    inputList.forEach((input) => {
        input.addEventListener('input', function () {
            toggleButtonState(inputList, button, settings);
            isValid(formElement, input, settings);
        })
    })
}
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const isValid = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
};

const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
};

const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(settings.inactiveButtonClass);
    }
};
