// URL-адреса изображений для карточек
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

// Массив начальных данных карточек
export const initialCards = [
  {
    name: "Архыз", // Название карточки
    link: arhyzImage, // Ссылка на изображение для карточки
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
