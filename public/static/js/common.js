$(document).ready(function() {
  /**
   * Реинициализация для шаблонизации
   */
  function reInit() {
    $('.js-select').select2({
      minimumResultsForSearch: Infinity
    });
  }

  /**
   * Разворачивание подробной информации в блоке "Страхование путешественников"
   */
  $('.js-company-more-btn').on('click', function() {
    $(this).parents('.js-company').toggleClass('_open');
  });

  /**
   * Переключение радиокнопок в блоке "Готовые решения"
   */
  $('.js-rf-item').on('click', function() {
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
  $(document).on('click', '.js-insurance-ppl-add', function() {
    var list = $(this).parents('.js-insurance-ppl');
    var source   = $("#insurancedPpl").html();
    var template = Handlebars.compile(source);
    var index = list.children().length;

    list.append(template({name: index}));
    reInit();
  });


  $('.js-tabs-item').on('click', function() {
    var tabData = $(this).attr('data-tab');

    $('.js-tabs-item').removeClass('_active');
    $(this).addClass('_active');
    $('.js-content-item').removeClass('_active');
    $('.js-content-item[data-content='+ tabData +']').addClass('_active');
    console.log(tabData)
  });
});