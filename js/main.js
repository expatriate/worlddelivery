// Delivery 

var settings = {
  mode: 'clear',
  plane: 'planeclear.png',
};

function getUrlParams() {

  var query = window.location.search.replace('?', '');

  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      var arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
}

var params = {
  usa: {
    title: 'Срочная авиадоставка грузов из США и&nbsp;выполнение поручений через личного авиакурьера',
    plane: 'planeusa.png',
    ucan: ['отправить надежного человека с посылкой/ поручением из России в США','реализовать доставку срочного или важного груза из США вам в Россию!'],
    whyus: {
      title: 'Наличие складов в России',
      text: 'Вам не нужно заботиться о том, где временно разместить ваш груз при отправке или получении. Для этого у нас есть собственные склады, полностью соответствующие нормам пожарной безопасности и санитарным-эпидемиологическим нормам.'
    }
  },
  china: {
    title: 'Срочная авиадоставка грузов из Китая и&nbsp;выполнение поручений через личного авиакурьера',
    plane: 'planechina.png',
    ucan: ['отправить надежного человека с посылкой/ поручением из России в Китай','реализовать доставку срочного или важного груза из Китая вам в Россию!'],
    whyus: {
      title: 'Наличие склада в Китае и России',
      text: 'Заказывайте товары в Китае без посредников и храните их бесплатно на наших складах, пока наш курьер их не заберет и доставит Вам. Все склады соответствуют нормам пожарной безопасности и санитарным нормам.'
    }
  },
  world: {
    title: 'Срочная авиадоставка грузов по всему миру и&nbsp;выполнение поручений через личного авиакурьера',
    plane: 'plane.png',
    ucan: ['отправить надежного человека с посылкой/ поручением из России в любую точку мира','реализовать доставку срочного или важного груза из любой точки мира вам в Россию!'],
    whyus: {
      title: 'Наличие склада в Китае и России',
      text: 'Заказывайте товары в Китае без посредников и храните их бесплатно на наших складах, пока наш курьер их не заберет и доставит Вам. Все склады соответствуют нормам пожарной безопасности и санитарным нормам.'
    }
  },
  clear: {
    title: 'Срочная авиадоставка грузов по всему миру и&nbsp;выполнение поручений через личного авиакурьера',
    plane: 'planeclear.png',
    ucan: ['отправить надежного человека с посылкой/ поручением из России в любую точку мира','реализовать доставку срочного или важного груза из любой точки мира вам в Россию!'],
    whyus: {
      title: 'Наличие склада в Китае и России',
      text: 'Заказывайте товары в Китае без посредников и храните их бесплатно на наших складах, пока наш курьер их не заберет и доставит Вам. Все склады соответствуют нормам пожарной безопасности и санитарным нормам.'
    }
  }
}

function changeTitles() {
  var paramsObj = params[settings.mode];
  $('#js-landing-title').html(paramsObj.title);
  $('#js-landing-ucan-1').html(paramsObj.ucan[0]);
  $('#js-landing-ucan-2').html(paramsObj.ucan[1]);
  $('#js-landing-whyus-title').html(paramsObj.whyus.title);
  $('#js-landing-whyus-text').html(paramsObj.whyus.text);

  settings.plane = paramsObj.plane;
}


$(document).ready(function() {

  var params = getUrlParams();
  

  settings.mode = params.mode ? params.mode : 'clear';

  changeTitles();

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
  var bg1 = PIXI.Sprite.fromImage('img/' + settings.plane);
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
