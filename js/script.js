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

// **БЕГУЩАЯ СТРОКА**
const ticker = document.querySelector('.ticker');
const list = document.querySelector('.ticker__list');

// **МОБИЛЬНАЯ КАРУСЕЛЬ**
function initMobileCarousel() {
  const mobileCarousel = document.querySelector("[data-target='carousel']");
  const part = mobileCarousel.querySelector("[data-target='card']");
  const mobRightButton = document.querySelector("[data-action='slideRight']");

  const partCount = mobileCarousel.querySelectorAll(
    "[data-target='card']"
  ).length;

  let currentIndex = 0; // Индекс текущей карточки

  function nextSlide() {
    // Переходим к следующей карточке
    currentIndex++;
    if (currentIndex >= partCount - 1) {
      currentIndex = partCount - 1; // Ограничиваем индекс, чтобы не выйти за границы карусели
      mobRightButton.disabled = true; // Делаем кнопку "вправо" неактивной на последней карточке
    } else {
      mobRightButton.disabled = false; // Делаем кнопку "вправо" активной, если не на последней карточке
    }

    // Скрываем или показываем кнопку "влево" в зависимости от индекса
    document.querySelector("[data-action='slideLeft']").style.display =
      currentIndex > 0 ? 'block' : 'none';

    // Прокручиваем карусель до нужной карточки
    mobileCarousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // Устанавливаем интервал для автоматической смены карточек
  const intervalId = setInterval(nextSlide, 4000);

  // Обработчик события клика на кнопку "вправо"
  mobRightButton.addEventListener('click', function () {
    clearInterval(intervalId); // Останавливаем автоматическую смену карточек при клике
    nextSlide();
    intervalId = setInterval(nextSlide, 4000); // Запускаем автоматическую смену карточек снова
  });
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
  const carouselPosition = document.querySelector('.carousel-position'); // элемент для отображения позиции карусели
  const slideCount = 2; // общее количество слайдов (групп карточек)
  // Функция для обновления позиции карусели
  function updateCarouselPosition() {
    const currentSlide = Math.ceil(
      (Math.abs(offset) + carouselWidth) / (carouselWidth * slideCount)
    ); // текущий слайд
    carouselPosition.textContent = `${currentSlide * 3} / ${slideCount * 3}`; // обновление текста элемента
  }
  // Функция для обновления состояния кнопок
  function updateButtonsState() {
    // находится ли карусель в начальной позиции
    if (offset === 0) {
      leftButton.disabled = true; // если да, то отключаем кнопку "влево"
    } else {
      leftButton.disabled = false; // иначе включаем кнопку "влево"
    }
    // находится ли карусель в конечной позиции
    if (offset === maxX) {
      rightButton.disabled = true; // если да, то отключаем кнопку "вправо"
    } else {
      rightButton.disabled = false; // иначе включаем кнопку "вправо"
    }
  }
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
    updateButtonsState(); // обновление состояния кнопок
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
    updateButtonsState(); // обновление состояния кнопок
    startAutoScroll(); // возобновление автоскролла после прокрутки
  }
  startAutoScroll();
}

// Запуск нужной карусели в зависимости от ширины экрана
if (window.innerWidth <= 768) {
  initMobileCarousel();
} else {
  initDesktopCarousel();
}
