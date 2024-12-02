// Импортируем необходимые стили и модули
import "../pages/index.css"; // Подключение основного CSS файла
// Импорт данных карточек
import { initialCards } from "./cards.js";
// Импорт функций для создания и управления карточками
import { createCard, handleCardDelete, handleLikeClick } from "./card.js";
// Импорт функций для работы с попапами
import {
  openPopup,
  closePopup,
  openImagePopup,
  closePopupByOverlay,
} from "./modal.js";

// Получаем элементы из DOM
// Список с локациями, куда будут добавляться карточки
const placesList = document.querySelector(".places__list");
// Попап для редактирования профиля
const popupEdit = document.querySelector(".popup_type_edit");
// Попап для создания новой карточки
const popupNewCard = document.querySelector(".popup_type_new-card");
// Кнопка редактирования профиля
const editButton = document.querySelector(".profile__edit-button");
// Кнопка добавления новой карточки
const addButton = document.querySelector(".profile__add-button");
// Форма для создания новой карточки
const newCardForm = document.querySelector(".form_type_new-card");
// Поле ввода имени новой карточки
const newCardNameInput = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
// Поле ввода ссылки на изображение новой карточки
const newCardLinkInput = newCardForm.querySelector(".popup__input_type_url");
// Форма редактирования профиля
const formElement = document.querySelector(".form_type_edit-profile");
// Поле ввода имени в форме редактирования профиля
const nameInput = formElement.querySelector(".popup__input_type_name");
// Поле ввода описания в форме редактирования профиля
const jobInput = formElement.querySelector(".popup__input_type_description");
// Элементы профиля, которые отображают имя и описание
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Функция открытия попапа с изображением при клике на карточку
function handleImageClick(src, alt) {
  // Открывает попап с изображением и подписью
  openImagePopup(src, alt);
}

// Создание начальных карточек и добавление их на страницу
initialCards.forEach((data) => {
  // Для каждой карточки создаем HTML элемент
  const cardElement = createCard(
    // Передаем данные карточки
    data,
    // Передаем обработчик удаления карточки
    handleCardDelete,
    // Передаем обработчик лайков
    handleLikeClick,
    // Передаем обработчик клика на изображение
    handleImageClick
  );
  // Добавляем карточку в список на странице
  placesList.append(cardElement);
});

// Функция инициализации всех попапов
// Добавляет обработчики для закрытия попапов (по кнопке закрытия и при клике на оверлей)
function initPopups() {
  // Находим все элементы попапов
  const popups = document.querySelectorAll(".popup");

  popups.forEach((popup) => {
    // Находим кнопку закрытия внутри попапа
    const closeButton = popup.querySelector(".popup__close");

    // Добавляем обработчик для кнопки закрытия
    if (closeButton) {
      closeButton.addEventListener("click", () => closePopup(popup));
    }

    // Добавляем обработчик для кликов по оверлею
    popup.addEventListener("mousedown", closePopupByOverlay);
  });
}

// Инициализация всех попапов на странице (обработчики закрытия, клавиша Escape и т.д.)
initPopups();

// Обработчик клика по кнопке редактирования профиля
// Открывает попап редактирования профиля и заполняет поля текущими значениями
editButton.addEventListener("click", () => {
  // Заполняем поля ввода данными из профиля
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  // Открываем попап редактирования
  openPopup(popupEdit);
});

// Обработчик клика по кнопке добавления новой карточки
// Открывает попап для добавления новой карточки
addButton.addEventListener("click", () => openPopup(popupNewCard));

// Обработчик отправки формы для создания новой карточки
// При отправке формы создается новая карточка, которая добавляется в начало списка
newCardForm.addEventListener("submit", (evt) => {
  // Отменяем стандартное поведение формы (перезагрузку страницы)
  evt.preventDefault();

  // Получаем данные новой карточки из полей формы
  const newCardData = {
    name: newCardNameInput.value, // Название карточки
    link: newCardLinkInput.value, // Ссылка на изображение для карточки
  };

  // Создаем новую карточку с переданными данными и обработчиками
  const newCardElement = createCard(
    // Передаем данные карточки
    newCardData,
    // Передаем обработчик удаления карточки
    handleCardDelete,
    // Передаем обработчик лайков
    handleLikeClick,
    // Передаем обработчик клика на изображение
    handleImageClick
  );

  // Добавляем новую карточку в начало списка
  placesList.prepend(newCardElement);

  // Закрываем попап с добавлением карточки
  closePopup(popupNewCard);
  // Очищаем форму для создания карточки
  newCardForm.reset();
});

// Обработчик отправки формы редактирования профиля
// Обновляет данные профиля с новыми значениями из полей ввода
function handleFormSubmit(evt) {
  // Отменяем стандартное поведение формы (перезагрузку страницы)
  evt.preventDefault();

  // Обновляем имя и описание в профиле
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  // Закрываем попап редактирования
  closePopup(popupEdit);
}

// Добавляем обработчик отправки формы редактирования профиля
formElement.addEventListener("submit", handleFormSubmit);
