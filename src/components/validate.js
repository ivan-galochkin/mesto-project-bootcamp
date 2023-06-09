export const setValidation = function (settings, page) {
    const forms = Array.from(page.querySelectorAll(settings.formSelector));
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

export const isValid = (formElement, inputElement, settings) => {
    console.log(inputElement.value)
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
};

export const showInputError = (formElement, inputElement, errorMessage, settings) => {
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

export const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(settings.inactiveButtonClass);
        buttonElement.setAttribute("disabled", true);
    } else {
        buttonElement.removeAttribute("disabled");
        buttonElement.classList.remove(settings.inactiveButtonClass);
    }
};
