const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationObj
) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );
  inputElement.classList.add(validationObj.inputErrorClass);
  errorElement.classList.add(validationObj.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, validationObj) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );
  inputElement.classList.remove(validationObj.inputErrorClass);
  errorElement.classList.remove(validationObj.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, validationObj) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationObj
    );
  } else {
    hideInputError(formElement, inputElement, validationObj);
  }
};

const toggleButtonState = (inputList, buttonElement, validationObj) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationObj.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationObj.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

const setEventListeners = (formElement, validationObj) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationObj.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationObj.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationObj);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, validationObj);
      toggleButtonState(inputList, buttonElement, validationObj);
    });
  });
};

export const enableValidation = (validationObj) => {
  const formList = Array.from(
    document.querySelectorAll(validationObj.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, validationObj);
  });
};

export const clearValidation = (formElement, validationObj) => {
  const buttonElement = formElement.querySelector(
    validationObj.submitButtonSelector
  );
  const inputList = Array.from(
    formElement.querySelectorAll(validationObj.inputSelector)
  );
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationObj);
  });
  toggleButtonState(inputList, buttonElement, validationObj);
};
