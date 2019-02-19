var directionSlider, productSlider, newsSlider, maxOpened = 0, menuOpened = false;


// Change this to get another twtr account
var tweeterLink = 'bcs';



$(document).ready(function() {

  $('#fullpage').fullpage({
    menu: '#menu',
    fixedElements: '#menu, #header, #footer, .mail, .share, .follower, #mouse',
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    anchors:['main', 'about', 'news', 'product', 'directions', 'team', 'contacts'],
    recordHistory: false,

    onLeave: function(origin, destination, direction) {

      // Hide SAFMAR logo
      if (!destination.isFirst) {
        $('#footer').find('a').animate({opacity: 0}, 500, function() { $('#footer').find('a').css({display: 'none'}); });
      } else {
        $('#footer').find('a').css({display: 'block'}).animate({opacity: 1}, 500);
      }

      animateBlock(destination.item);


      if (destination.index == 1) {
        if (maxOpened < 1) {
          maxOpened = 1;
        }
      }

      // Tweets section
      if (destination.index == 2) {
        if (maxOpened < 2) {
          //newsSlider.autoplay.start();
          maxOpened = 2;
        }
      }

      // Product section
      if (destination.index == 3) {
        if (maxOpened < 3) {
          if (productSlider) {
            productSlider.autoplay.start();
          }
          maxOpened = 3;
        }
      }

      // Directions section
      if (destination.index == 4) {

        if (maxOpened < 4) {
          if (directionSlider) {
            directionSlider.autoplay.start();
          }
          maxOpened = 4;
        }
      }

      // Team section
      
      if (destination.index == 5) {
        if (maxOpened < 5) {
          startTeamAnimation();
          maxOpened = 5;
        }
      }


      // Disable scroll on last slide
      if (destination.isLast) {
        $.fn.fullpage.setAllowScrolling(false);
        $('.mouse').hide();
      }
    }
  });

  var customHeight = $(window).height();
  var windowWidth = $(window).width();

  if (windowWidth < customHeight) {
    customHeight = windowWidth;
  }

  $('#stage').css({width: customHeight, height: customHeight})

/*  objectFit.polyfill({
    selector: 'img', // this can be any CSS selector
    fittype: 'cover', // either contain, cover, fill or none
    disableCrossDomain: 'true' // either 'true' or 'false' to not parse external CSS files.
  });*/

  var configList = {
    "profile": {"screenName": tweeterLink},
    "domId": 'section-news__slider',
    "maxTweets": 10,
    "enableLinks": true,
    "showInteraction": false,
    "showUser": true,
    "showTime": true,
    "showImages": true,
    "lang": 'en'
  };
  twitterFetcher.fetch(configList);
  
  $('#section-news__slider').on('twitterparsed', function() {
    newsSlider = new Swiper('#section-news__slider', {
        speed: 400,
        spaceBetween: 100,
        slidesPerView: 3,
        grabCursor: false,
        allowTouchMove: true,
        navigation: {
          nextEl: '.swiper-button-next_news',
          prevEl: '.swiper-button-prev_news',
        },
        breakpoints: {
          1200: {
            spaceBetween: 40
          },
          1400: {
            spaceBetween: 40
          },
          720: {
            slidesPerView: 1,
          }
        },
        on: {
          init: function() {
            for(var i = 0; i < 3; i++) {
              if (this.slides[i]) {
                $(this.slides[i]).find('.news-slide__user').addClass('js-animate-show not-animated');
                $(this.slides[i]).find('.news-slide__tweet').addClass('js-animate-show not-animated');
                $(this.slides[i]).find('.news-slide__media').addClass('not-animated-opacity');
              }
            }
            var self = this;
            $('#section-news__slider').one('news-animation', function() {
              self.allowTouchMove = false;
              self.allowSlideNext = false;
              self.unsetGrabCursor();
              
              setTimeout(function() {
                self.allowTouchMove = true;
                self.allowSlideNext = true;
                self.setGrabCursor();
              }, 4000);
            });

            if (this.slides.length <= 3) {
              $('.section-news__nav-wrapper').hide();
            }
          }
        }
    });

    newsSlider.autoplay.stop();
  });

  productSlider = new Swiper('#section-product__slider', {
      speed: 400,
      spaceBetween: 100,
      slidesPerView: 3,
      grabCursor: false,
      allowTouchMove: true,
      navigation: {
        nextEl: '.swiper-button-next_product',
        prevEl: '.swiper-button-prev_product',
      },
      autoplay: {
        delay: 10000,
        stopOnLastSlide: true
      },
      breakpoints: {
        1200: {
          spaceBetween: 40
        },
        1400: {
          spaceBetween: 40
        },
        720: {
          slidesPerView: 1,
        }
      },
      on: {
        init: function() {
          for(var i = 0; i < 3; i++) {
            if (this.slides[i]) {
              $(this.slides[i]).find('.product-slide__text').addClass('js-animate-show not-animated');
              $(this.slides[i]).find('.product-slide__title').addClass('js-animate-show not-animated');
              $(this.slides[i]).find('.product-slide__image').addClass('not-animated-opacity');
            }
          }
          var self = this;
          $('#section-product__slider').one('product-animation', function() {
            self.allowTouchMove = false;
            self.allowSlideNext = false;
            self.unsetGrabCursor();
            
            setTimeout(function() {
              self.allowTouchMove = true;
              self.allowSlideNext = true;
              self.setGrabCursor();
            }, 4000);
          });
          if (this.slides.length <= 3) {
            $('.section-product__nav-wrapper').hide();
          }
        }
      }
  });

  productSlider.autoplay.stop();

  directionSlider = new Swiper('#section-direction__slider', {
      speed: 400,
      spaceBetween: 100,
      slidesPerView: 1,
      grabCursor: false,
      autoplay: {
        delay: 10000,
        stopOnLastSlide: true
      },
      on: {
        init: function () {
          var paginationContainer = $('#section-direction__slider').find('.swiper-pagination');
          paginationContainer.append('<div class="swiper-pagination-line"></div><div class="swiper-pagination-underline"></div>');
          var pc = 100 / (this.slides.length - 1);
          for(var i = 0; i < this.slides.length; i++) {
            var percent = i * pc;
            percent = percent < 100 ? percent : 99.5;
            paginationContainer.append('<div class="pagination-point" data-slide="' + i + '" style="left:' + percent + '%"></div>')
          }
          $('.pagination-point').on('click', function() {
            disableAutoplay();
            directionSlider.slideTo($(this).data('slide'));
          });
          for(var i = 0; i < 3; i++) {
            if (this.slides[i]) {
              $(this.slides[i]).find('.direction-slide__text').addClass('js-animate-show not-animated');
              $(this.slides[i]).find('.direction-slide__title').addClass('js-animate-show not-animated');
              $(this.slides[i]).find('.direction-slide__image').addClass('not-animated-opacity');
            }
          }
          var self = this;
          $('#section-direction__slider').one('direction-animation', function() {
            self.allowTouchMove = false;
            self.allowSlideNext = false;
            self.unsetGrabCursor();
            
            setTimeout(function() {
              self.allowTouchMove = true;
              self.allowSlideNext = true;
              self.setGrabCursor();
            }, 3000);
          });
        },
        autoplay: function () {
          var pc = 100 / (this.slides.length -1);
          var percent = (this.activeIndex + 1) * pc;
          percent = percent > 100 ? 100 : percent;
          var line = $('#section-direction__slider').find('.swiper-pagination-line');
          line.animate({width: percent + '%'}, 10000);
        },
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'custom',
      }
  });

  function disableAutoplay() {
    var line1 = $('#section-direction__slider').find('.swiper-pagination-line');
    line1.finish();
    directionSlider.off('sliderMove');

    directionSlider.off('slideChange').on('slideChange', function() {
      var pc = 100 / (this.slides.length -1);
      var percent = this.activeIndex * pc;
      percent = percent > 100 ? 100 : percent;
      var line = $('#section-direction__slider').find('.swiper-pagination-line');
      line.animate({width: percent + '%'}, 200);
    });
    directionSlider.autoplay.stop();
  }

  directionSlider.autoplay.stop();

  directionSlider.on('autoplayStart', function() {
    var pc = 100 / (this.slides.length -1);
    var percent = (this.activeIndex + 1) * pc + '%';
    var line = $('#section-direction__slider').find('.swiper-pagination-line');
    line.animate({width: percent}, 10000);
  });

  directionSlider.on('sliderMove', function() {
    disableAutoplay();
  });


  $('.mail').on('click', function() {
    $('.mail-hidden').css({display:'block'}).animate({opacity: 1}, 200);
    $.fn.fullpage.setAllowScrolling(false);
    $('.thankyou_message').css({'display': 'none'});
    $('.form-elements').css({'display': 'block'});
    
    $('.mouse').hide();
    startWritetousAnimation();
  });

  $('.mail-hidden__close').on('click', function() {
    $('.mail-hidden').animate({opacity: 0}, 200, function() {
      $('.mail-hidden').css({display:'none'})
    });
    if ($.fn.fullpage.getActiveSection().index !== 6) {
      $('.mouse').show();
    }
    restoreWritetousAnimation();
  });

  $('#menu').on('click', function() {
    if (!menuOpened) {
      $('.menu-hidden').css({display:'block'}).animate({opacity: 1}, 200);
      $.fn.fullpage.setAllowScrolling(false);
      $('.mouse').hide();
      startMenuAnimation();
      menuOpened = true;

      $('.menu').addClass('opened');
    } else {

      $('.menu-hidden').animate({opacity: 0}, 200, function() {
        $('.menu-hidden').css({display:'none'})
      });
      if ($.fn.fullpage.getActiveSection().index !== 6) {
        $.fn.fullpage.setAllowScrolling(true);
        $('.mouse').show();
      }
      restoreMenuAnimation();
      menuOpened = false;

      $('.menu').removeClass('opened');
    }
  });

  $('.menu-hidden__close').on('click', function() {
    $('.menu-hidden').animate({opacity: 0}, 200, function() {
      $('.menu-hidden').css({display:'none'})
    });
    if ($.fn.fullpage.getActiveSection().index !== 6) {
      $('.mouse').show();
    }
    restoreMenuAnimation();
    menuOpened = false;

    $('.menu').removeClass('opened');
  });

  $('.menu-hidden__items').on('click', function() {
    $('#menu').click();
  });

  var canSend = true;
  $('.js-animate-show-submit').on('click', function(e) {
    $('.form-elements').find('input').each(function(index, item) {
      if ($(item).val() == '') {
        $(item).parent().addClass('invalid');
        e.preventDefault();
      }
    });
    if (!$('.form-elements').find('.input-holder.invalid').length) {
      if (canSend) {
        $(this).addClass('sending');
        canSend = false;
      } else {
        e.preventDefault();
      }
    }
  });

  $('.form-elements').find('input').on('focusin', function(e) {
    $(e.target).parent().removeClass('invalid')
  });

  function startTeamAnimation() {
    $('#section-team-red').animate({ opacity: 1}, 1500, 
        function() {
          $('#section-team-red').find('[style]').each(function(index, item) {
            $(item).animate({opacity:1}, 800 * (index + 1) + 500);
          });

          $('#section-team-black').delay(2000).animate({opacity: 1}, 1500, function() {
            $('#section-team-black').find('[style]').each(function(index1, item1) {
              $(item1).animate({opacity:1}, 800 * (index1 + 1) + 500);
            });
          });
        }
      )
  }

  function startMenuAnimation() {
    $('#header').css({opacity: 0.4, 'pointer-events': 'none'});
    $('#footer').css({opacity: 0.4, 'pointer-events': 'none'});
  }

  function restoreMenuAnimation() {
    $('#header').removeAttr('style');
    $('#footer').removeAttr('style');

    if ($.fn.fullpage.getActiveSection().index !== 6) {
      $.fn.fullpage.setAllowScrolling(true);
    }
  }

  function animateBlock(block) {
    var els = $(block).find('.not-animated, .not-animated-opacity');

    if ($(block).hasClass('section-news')) {
      $('#section-news__slider').trigger('news-animation');
    }
    if ($(block).hasClass('section-product')) {
      $('#section-product__slider').trigger('product-animation');
    }
    if ($(block).hasClass('section-direction')) {
      $('#section-direction__slider').trigger('direction-animation');
    }

    els.each(function(index, item) {
      setTimeout(function() {
        if ($(item).hasClass('not-animated-opacity')) {
          $(item).addClass('animated-opacity');
        } else {
          $(item).addClass('animated');
        }
      }, 200 * (index + 1) * 2 )
    });
  }

  function startWritetousAnimation() {
    var els = $('#write-to-us').find('.js-animate-show-input');
    var inputs = $('#write-to-us').find('.js-animate-show-input input');
    inputs.css({bottom: '-50px'});
    els.find('.input-holder-line').css({width: 0});
    canSend = true;
    $('.sending').removeClass('sending');

    els.each(function(index, item) {
      $(item).find('input').animate({bottom: 0}, 200 * (index + 1)*2);
      $(item).find('.input-holder-line').animate({width: '100%'}, 200 * (index + 1)*2);
    });

    var textarea = $('#write-to-us').find('.js-animate-show-textarea');
    var submit = $('#write-to-us').find('.js-animate-show-submit');
    textarea.removeClass('animated-top');
    setTimeout(function() {
      submit.removeClass('animated-top');
    }, 200);
    $('#menu').hide(200);
  }

  function restoreWritetousAnimation() {
    var textarea = $('#write-to-us').find('.js-animate-show-textarea');
    var submit = $('#write-to-us').find('.js-animate-show-submit');

    setTimeout(function() {
      textarea.addClass('animated-top');
      submit.addClass('animated-top');
    }, 500);

    if ($.fn.fullpage.getActiveSection().index !== 6) {
      $.fn.fullpage.setAllowScrolling(true);
    }

    $('#menu').show(200);
  }


  $(document).on('click', 'a', function(e) {
    if ($(e.target).hasClass('menu-link') && !$(e.target).hasClass('menu-link__contacts')) {

      setTimeout(function() {
        if ($.fn.fullpage.getActiveSection().index !== 6) {
          $.fn.fullpage.setAllowScrolling(true);
          $('.mouse').show();
        }
      }, 500)
    }

    if ($(e.target).parent().hasClass('go-to-main')) {
      $.fn.fullpage.setAllowScrolling(true);
      $('.mouse').show();
    }
  });
  
  if ($(window).width() > 1024) {
    stickyElements('.menu-hidden__close, .mail-hidden__close, .menu, .mail, .share', {stickiness: 5});
    $('.js-animate-show, .twitter-link__container').addClass('not-animated');
    $('.section-title__image:not(.no-a)').addClass('not-animated-opacity');

    $(window).on('mouseover', mouseOver);
    $(window).on('mouseout', mouseOut);
    $(window).on('mousemove', moveCursor);
  }

  init();

  //methods
  //$.fn.fullpage.setAllowScrolling(false);
});

var $cursor = $('.follower');
var isEdEgde = Swiper.browser.isIE || Swiper.browser.isEdge ? true : false;
if (isEdEgde) {
  $('html').addClass('is-ie is-edge');
}
var topoffset;
function moveCursor(e) {
  TweenLite.to($cursor, 0.23, {
    left: e.pageX,
    top: e.pageY,
    ease: Power4.easOut
  });
}
function mouseOver(e) {
  if ($(e.target).hasClass('hoverable')) {
    $cursor.addClass('is-hidden');
  }
}
function mouseOut(e) {
  if ($(e.target).hasClass('hoverable')) {
    if (!$(e.target).parents('svg').length && !$(e.relatedTarget).parents('svg').length) {
      $cursor.removeClass('is-hidden');
    }
  }
}



var sphereVerticesArray = [];
var sphereVerticesNormArray = [];
var mouseX = 0, mouseY = 0, camera, webGLRenderer,
    windowHalfX = window.innerWidth / 2,
    windowHalfY = window.innerHeight / 2,
    raycaster, mesh, meshRed, scene, Rgeometry, Rmaterial, Redmaterial, intersects, projector, tgeometry;
var intersectionPt, mouse;

var tick = 1;



var raycaster1, mouse1;

function init() {

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  /*** EDITOR ***/
    /*var geometry1 = new THREE.SphereBufferGeometry(25, 50, 50);

    var plane1 = new THREE.Mesh(geometry1, new THREE.MeshBasicMaterial({
      wireframe: true,
    }));
    //scene.add(plane1);

    var points1 = new THREE.Points(geometry1, new THREE.PointsMaterial({
      size: .5,
      color: "red",
      sizeAttenuation: true
    }));
    scene.add(points1);

    var raycaster1 = new THREE.Raycaster();
    raycaster1.params.Points.threshold = 1;
    var mouse1 = new THREE.Vector2();
    var intersects1 = null;
    var plane1 = new THREE.Plane();
    var planeNormal1 = new THREE.Vector3();
    var currentIndex1 = null;
    var planePoint1 = new THREE.Vector3();
    var dragging1 = false;

    window.addEventListener("mousedown", mouseDown1, false);
    window.addEventListener("mousemove", mouseMove1, false);
    window.addEventListener("mouseup", mouseUp1, false);

    function mouseDown1(event) {
      setRaycaster(event);
      getIndex();
      dragging1 = true;

      var positions = geometry1.attributes.position.array;
      var ptCout = positions.length / 3;
      var verticles = [];
      for (var i = 0; i < ptCout; i++)
      {
          verticles.push(new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]));
      }
      //console.log(geometry1.attributes)
      console.log(verticles)
    }

    function mouseMove1(event) {
      if (dragging1 && currentIndex1 !== null) {
        setRaycaster(event);
        raycaster1.ray.intersectPlane(plane1, planePoint1);
        geometry1.attributes.position.setXYZ(currentIndex1, planePoint1.x, planePoint1.y, planePoint1.z);
        geometry1.attributes.position.needsUpdate = true;
      }
    }

    function mouseUp1(event) {
      dragging1 = false;
      currentIndex1 = null;
    }

    function getIndex() {
      intersects1 = raycaster1.intersectObject(points1);
      if (intersects1.length === 0) {
        currentIndex1 = null;
        return;
      }
      currentIndex1 = intersects1[0].index;
      setPlane(intersects1[0].point);
    }

    function setPlane(point) {
      planeNormal1.subVectors(camera.position, point).normalize();
      plane1.setFromNormalAndCoplanarPoint(planeNormal1, point);
    }

    function setRaycaster(event) {

      getMouse(event);
      raycaster1.setFromCamera(mouse1, camera);
    }

    function getMouse(event) {
      mouse1.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse1.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }*/

  /*** EDITOR ***/


  camera = new THREE.PerspectiveCamera(106, $('#stage').width() / $('#stage').height(), 0.1, 1000);
  // create a render and set the size
  webGLRenderer = new THREE.WebGLRenderer({ antialias: true , clearAlpha: 1});
  webGLRenderer.setClearColor(new THREE.Color(0xFFFFFF, 1));
  webGLRenderer.setSize($('#stage').width(), $('#stage').height());
  webGLRenderer.setPixelRatio( window.devicePixelRatio );


  var date = new Date();
  var pn = new Perlin('rnd' + date.getTime());
  var sphereGeom = new THREE.SphereGeometry(32, 50, 50);
  var sphereGeomRed = new THREE.SphereGeometry(34, 30, 30, Math.PI/2, Math.PI, 0, Math.PI);
  // save points for later calculation
  for (var i = 0; i < sphereGeom.vertices.length; i++) {
    var vertex = sphereGeom.vertices[i];
    var vec = new THREE.Vector3(vertex.x, vertex.y, vertex.z);
    sphereVerticesArray.push(vec);
    var mag = vec.x * vec.x + vec.y * vec.y + vec.z * vec.z;
    mag = Math.sqrt(mag);
    var norm = new THREE.Vector3(vertex.x / mag, vertex.y / mag, vertex.z / mag);
    sphereVerticesNormArray.push(norm);
  }

  var geometry = new THREE.Geometry();
  tgeometry = new THREE.Geometry();
  var lgeometry = new THREE.Geometry();
  var sgeometry = new THREE.Geometry();
  var ssgeometry = new THREE.Geometry();

  function createCircleTexture(color, size) {
    var matCanvas = document.createElement('canvas');
    matCanvas.width = matCanvas.height = size;
    var matContext = matCanvas.getContext('2d');
    // create texture object from canvas.
    var texture = new THREE.Texture(matCanvas);
    // Draw a circle
    var center = size / 2;
    matContext.beginPath();
    matContext.arc(center, center, size/2, 0, 2 * Math.PI, false);
    matContext.closePath();
    matContext.fillStyle = color;
    matContext.fill();
    // need to set needsUpdate
    texture.needsUpdate = true;
    // return a texture made from the canvas
    return texture;
  }

  var tmaterial = new THREE.PointsMaterial({
      size: 0.2,
      map: createCircleTexture('#cccccc', 64),
      transparent: true,
      depthWrite: false,
      alphaTest: 0.5,
      opacity: 0.65,
   });
  var lmaterial = new THREE.LineBasicMaterial({
      color: 0xdddddd,
      opacity: 0.5,
      transparent: true,
  });

  var sprite = new THREE.TextureLoader().load( 'img/disc.png' );
  sprite.anisotropy = webGLRenderer.capabilities.getMaxAnisotropy();
  smaterial = new THREE.PointsMaterial({
    size: 2.9,
    map: createCircleTexture('#a01d21', 64),
    transparent: true,
    depthWrite: false,
    alphaTest: 0.5
  });
  ssmaterial = new THREE.PointsMaterial({
    size: 1.8,
    map: createCircleTexture('#a01d21', 64),
    transparent: true,
    depthWrite: false,
    alphaTest: 0.5
  });

  //material and scene defined in question
  var pointCloud = new THREE.Points(tgeometry, tmaterial);

  var lineCloud = new THREE.Line(lgeometry, lmaterial);
  var randomCloud = new THREE.Points(sgeometry, smaterial);
  randomCloud.sortParticles = true;
  var randomMovingCloud = new THREE.Points(ssgeometry, ssmaterial);  

  for (var i = 0; i < 100; i++ ) {
    var svertex = new THREE.Vector3();
    svertex.x = (Math.random() * 2 - 1);
    svertex.y = (Math.random() * 2 - 1);
    svertex.z = (Math.random() * 2 - 1);
    svertex.normalize();
    svertex.multiplyScalar(Math.random() * 20 + 7);
    sgeometry.vertices.push(svertex);
  }

  for (var i = 0; i < 50; i++ ) {
    var svertex = new THREE.Vector3();
    svertex.x = (Math.random() * 2 - 1) * 2;
    svertex.y = (Math.random() * 2 - 1) * 1;
    svertex.z = (Math.random() * 2 - 1);
    svertex.normalize();
    svertex.multiplyScalar(16);
    ssgeometry.vertices.push(svertex);
    svertex.multiplyScalar( Math.random() * 0.2 + 1 );
    ssgeometry.vertices.push(svertex);
  }

  scene.add(randomCloud);
  scene.add(randomMovingCloud);

  // position and point the camera to the center of the scene
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 50;

  var clock = new THREE.Clock();

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  projector = new THREE.Projector();

 // geometry
  
  // material
  Rmaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff, 
      transparent: true,
      opacity: 0,
  });

  Redmaterial = new THREE.MeshBasicMaterial({
      color: 0xa01d21,
      transparent: false,
      opacity: 1
  });

  // mesh
  mesh = new THREE.Mesh( sphereGeom, Rmaterial );
  scene.add( mesh );

  meshRed = new THREE.Mesh( sphereGeomRed, Redmaterial );


  window.addEventListener('mousedown', onMouseDown, false );
  window.addEventListener('mousemove', onMouseMove, false );
  
  intersectionPt = new THREE.Geometry();
  intersectionPt.vertices.push(new THREE.Vector3( 0, 0, 0));
  var dotMaterial = new THREE.PointsMaterial( { size: 0, sizeAttenuation: false } );
  var dot = new THREE.Points( intersectionPt, dotMaterial );
  //scene.add( dot );

  // add the output of the renderer to the html element
  $("#stage").append(webGLRenderer.domElement);

  var step = 0;
  var inverter = 1;
  var timeToRed = 0 , showRed = false, ticktonext = 0;

/*  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );*/
  window.addEventListener( 'resize', onWindowResize, false );

  meshRed.rotation.set( 0, -3*Math.PI/2, 0 );

  render();

  function render() {
    step += 1;

    scene.rotation.y -= 0.004;
    scene.add(meshRed);

    if (step % 785 === 0 && showRed) {
      showRed = false;
    } else if (step % 785 === 0 && !showRed) {
      showRed = true;
    }
    if (showRed) {
      meshRed.rotation.y -= 0.004;
    } else {
      meshRed.rotation.y += 0.004;
    }


    var delta = clock.getDelta();
    var lastParams = [];

    webGLRenderer.clear();

    //scene.remove(sphere);
    scene.remove(pointCloud);
    scene.remove(lineCloud);

    tgeometry.vertices = [];
    lgeometry.vertices = [];


    if (intersects && intersects.length) {
      if (!showRed) {
        inverter = inverter > 40 ? 40 : inverter + 1;
      } else {
        inverter = inverter < 1 ? 1 : inverter - 1;
      }
      for (var i = 0; i < sphereGeom.vertices.length; i += 1) {
        var vertex = sphereGeom.vertices[i], value;
        if (showRed) {
          value = pn.noise((vertex.x + step)/ 30, vertex.y / 30, 100 + vertex.z / 10);
        } else {
          value = pn.noise((vertex.x + step)/ 20, vertex.y / 20, 50 + vertex.z / 10);
        }

        vertex.x = sphereVerticesArray[i].x + (sphereVerticesNormArray[i].x * value * (showRed ? (inverter / 10) : 5)) * inverter / 50;
        vertex.y = sphereVerticesArray[i].y + (sphereVerticesNormArray[i].y * value * (showRed ? (inverter / 10) : 5)) * inverter / 50;
        vertex.z = sphereVerticesArray[i].z + sphereVerticesNormArray[i].z * value * 1;

        tgeometry.vertices.push(new THREE.Vector3(
          vertex.x,
          vertex.y,
          vertex.z));

        if (i > 0) {
          lgeometry.vertices.push(lastParams, new THREE.Vector3(vertex.x, vertex.y, vertex.z))
        }
        lastParams = new THREE.Vector3(
          vertex.x,
          vertex.y,
          vertex.z)
      }
    } else {
      
      inverter = inverter < 1 ? 1 : inverter - 1;
      for (var i = 0; i < sphereGeom.vertices.length; i += 1) {
        var vertex = sphereGeom.vertices[i];

        var value = pn.noise((vertex.x + step)/ 20, vertex.y / 20, 50 + vertex.z / 10);

        vertex.x = sphereVerticesArray[i].x + (sphereVerticesNormArray[i].x * value * (inverter / 10)) * inverter / 50;
        vertex.y = sphereVerticesArray[i].y + (sphereVerticesNormArray[i].y * value * (inverter / 10)) * inverter / 50;
        vertex.z = sphereVerticesArray[i].z + sphereVerticesNormArray[i].z * value * 1;

        tgeometry.vertices.push(new THREE.Vector3(
          vertex.x,
          vertex.y,
          vertex.z));

        if (i > 0) {
          lgeometry.vertices.push(lastParams,new THREE.Vector3( vertex.x, vertex.y, vertex.z ));
        }
        lastParams = new THREE.Vector3(
          vertex.x,
          vertex.y,
          vertex.z);
      }
    }

    
    sphereGeom.computeFaceNormals();
    sphereGeom.computeVertexNormals();

    tgeometry.computeFaceNormals();
    tgeometry.computeVertexNormals();

    lgeometry.computeFaceNormals();
    lgeometry.computeVertexNormals();

    sgeometry.computeFaceNormals();
    sgeometry.computeVertexNormals();

    sphereGeom.verticesNeedUpdate = true;
    tgeometry.verticesNeedUpdate = true;
    lgeometry.verticesNeedUpdate = true;
    sgeometry.verticesNeedUpdate = true;


    var rotateX = randomMovingCloud.rotation.x - 0.003;
    var rotateY = randomMovingCloud.rotation.y - 0.001;
    var rotateZ = randomMovingCloud.rotation.z - 0.001;
    randomMovingCloud.rotation.set( rotateX, rotateY, rotateZ );

    scene.add(pointCloud);
    scene.add(lineCloud);

    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera);
  }
}
function onMouseMove( event ) {
  mouse.x = ( ( event.clientX - webGLRenderer.domElement.offsetLeft ) / webGLRenderer.domElement.width ) * 2 - 1;
  mouse.y = - ( ( event.clientY - webGLRenderer.domElement.offsetTop ) / webGLRenderer.domElement.height ) * 2 + 1;
  var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
  vector.unproject(camera);

  raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
  intersects = raycaster.intersectObject( mesh );

  raycaster.setFromCamera( mouse, camera );
  if ( intersects.length > 0 ) {
    intersectionPt.vertices[0] = intersects[0].point;
    intersectionPt.verticesNeedUpdate = true;
    
  }
}

function onMouseDown( event ) {
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;   

}
 function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = $('#stage').width()/ $('#stage').height();
  camera.updateProjectionMatrix();

  var customHeight = $(window).height();
  var windowWidth = $(window).width();

  if (windowWidth < customHeight) {
    customHeight = windowWidth;
  }
  $('#stage').css({width: customHeight, height: customHeight})
  webGLRenderer.setSize( customHeight, customHeight );
}