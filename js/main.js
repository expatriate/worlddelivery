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

function changeTitles() {
  var paramsObj = data[settings.mode];
  $('#js-landing-title').html(paramsObj.title);
  $('#js-landing-ucan-1').html(paramsObj.ucan[0]);
  $('#js-landing-ucan-2').html(paramsObj.ucan[1]);
  $('#js-landing-whyus-title').html(paramsObj.whyus.title);
  $('#js-landing-whyus-text').html(paramsObj.whyus.text);

  settings.plane = paramsObj.plane;
}


$(document).ready(function() {

  var params = getUrlParams();
  

  settings.mode = params.mode && data[params.mode] !== undefined ? params.mode : 'clear';

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
  var container1 = new PIXI.DisplayObjectContainer();
  var container2 =  new PIXI.DisplayObjectContainer();
  var container3 = new PIXI.DisplayObjectContainer();
  var container4 = new PIXI.DisplayObjectContainer();
  stage.addChild(container1);
  stage.addChild(container2);
  stage.addChild(container3);
  stage.addChild(container4);


 // Background
  var bg = PIXI.Sprite.fromImage('img/planeunder.jpg');
  container1.addChild(bg);

  // Plane
  var planeline = PIXI.Sprite.fromImage("img/planeline.png");
  container2.addChild(planeline);

  // on top
  var plane = PIXI.Sprite.fromImage('img/' + settings.plane);
  container3.addChild(plane);

  // on top
  var top = PIXI.Sprite.fromImage("img/plane.png");
  container4.addChild(top);


  // Filters
  var displacementTextureBg = PIXI.Texture.fromImage("img/noise2.png");
  var displacementFilterBg = new PIXI.DisplacementFilter(displacementTextureBg);

  var displacementTextureLines = PIXI.Texture.fromImage("img/noise.png");
  var displacementFilterLines = new PIXI.DisplacementFilter(displacementTextureLines);

  var displacementTextureTop = PIXI.Texture.fromImage("img/noise.png");
  var displacementFilterTop = new PIXI.DisplacementFilter(displacementTextureTop);



  // Apply it
  container1.filters = [displacementFilterBg];
  container2.filters = [displacementFilterLines];
  container4.filters = [displacementFilterTop];

  // Animate
  requestAnimFrame(animate);

  function animate() {
      var offsetbg = 0.1;
      var offsetlines = 0.6;
      var offsettop = 1;

      displacementFilterBg.offset.x += offsetbg;
      displacementFilterBg.offset.y += offsetbg;

      displacementFilterTop.offset.x += offsettop;
      displacementFilterTop.offset.y += offsettop;
      
      displacementFilterLines.offset.x += offsetlines;
      displacementFilterLines.offset.y += offsetlines;


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
