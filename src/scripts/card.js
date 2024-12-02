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
  handleImageClick
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

  // Устанавливаем изображение карточки
  // Используем данные из объекта `data`: ссылка для src и описание/название для alt
  cardImage.src = data.link;
  cardImage.alt = data.name;
  // Устанавливаем текст заголовка карточки
  cardTitle.textContent = data.name;

  // Добавляем обработчик на кнопку удаления карточки
  // При клике вызываем функцию `handleCardDelete`, передавая текущий элемент карточки
  deleteButton.addEventListener("click", () => handleCardDelete(cardElement));

  // Добавляем обработчик на кнопку лайка
  // При клике вызываем функцию `handleLikeClick`, передавая саму кнопку
  likeButton.addEventListener("click", () => handleLikeClick(likeButton));

  // Добавляем обработчик на изображение карточки
  // При клике вызываем функцию `handleImageClick`, передавая ссылку и имя для изображения
  cardImage.addEventListener("click", () =>
    handleImageClick(data.link, data.name)
  );

  // Возвращаем готовый элемент карточки для последующего добавления в DOM
  return cardElement;
}

// Функция удаления карточки
export function handleCardDelete(cardElement) {
  // Удаляем переданный элемент карточки из DOM
  cardElement.remove();
}

// Функция обработки клика на кнопку лайка
export function handleLikeClick(likeButton) {
  // Добавляем или удаляем класс "card__like-button_is-active" на кнопке
  // Это позволяет переключать состояние лайка (активный или неактивный)
  likeButton.classList.toggle("card__like-button_is-active");
}
