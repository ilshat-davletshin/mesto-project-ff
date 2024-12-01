import "../pages/index.css";
import { initialCards, createCard } from "./cards.js";
import { openPopup, closePopup, initPopups } from "./modal.js";
import {
  handleFormSubmit,
  formElement,
  nameInput,
  jobInput,
  profileName,
  profileDescription,
} from "./profile.js";

const placesList = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const newCardForm = document.querySelector(".form_type_new-card");
const newCardNameInput = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const newCardLinkInput = newCardForm.querySelector(".popup__input_type_url");

initialCards.forEach((data) => {
  const cardElement = createCard(data);
  if (cardElement) {
    placesList.append(cardElement);
  }
});

initPopups();

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEdit);
});

addButton.addEventListener("click", () => openPopup(popupNewCard));

newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newCardData = {
    name: newCardNameInput.value,
    link: newCardLinkInput.value,
  };

  const newCardElement = createCard(newCardData);
  placesList.prepend(newCardElement);

  closePopup(popupNewCard);
  newCardForm.reset();
});
