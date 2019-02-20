
$(document).ready(function() {

  svg4everybody();

  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 2,
    spaceBetween: 130,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  $(document).on('click', 'button.modal', function(e) {
    e.preventDefault();

    var target = e.target;

    if (!$(target).hasClass('.modal')) {
      target = $(target).parents('.modal')[0];
      console.log(target)
    }

    $.magnificPopup.open({
      items: {
        src: target.dataset.popup,
        type: 'inline',
      },
    });
  });


  $(document).on('click', 'button.send', function(e) {
    e.preventDefault();

    $.magnificPopup.open({
      items: {
        src: '#success',
        type: 'inline',
      },
    });
  });

  $('.showmore').on('click', function(e) {
    var items = $('.whenneeds').find('.hidden');

    if (items.length) {
      items.removeClass('hidden');
      $('.showmore').hide();
    }
  });
});