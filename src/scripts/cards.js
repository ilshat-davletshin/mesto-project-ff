import { openImagePopup } from "./modal.js";

const arhyzImage =
  "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg";
const chelyabinskImage =
  "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg";
const ivanovoImage =
  "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg";
const kamchatkaImage =
  "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg";
const kholmogorskiyImage =
  "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg";
const baykalImage =
  "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg";

export const initialCards = [
  {
    name: "Архыз",
    link: arhyzImage,
  },
  {
    name: "Челябинская область",
    link: chelyabinskImage,
  },
  {
    name: "Иваново",
    link: ivanovoImage,
  },
  {
    name: "Камчатка",
    link: kamchatkaImage,
  },
  {
    name: "Холмогорский район",
    link: kholmogorskiyImage,
  },
  {
    name: "Байкал",
    link: baykalImage,
  },
];

export function createCard(data) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  deleteButton.addEventListener("click", () => cardElement.remove());

  likeButton.addEventListener("click", () => handleLikeClick(likeButton));

  cardImage.addEventListener("click", () =>
    openImagePopup(data.link, data.name)
  );

  return cardElement;
}

export function handleLikeClick(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
