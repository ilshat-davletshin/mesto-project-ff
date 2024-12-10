// Импортируем необходимые стили и модули
import "../pages/index.css"; // Подключение основного CSS файла
import { createCard, handleCardDelete, handleLikeClick } from "./card.js"; // Импорт функций для создания и управления карточками
import { openPopup, closePopup, closePopupByOverlay } from "./modal.js"; // Импорт функций для работы с попапами
import { enableValidation, clearValidation } from "./validation.js"; // Импорт функций для работы с валидацией полей ввода
import { validationObj } from "./validationObj.js";
import {
  getUserData,
  getInitialCards,
  updateProfile,
  updateAvatar,
  addNewCard,
} from "./api.js"; // Импорт функций для работы с API

// Получаем элементы из DOM
// Список карточек
const placesList = document.querySelector(".places__list"); // Список с локациями, куда будут добавляться карточки

// Попапы
const popupEdit = document.querySelector(".popup_type_edit"); // Попап для редактирования профиля
const popupNewCard = document.querySelector(".popup_type_new-card"); // Попап для создания новой карточки
const popupNewAvatar = document.querySelector(".popup_type_new-avatar"); // Попап для смены аватара

//Кнопки форм
const profileEditButton = popupEdit.querySelector(".popup__button");
const newAvatarButton = popupNewAvatar.querySelector(".popup__button");
const newCardButton = popupNewCard.querySelector(".popup__button");

// Формы
const newCardForm = document.querySelector(".form_type_new-card"); // Форма для создания новой карточки
const formElement = document.querySelector(".form_type_edit-profile"); // Форма редактирования профиля
const popupNewAvatarForm = document.forms["new-avatar"]; // Форма смены аватара

// Поля ввода
const newCardNameInput = newCardForm.querySelector(
  ".popup__input_type_card-name"
); // Поле ввода имени новой карточки
const nameInput = formElement.querySelector(".popup__input_type_name"); // Поле ввода имени в форме редактирования профиля
const newCardLinkInput = newCardForm.querySelector(".popup__input_type_url"); // Поле ввода ссылки на изображение новой карточки
const jobInput = formElement.querySelector(".popup__input_type_description"); // Поле ввода описания в форме редактирования профиля
const editAvatar = popupNewAvatarForm.elements["avatar-link"]; // Поле ввода ссылки для смены аватара

// Элементы профиля, которые отображают имя, описание, аватар, а также кнопки редактирования профиля и сохранения изменений
const profileBlock = document.querySelector(".profile"); // Блок профиля
const profileName = profileBlock.querySelector(".profile__title"); // Имя пользователя
const profileDescription = profileBlock.querySelector(".profile__description"); // Чем занимается пользователь
const profileImage = profileBlock.querySelector(".profile__image"); // Аватар пользователя
const editButton = profileBlock.querySelector(".profile__edit-button"); // Кнопка редактирования профиля
const addButton = profileBlock.querySelector(".profile__add-button"); // Кнопка сохранения изменений в профиле

// Получаем элементы попапа с изображением
const popupImage = document.querySelector(".popup_type_image"); // Находим попап, предназначенный для отображения изображения
const popupImageContent = popupImage.querySelector(".popup__image"); // Находим элемент изображения внутри попапа
const popupCaption = popupImage.querySelector(".popup__caption"); // Находим подпись для изображения внутри попапа

let userId = null;

Promise.all([getUserData(), getInitialCards()])
  // данные пользователя и массив с карточками
  .then((data) => {
    const userData = data[0];
    const cardsData = data[1];

    userId = userData._id;

    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    return [userId, cardsData];
  })
  .then(([userId, cardsData]) => {
    cardsData.forEach((card) => {
      placesList.append(
        createCard(
          card,
          handleCardDelete,
          handleLikeClick,
          handleImageClick,
          userId
        )
      );
    });
  })
  .catch((err) => {
    console.log("Произошла ошибка при получении данных профиля:", err);
  });

// Функция открытия попапа изображения
// Устанавливает изображение и подпись, а затем открывает попап
function openImagePopup(src, alt) {
  // Устанавливаем ссылку на изображение
  popupImageContent.src = src;
  // Устанавливаем текстовое описание для изображения
  popupImageContent.alt = alt;
  // Устанавливаем текст подписи под изображением
  popupCaption.textContent = alt;
  // Открываем попап с изображением
  openPopup(popupImage);
}

// Функция открытия попапа с изображением при клике на карточку
function handleImageClick(src, alt) {
  // Открывает попап с изображением и подписью
  openImagePopup(src, alt);
}

// Функция инициализации всех попапов
// Добавляет обработчики для закрытия попапов (по кнопке закрытия и при клике на оверлей)
function initPopups() {
  // Находим все элементы попапов
  const popups = document.querySelectorAll(".popup");

  popups.forEach((popup) => {
    // Находим кнопку закрытия внутри попапа
    const closeButton = popup.querySelector(".popup__close");
    // Добавляем обработчик для кнопки закрытия
    closeButton.addEventListener("click", () => {
      closePopup(popup);
    });

    popup.addEventListener("mousedown", (e) => {
      closePopupByOverlay(e);
    });
  });
}

// Обработчик клика по кнопке редактирования профиля
// Открывает попап редактирования профиля и заполняет поля текущими значениями
editButton.addEventListener("click", () => {
  // Заполняем поля ввода данными из профиля
  clearValidation(popupEdit, validationObj);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  // Открываем попап редактирования
  openPopup(popupEdit);
});

// Обработчик клика по кнопке добавления новой карточки
// Открывает попап для добавления новой карточки
addButton.addEventListener("click", (e) => {
  newCardNameInput.value = "";
  newCardLinkInput.value = "";
  clearValidation(popupNewCard, validationObj);
  openPopup(popupNewCard);
});

// Открывает попап для изменения аватара пользователя
profileImage.addEventListener("click", () => {
  editAvatar.value = "";
  clearValidation(popupNewAvatar, validationObj);
  openPopup(popupNewAvatar);
});

function updateProfileData(e) {
  e.preventDefault();

  const name = nameInput.value;
  const about = jobInput.value;

  saveRequest(true, profileEditButton);

  updateProfile(name, about)
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popupEdit);
      formElement.reset();
    })
    .catch((err) => {
      console.log("Произошла ошибка при изменении данных профиля:", err);
    })
    .finally(() => {
      saveRequest(false, profileEditButton);
      formElement.reset();
    });
}

formElement.addEventListener("submit", updateProfileData);

function editAvatarImage(e) {
  e.preventDefault();

  const avatarLink = editAvatar.value;

  saveRequest(true, newAvatarButton);
  updateAvatar(avatarLink)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closePopup(popupNewAvatar);
      popupNewAvatarForm.reset();
    })
    .catch((err) =>
      console.log("Произошла ошибка при попытке изменить аватар:", err)
    )
    .finally(() => {
      saveRequest(false, newAvatarButton);
      popupNewAvatarForm.reset();
    });
}

popupNewAvatarForm.addEventListener("submit", editAvatarImage);

function createNewCard(e) {
  e.preventDefault();

  const cardName = newCardNameInput.value;
  const cardLink = newCardLinkInput.value;

  saveRequest(true, newCardButton);
  addNewCard(cardName, cardLink)
    .then((data) => {
      addCard(
        createCard(
          data,
          handleCardDelete,
          handleLikeClick,
          handleImageClick,
          userId
        )
      );
      closePopup(popupNewCard);
      newCardForm.reset();
    })
    .catch((err) =>
      console.log("Произошла ошибка при попытке создать карточку:", err)
    )
    .finally(() => {
      saveRequest(false, newCardButton);
    });
}

function addCard(newCard) {
  placesList.prepend(newCard);
}

newCardForm.addEventListener("submit", createNewCard);

function saveRequest(loader, button) {
  button.textContent = loader ? "Сохранение..." : "Сохранить";
}

enableValidation(validationObj);
initPopups();
