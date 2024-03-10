(function (root, factory) {
  // Проверяем среду выполнения, чтобы понять, как экспортировать модуль
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return factory();
    });
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    // Если нет AMD или CommonJS, просто экспортируем в глобальную область видимости
    root.Carousel = factory();
  }
})(this, function () {
  'use strict';

  var Carousel = function (obj) {
    // Конструктор класса Carousel
    this.obj = document.querySelector(obj);
    this.slide_index;
    this.slide_length;
    this.slide_current_obj;

    this._init();
  };

  Carousel.prototype = {
    constructor: Carousel,

    _init: function () {
      // Начальная настройка карусели
      this.slide_index = this.obj.getAttribute('data-slide-index')
        ? parseInt(this.obj.getAttribute('data-slide-index'))
        : 0;
      this._updateCurrentSlideObj();
      this.slide_current_obj.className += ' active';
      this.slide_length = this.obj.querySelectorAll('.carousel-item').length;
      this.animationEnd = this.whichAnimationEvent();
      this._setupHandlers();
      this._updateButtonsState(); // обновление состояния кнопок
      this._disableLeftButton(); // чтобы изначально кнопка влево была отключена
    },

    // Отключения кнопки влево
    _disableLeftButton: function () {
      var btn_L = this.obj.querySelector(".carousel-btn[data-dir='_L']");
      btn_L.disabled = true;
    },

    _setupHandlers: function () {
      // Установка обработчиков событий для кнопок и точек карусели
      var self = this;

      var btn_L = this.obj.querySelector(".carousel-btn[data-dir='_L']");
      btn_L.addEventListener('mousedown', function () {
        self._slideLeft();
      });

      var btn_R = this.obj.querySelector(".carousel-btn[data-dir='_R']");
      btn_R.addEventListener('mousedown', function () {
        self._slideRight();
      });

      var dots = this.obj.querySelectorAll('.carousel-dot');
      for (var i = 0; i < dots.length; i++) {
        dots[i].addEventListener('mousedown', function () {
          self._slideJump(this.getAttribute('data-slide-index'));
        });
      }
    },

    _updateCurrentSlideDot: function () {
      // Обновление активной точки
      var dots = this.obj.querySelectorAll('.carousel-dot');
      for (var i = 0; i < dots.length; i++) {
        if (i == this.slide_index) {
          dots[this.slide_index].className += ' active';
        } else {
          dots[i].className = dots[i].className.replace(/(^| )active/, '');
        }
      }
    },

    _updateCurrentSlideObj: function () {
      // Обновление текущего слайда
      this.slide_current_obj = this.obj.querySelector(
        ".carousel-item[data-slide-index='" + this.slide_index + "']"
      );
      this._updateCurrentSlideDot();
    },

    _slide: function (dir) {
      // Главная функция перемещения слайдов
      var carousel = this.obj;
      carousel.className += ' preventDoubleTap';

      var class_for_current = dir == '_R' ? 'prev' : 'next';
      var class_for_target = dir == '_R' ? 'next' : 'prev';

      var current_slide = this.slide_current_obj;
      current_slide.className += ' ' + class_for_current;
      current_slide.className = current_slide.className.replace(
        /(^| )active/,
        ''
      );
      current_slide.addEventListener(this.animationEnd, function () {
        current_slide.className = current_slide.className.replace(
          new RegExp('(^| )' + class_for_current, 'g'),
          ''
        );
        current_slide.removeEventListener(this.animationEnd);
      });

      var target_slide = this.obj.querySelector(
        ".carousel-item[data-slide-index='" + this.slide_index + "']"
      );
      target_slide.className += ' ' + class_for_target;
      target_slide.className += ' active';
      current_slide.addEventListener(this.animationEnd, function () {
        target_slide.className = target_slide.className.replace(
          new RegExp('(^| )' + class_for_target, 'g'),
          ''
        );
        carousel.className = carousel.className.replace(
          new RegExp('(^| )' + 'preventDoubleTap', 'g'),
          ''
        );
        target_slide.removeEventListener(this.animationEnd);
      });

      this._updateCurrentSlideObj();
    },
    // Слайд влево
    _slideLeft: function () {
      if (this.slide_index == 0) {
        return; // Перемещение к слайдам останавливается, если текущий слайд первый (с индексом 0)
      } else {
        this.slide_index -= 1; // Если слайд не первый, перемещаемся к предыдущему
        this._slide('_L');
        this._updateButtonsState(); // Обновляем состояние кнопок после перемещения
      }
    },
    // Слайд вправо
    _slideRight: function () {
      if (this.slide_index == this.slide_length - 1) {
        return; // Перемещение к слайдам останавливается, если текущий слайд последний
      } else {
        this.slide_index += 1; // Если слайд не последний, перемещаемся к следующему
        this._slide('_R');
        this._updateButtonsState(); // Обновляем состояние кнопок после перемещения
      }
    },

    _updateButtonsState: function () {
      // Получаем ссылки на кнопки влево и вправо
      var btn_L = this.obj.querySelector(".carousel-btn[data-dir='_L']");
      var btn_R = this.obj.querySelector(".carousel-btn[data-dir='_R']");
      // Устанавливаем состояние кнопки влево в зависимости от текущего слайда
      if (this.slide_index === 0) {
        btn_L.disabled = true;
      } else {
        btn_L.disabled = false;
      }
      // Устанавливаем состояние кнопки вправо в зависимости от текущего слайда
      if (this.slide_index === this.slide_length - 1) {
        btn_R.disabled = true;
      } else {
        btn_R.disabled = false;
      }
    },

    whichAnimationEvent: function () {
      // Определение события завершения анимации CSS
      var t;
      var el = document.createElement('fakeelement');
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'animationend',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    },
  };

  // Экспорт класса Carousel
  return Carousel;
});

function main() {
  // Запуск карусели при загрузке документа
  stagesMobileCarousel = new Carousel('.stages-mobile-carousel');
}
