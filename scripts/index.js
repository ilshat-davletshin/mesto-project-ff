// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");

let addedCards = [];
let addedCardCount = 0;

// @todo: Функция создания карточки
function createCard(data, index) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  deleteButton.addEventListener("click", () =>
    handleCardDelete(cardElement, index)
  );

  return cardElement;
}

// @todo: Функция удаления карточки
function handleCardDelete(cardElement, index) {
  cardElement.remove();
  addedCards[index] = false;
  addedCardCount--;

  addButton.style.display = "block";
}

// @todo: Вывести карточки на страницу
addButton.addEventListener("click", () => {
  for (let i = 0; i < initialCards.length; i++) {
    if (!addedCards[i]) {
      const cardData = initialCards[i];
      const newCardElement = createCard(cardData, i);
      placesList.append(newCardElement);

      addedCards[i] = true;
      addedCardCount++;

      if (addedCardCount === initialCards.length) {
        addButton.style.display = "none";
      }

      break;
    }
  }
});
