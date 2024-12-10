import { addLike, deleteCard, removeLike } from "./api.js";

// Функция создания карточки
// принимает 4 параметра:
// data - объект с данными карточки (name, link),
// handleCardDelete - функция-обработчик для удаления карточки,
// handleLikeClick - функция-обработчик для переключения состояния лайка,
// handleImageClick - функция-обработчик для открытия изображения в полноэкранном режиме.
export function createCard(
  data,
  handleCardDelete,
  handleLikeClick,
  handleImageClick,
  userId
) {
  // Получаем шаблон карточки из DOM (template с id "card-template")
  const cardTemplate = document.querySelector("#card-template").content;
  // Клонируем содержимое шаблона, создавая новый элемент карточки
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  // Находим элементы карточки: изображение, заголовок, кнопки удаления и лайка
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  const cardId = data._id;
  const cardOwnerId = data.owner._id;

  const hasLike = data.likes.some((likes) => likes._id === userId);

  if (hasLike) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  // Устанавливаем изображение карточки
  // Используем данные из объекта `data`: ссылка для src и описание/название для alt
  cardImage.src = data.link;
  cardImage.alt = data.name;
  // Устанавливаем текст заголовка карточки
  cardTitle.textContent = data.name;
  likeCounter.textContent = data.likes.length;

  isCardOwner(userId, cardOwnerId, deleteButton);

  // Добавляем обработчик на кнопку удаления карточки
  deleteButton.addEventListener("click", () => {
    handleCardDelete(cardId, cardElement);
  });

  // Добавляем обработчик на кнопку лайка
  likeButton.addEventListener("click", (e) => {
    handleLikeClick(e, cardId, likeCounter);
  });

  // Добавляем обработчик на изображение карточки
  // При клике вызываем функцию `handleImageClick`, передавая ссылку и имя для изображения
  cardImage.addEventListener("click", () =>
    handleImageClick(data.link, data.name)
  );

  // Возвращаем готовый элемент карточки для последующего добавления в DOM
  return cardElement;
}

// Функция удаления карточки
export function handleCardDelete(cardId, cardElement) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) =>
      console.error("Произошла ошибка при удалении карточки:", err)
    );
}

// Функция обработки клика на кнопку лайка
export function handleLikeClick(e, cardId, likeCounter) {
  const likeButton = e.target.classList.contains("card__like-button");
  const hasLike = e.target.classList.contains("card__like-button_is-active");

  if (likeButton && !hasLike) {
    e.target.classList.toggle("card__like-button_is-active");
    addLike(cardId)
      .then((data) => {
        likeCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log("Произошла ошибка при попытке поставить лайк:", err);
        e.target.classList.remove("card__like-button_is-active");
      });
  } else if (likeButton && hasLike) {
    e.target.classList.remove("card__like-button_is-active");
    removeLike(cardId)
      .then((data) => {
        likeCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log("Произошла ошибка при попытке удалить лайк:", err);
        e.target.classList.add("card__like-button_is-active");
      });
  }
}

function isCardOwner(userId, cardOwnerId, deleteButton) {
  if (cardOwnerId !== userId) {
    deleteButton.disabled = true;
    deleteButton.style.display = "none";
  }
}
