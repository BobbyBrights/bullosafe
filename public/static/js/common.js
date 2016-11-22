$(document).ready(function () {
  /**
   * Реинициализация для шаблонизации
   */
  function reInit() {
    $('.js-select').select2({
      minimumResultsForSearch: Infinity
    });
    $('.js-datepicker').datepicker({
      language: "ru",
      todayHighlight: true,
      toggleActive: true,
      format: "dd.mm.yyyy",
      multidate: true,
      multidateSeparator: "-"
    });
  }

  /**
   * Фиксируем колонку, если она доскролена до конца экрана
   */

  /**
   * Инициализация RangeSlider
   */
  $('.js-progress').ionRangeSlider({
    type: "single",
    min: 0,
    max: 5,
    step: 1,
    from: 1,
    keyboard: true,
    values: ["1000", "2000", "3000", "4000", "5000"],
    grid: true,
    prettify: function (num) {
      return num + ' &euro;';
    }
  });

  /**
   * Разворачивание подробной информации в блоке "Страхование путешественников"
   */
  $('.js-company-more-btn').on('click', function () {
    $(this).parents('.js-company').toggleClass('_open');
  });

  /**
   * Переключение радиокнопок в блоке "Готовые решения"
   */
  $('.js-rf-item').on('click', function () {
    if (!$(this).hasClass('_active')) {
      $('.js-rf-item').removeClass('_active');
      $('.js-rf-item').find('input[type=radio]').prop('checked');
      $(this).addClass('_active');
      $(this).find('input[type=radio]').prop('checked', true)
    }
  });

  /**
   * Добавление нового человека в "Кол-во" застрахованых
   */
  $(document).on('click', '.js-insurance-ppl-add', function () {
    var list = $(this).parents('.js-insurance-ppl');
    var source = $("#insurancedPpl").html();
    var template = Handlebars.compile(source);
    var index = list.children().length;

    list.append(template({name: index}));
    reInit();
  });

  /**
   * Переключение табов
   */
  $('.js-tabs-item').on('click', function () {
    var parent = $(this).parents('.tabs');
    var tabData = $(this).attr('data-tab');

    parent.find('.js-tabs-item').removeClass('_active');
    $(this).addClass('_active');
    parent.find('.js-content-item').removeClass('_active');
    parent.find('.js-content-item[data-content=' + tabData + ']').addClass('_active');
  });

  /**
   * Сворачивание/разворачивание "Дополнительные опции"
   */
  $('.js-ao-close').on('click', function () {
    $(this).parents('.additional-options').toggleClass('_closed');
  });

  /**
   * Крутим скролл страницы наверх
   */
  $(document).on('click', '.js-back-to-top', function () {
    $("html, body").animate({scrollTop: 0}, 600);
  });

  /**
   * Добавление путешественника
   */
  $('.js-add-new-traveler').on('click', function () {
    var list = $('.js-travelers-list');
    var source = $('#addCard').html();
    var template = Handlebars.compile(source);
    var index = $('.js-travelers-list .add-card').length + 1;

    list.append(template({counter: index}));
    reInit();
  });

  /**
   * Удаление карточки путешественника
   */
  $(document).on('click', '.js-add-card-close', function () {
    $(this).parent().remove();
    $('.add-card').each(function (index, item) {
      $(item).find('.add-card__counter').html(index + 1)
    })
  });

  /**
   * Закрывание дропдауна
   */
  $('.dropdown__header').on('click', function () {
    $(this).parent().toggleClass('_open');
  });


  $(window).scrollTop(0);

  /**
   * Скролл с разной скоростью для двух колонок
   */
  var scrollCounter = 0;
  var fixed = false;
  $(window).on('scroll', function () {
    var _scrollCurrentCounter = $(this).scrollTop();

    if ($('.js-scroll-column:nth-of-type(1)').height() < $('.js-scroll-column:nth-of-type(2)').height()) {
      $('.js-scroll-column:nth-of-type(2)').removeClass('js-fix-this');
      $('.js-scroll-column:nth-of-type(1)').addClass('js-fix-this');
    }
    if ($('.js-scroll-column:nth-of-type(2)').height() < $('.js-scroll-column:nth-of-type(1)').height()) {
      $('.js-scroll-column:nth-of-type(1)').removeClass('js-fix-this');
      $('.js-scroll-column:nth-of-type(2)').addClass('js-fix-this');
    }

    var _fixedBottomPosition = document.querySelector('.js-fix-this').getBoundingClientRect().bottom;

    if (!fixed && _fixedBottomPosition <= $(window).height()) {
      fixed = true;
      $('.js-fix-this').addClass('_fixed');
      scrollCounter = _scrollCurrentCounter;
    }

    if (_scrollCurrentCounter < scrollCounter) {
      $('.js-fix-this').removeClass('_fixed');
      fixed = false;
    }
  });
});