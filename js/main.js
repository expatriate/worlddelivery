
$(document).ready(function() {

  svg4everybody();

  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 2,
    spaceBetween: 130,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      1250: {
        spaceBetween: 0,
        slidesPerView: 2,
      },
      720: {
        slidesPerView: 1,
      }
    },
  });

  if (window.innerWidth <= 1200) {
    $('.whenneeds').wrapInner('<div class="whenneeds__wrapper"></div>');
    $('.whenneeds').append('<div class="swiper-pagination"></div>')
    $('.whenneeds__item').addClass('swiper-slide');


    var swiper1 = new Swiper('.whenneeds', {
      slidesPerView: 1,
      spaceBetween: 0,
      slideClass: 'whenneeds__item',
      wrapperClass: 'whenneeds__wrapper',
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        1250: {
          spaceBetween: 0,
          slidesPerView: 3,
        },
        720: {
          slidesPerView: 1,
        }
      },
    });
  }

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

  $('.whyus__item').on('focusin', function() {

  })


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

  loadAnimation();

  // Renderer
  var renderer = PIXI.autoDetectRenderer(600, 690);

  $('.right-pad')[0].appendChild(renderer.view);

  // Stage
  var stage = new PIXI.Stage(0xd92256);

  // Container
  var container = new PIXI.DisplayObjectContainer();
  stage.addChild(container);

  var container1 =  new PIXI.DisplayObjectContainer();
  stage.addChild(container1);

  // Background
  var bg = PIXI.Sprite.fromImage("img/plane.jpg");
  container.addChild(bg);

  // Background
  var bg1 = PIXI.Sprite.fromImage("img/planeclear.png");
  container1.addChild(bg1);


  // Filter
  var displacementTexture = PIXI.Texture.fromImage("img/noise.png");
  var displacementFilter = new PIXI.DisplacementFilter(displacementTexture);

  // Apply it
  container.filters = [displacementFilter];

  // Animate
  requestAnimFrame(animate);

  function animate() {
      var offset = 1.8;
      
      /*if(id==1) offset = 1;
      else if(id==2) offset = 2;*/

      displacementFilter.offset.x += offset;
      displacementFilter.offset.y += offset;

      renderer.render(stage);
      requestAnimFrame(animate);
  }
});


function loadAnimation() {

    setTimeout(function() {
      $('.right-pad').find('canvas').animate({opacity: 1}, 400)
    },500)


    // Blocks to animate
    var simpleFade = $('.js-animate-fade');
    var animateFromTop = $('.js-animate-from-top');
    var animateFromTopSlow = $('.js-animate-from-top-slow');
    var animateFromBot = $('.js-animate-from-bot');
    var animateFromBotSlow = $('.js-animate-from-bot-slow');


    // Add start classes
    animateFromTop.addClass('anim-top-invis-0');
    animateFromTopSlow.addClass('anim-top-invis-slow-0');
    animateFromBot.addClass('anim-bot-invis-0');
    animateFromBotSlow.addClass('anim-bot-invis-slow-0');


    animateFromTop.viewportChecker({
        repeat: false,
        callbackFunction: function callbackFunction(elem, action) {
            setTimeout(function () {
                $(elem).addClass('anim-top-invis-1').removeClass('anim-top-invis-0');
            }, 200);
        }
    });

    animateFromTopSlow.viewportChecker({
        repeat: false,
        callbackFunction: function callbackFunction(elem, action) {
            var time = 200;
            if ($(elem).hasClass('blocks__item')) {
                time = 400 * $(elem).index();
            }
            setTimeout(function () {
                $(elem).addClass('anim-top-invis-slow-1').removeClass('anim-top-invis-slow-0');
            }, time);
        }
    });

    animateFromBot.viewportChecker({
        repeat: false,
        callbackFunction: function callbackFunction(elem, action) {
            setTimeout(function () {
                $(elem).addClass('anim-bot-invis-1').removeClass('anim-bot-invis-0');
            }, 200);
        }
    });

    animateFromBotSlow.viewportChecker({
        repeat: false,
        callbackFunction: function callbackFunction(elem, action) {
            var time = 200;
            /*if ($(elem).hasClass('blocks__item') || 
                $(elem).hasClass('half-content__item') || 
                $(elem).hasClass('whenneeds__item') || 
                $(elem).hasClass('info-block__item') || 
                $(elem).hasClass('whyus__item') ||
                $(elem).hasClass('scheme__item')) {
                time = 400 * $(elem).index();
            }*/
            setTimeout(function () {
                $(elem).addClass('anim-bot-invis-slow-1').removeClass('anim-bot-invis-slow-0');
            }, time);
        }
    });
}
