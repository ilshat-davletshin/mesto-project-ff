// Конфигурация для работы с API
const apiConfig = {
  // Базовый URL API
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-21",
  headers: {
    // Токен авторизации
    authorization: "1921e30b-45d7-4206-a7dd-9e014407c1b4",
    // Формат контента
    "Content-Type": "application/json",
  },
};

// Функция для обработки ответа сервера
const handleResponse = (res) => {
  if (res.ok) {
    return res.json(); // Возвращаем данные из ответа
  }
  return Promise.reject(`Ошибка: ${res.status}`); // Возвращаем ошибку
};

// Запрос для получения данных пользователя
export const getUserData = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers,
  }).then(handleResponse); // Обрабатываем ответ
};

// Запрос для получения карточек с сервера
export const getInitialCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers,
  }).then(handleResponse); // Обрабатываем ответ
};

// Запрос для редактирования профиля пользователя
export const updateProfile = (name, about) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({ name, about }), // Отправляем обновленные данные профиля
  }).then(handleResponse); // Обрабатываем ответ
};

// Запрос для добавления новой карточки
export const addNewCard = (name, link) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({ name, link }), // Отправляем данные карточки
  }).then(handleResponse); // Обрабатываем ответ
};

// Запрос для удаления карточки
export const deleteCard = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(handleResponse); // Обрабатываем ответ
};

// Запрос для постановки лайка на карточку
export const addLike = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: apiConfig.headers,
  }).then(handleResponse); // Обрабатываем ответ
};

// Запрос для снятия лайка с карточки
export const removeLike = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(handleResponse); // Обрабатываем ответ
};

// Запрос для обновления аватара пользователя
export const updateAvatar = (avatarUrl) => {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({ avatar: avatarUrl }), // Отправляем новый URL аватара
  }).then(handleResponse); // Обрабатываем ответ
};
