
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
});