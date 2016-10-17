$(document).ready(function() {
  $('.js-company-more-btn').on('click', function() {
    $(this).parents('.js-company').toggleClass('_open');
  });

  $('.js-rf-item').on('click', function() {
    if (!$(this).hasClass('_active')) {
      $('.js-rf-item').removeClass('_active');
      $('.js-rf-item').find('input[type=radio]').prop('checked');
      $(this).addClass('_active');
      $(this).find('input[type=radio]').prop('checked', true)
    }
  });
});