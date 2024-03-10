// **КНОПКИ В HERO SECTION**
document
  .getElementById('left-hero-button')
  .addEventListener('click', function () {
    // координаты верхней границы секции
    const lectionSection = document.getElementById('lection');
    const lectionSectionTop = lectionSection.offsetTop;

    // скролл к секции
    window.scrollTo({
      top: lectionSectionTop,
      behavior: 'smooth',
    });
  });
document
  .getElementById('right-hero-button')
  .addEventListener('click', function () {
    // координаты верхней границы секции
    const participantsSection = document.getElementById('participants');
    const participantsSectionTop = participantsSection.offsetTop;

    // скролл к секции
    window.scrollTo({
      top: participantsSectionTop,
      behavior: 'smooth',
    });
  });

// **МОБИЛЬНАЯ КАРУСЕЛЬ**
function initMobileCarousel() {
  const carousel = document.querySelector("[data-target='carousel']");
  const card = carousel.querySelector("[data-target='card']");
  const leftButton = document.querySelector("[data-action='left']");
  const rightButton = document.querySelector("[data-action='right']");
  const carouselWidth = carousel.offsetWidth;
  const cardStyle = card.currentStyle || window.getComputedStyle(card);
  const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);
  const cardCount = carousel.querySelectorAll("[data-target='card']").length;
  let offset = 0;
  const maxX = -(
    cardCount * carouselWidth +
    cardMarginRight * cardCount -
    carouselWidth -
    cardMarginRight
  );
  let autoScrollInterval;
  // запуск автоматического скролла
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      right();
    }, 4000); // скролл каждые 4 сек.
  }
  // остановка автоматического скролла
  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }
  // обработчики событий для кнопок "влево" и "вправо"
  leftButton.addEventListener('click', function () {
    stopAutoScroll();
    left();
  });
  rightButton.addEventListener('click', function () {
    stopAutoScroll();
    right();
  });

  const carouselPosition = document.querySelector('.current-card'); // элемент для отображения текущей карточки

  function updateCarouselPosition() {
    const currentCardIndex = Math.floor(
      Math.abs(offset) / (carouselWidth + cardMarginRight)
    ); // индекс текущей карточки
    carouselPosition.textContent = `${currentCardIndex + 1}`; // обновление текста элемента
  }

  function left() {
    stopAutoScroll(); // остановка автоскролла перед прокруткой
    if (offset !== 0) {
      offset += carouselWidth + cardMarginRight;
      carousel.style.transform = `translateX(${offset}px)`;
    } else {
      offset = maxX;
      carousel.style.transform = `translateX(${offset}px)`;
    }
    updateCarouselPosition(); // обновление позиции карусели
    startAutoScroll(); // возобновление автоскролла
  }
  function right() {
    stopAutoScroll(); // остановка автоскролла перед прокруткой
    if (offset !== maxX) {
      offset -= carouselWidth + cardMarginRight;
      carousel.style.transform = `translateX(${offset}px)`;
    } else {
      offset = 0;
      carousel.style.transform = `translateX(${offset}px)`;
    }
    updateCarouselPosition(); // обновление позиции карусели
    startAutoScroll(); // возобновление автоскролла после прокрутки
  }
  startAutoScroll();
}

// **КАРУСЕЛЬ ДЛЯ ДЕСКТОПА
function initDesktopCarousel() {
  const carousel = document.querySelector("[data-target='carousel']");
  const card = carousel.querySelector("[data-target='card']");
  const leftButton = document.querySelector("[data-action='slideLeft']");
  const rightButton = document.querySelector("[data-action='slideRight']");
  const carouselWidth = carousel.offsetWidth;
  const cardStyle = card.currentStyle || window.getComputedStyle(card);
  const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);
  const cardCount = carousel.querySelectorAll("[data-target='card']").length;
  let offset = 0;
  const maxX = -(
    (cardCount / 3) * carouselWidth +
    cardMarginRight * (cardCount / 3) -
    carouselWidth -
    cardMarginRight
  );
  let autoScrollInterval; // интервал автоматического скролла
  // запуск автоматического скролла
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      slideRight();
    }, 4000); // скролл каждые 4 сек.
  }
  // остановка автоматического скролла
  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }
  // обработчики событий для кнопок "влево" и "вправо"
  leftButton.addEventListener('click', function () {
    stopAutoScroll();
    slideLeft();
  });
  rightButton.addEventListener('click', function () {
    stopAutoScroll();
    slideRight();
  });
  /*leftButton.disabled = true; //  Для незацикленной карусели. Отключаем левую кнопку изначально*/
  const carouselPosition = document.querySelector('.current-slide'); // элемент для отображения позиции карусели
  const slideCount = cardCount / 3; // общее количество слайдов (групп карточек)
  // Функция для обновления позиции карусели
  function updateCarouselPosition() {
    const currentSlide = Math.ceil(
      (Math.abs(offset) + carouselWidth) / (carouselWidth * slideCount)
    ); // текущий слайд
    carouselPosition.textContent = `${currentSlide * 3}`; // обновление текста элемента
  }

  /* Для незацикленной карусели. Функция для обновления состояния кнопок. Проверяем, находится ли карусель в начальной позиции. Если да, то отключаем кнопку "влево"; иначе включаем кнопку "влево". Потом проверяем, находится ли карусель в конечной позиции. Если да, то отключаем кнопку "вправо"; иначе включаем кнопку "вправо". 
  function updateButtonsState() {
    if (offset === 0) {
      leftButton.disabled = true;
    } else {
      leftButton.disabled = false;
    }
    if (offset === maxX) {
      rightButton.disabled = true;
    } else {
      rightButton.disabled = false;
    }
  } */

  function slideLeft() {
    stopAutoScroll(); // остановка автоскролла перед прокруткой
    if (offset !== 0) {
      offset += carouselWidth + cardMarginRight;
      carousel.style.transform = `translateX(${offset}px)`;
    } else {
      offset = maxX;
      carousel.style.transform = `translateX(${offset}px)`;
    }
    updateCarouselPosition(); // обновление позиции карусели
    /*updateButtonsState(); // обновление состояния кнопок*/
    startAutoScroll(); // возобновление автоскролла
  }
  function slideRight() {
    stopAutoScroll(); // остановка автоскролла перед прокруткой
    if (offset !== maxX) {
      offset -= carouselWidth + cardMarginRight;
      carousel.style.transform = `translateX(${offset}px)`;
    } else {
      offset = 0;
      carousel.style.transform = `translateX(${offset}px)`;
    }
    updateCarouselPosition(); // обновление позиции карусели
    /*updateButtonsState(); // обновление состояния кнопок*/
    startAutoScroll(); // возобновление автоскролла после прокрутки
  }
  startAutoScroll();
}

// Запуск нужной карусели в зависимости от ширины экрана
if (window.innerWidth <= 1024) {
  initMobileCarousel();
} else {
  initDesktopCarousel();
}
