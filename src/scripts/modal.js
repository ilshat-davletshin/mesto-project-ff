export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupOnEscape);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupOnEscape);
}

function closePopupOnEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export function initPopups() {
  const closePopupButtons = document.querySelectorAll(".popup__close");
  const popups = document.querySelectorAll(".popup");

  closePopupButtons.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => closePopup(popup));
  });

  popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
      if (evt.target === popup) {
        closePopup(popup);
      }
    });
  });
}

const popupImage = document.querySelector(".popup_type_image");
const popupImageContent = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");

export function openImagePopup(src, alt) {
  popupImageContent.src = src;
  popupImageContent.alt = alt;
  popupCaption.textContent = alt;
  openPopup(popupImage);
}
