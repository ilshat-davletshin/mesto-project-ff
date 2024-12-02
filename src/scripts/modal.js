// Функция открытия попапа
// Добавляет класс, чтобы сделать попап видимым, и добавляет обработчик для закрытия по клавише Escape.
export function openPopup(popup) {
  // Добавляем класс, для отображения попапа
  popup.classList.add("popup_is-opened");
  // Добавляем обработчик для закрытия попапа при нажатии клавиши Escape
  document.addEventListener("keydown", closePopupOnEscape);
}

// Функция закрытия попапа
// Убирает класс, скрывающий попап, и удаляет обработчик закрытия по клавише Escape
export function closePopup(popup) {
  // Удаляем класс, отвечающий за отображение попапа
  popup.classList.remove("popup_is-opened");
  // Удаляем обработчик клавиши Escape
  document.removeEventListener("keydown", closePopupOnEscape);
}

// Функция обработки нажатия клавиши Escape для закрытия попапа
// Проверяет, открыт ли какой-либо попап, и закрывает его
export function closePopupOnEscape(evt) {
  // Проверяем, что нажата клавиша Escape
  if (evt.key === "Escape") {
    // Находим текущий открытый попап
    const openedPopup = document.querySelector(".popup_is-opened");
    // Если попап найден, вызываем функцию его закрытия
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Функция для закрытия попапа при клике по оверлею, за пределы модального окна
// Закрывает попап, если клик был совершен на его оверлей.
export function closePopupByOverlay(evt) {
  // Проверяем, был ли клик на самом попапе (оверлее)
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}
