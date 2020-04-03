$(function() {
  var $teamSlider = $('.team-slider__slider'),
      $teamSlides = $teamSlider.find('.team__item');
  
  var $teamCaption = $('.team-slider__caption'),
    captionLabel = $teamCaption.find('.label'),
    captionTtl = $teamCaption.find('.ttl'),
    captionBtn = $teamCaption.find('.btn');

  $teamSlider.slick({
    arrows: true,
    dots: false,
    infinite: true,
    centerMode: true,
    centerPadding: '240px',
    focusOnSelect: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: '.team-slider__arrow_prev',
    nextArrow: '.team-slider__arrow_next',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '20px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '0px',
          slidesToShow: 1
        }
      }
    ]
  });
  $teamSlider.slick('slickGoTo', 2);
  $teamSlides.on('click', function() {
    $teamSlider.slick('slickGoTo', this.dataset.slickIndex);
  });
  $teamSlider.on('afterChange', function(event, slick, currentSlide, nextSlide){
    var slide = slick.$slides[currentSlide];
    captionLabel.text(slide.dataset.post);
    captionTtl.text(slide.dataset.name);
    if (slide.dataset.link) {
      captionBtn.attr('href', slide.dataset.link);
      captionBtn.show();
    } else {
      captionBtn.hide();
    }
  });

  var $faqs = document.querySelector('.js-faqs');
  if ($faqs) {
    var $faqsTtl = [].slice.call($faqs.querySelectorAll('.faqs__title'));
    $faqsTtl.forEach(function (el) {
      el.addEventListener('click', function() {
        classie.toggle(this.parentNode, '_opened');
      })
    });
  }

  $('.js-phone').mask('+7(999)999-99-99');

  var $formList = $('.js-form');
  var $formInputs = $formList.find('input');

  // отправка формы
  $('.js-submit-form').on('click', function(event) {
    event.preventDefault();
    var form = $(this).parent().parent().parent();
    var $name = form.find('[name="name"]');
    var $phone = form.find('[name="phone"]');

    if ($name.val() != '' &&  $phone.val() != '') {
      var requestParams = {
        name: $name.val(),
        phone: $phone.val()
      };

      $.ajax({
        async: true,
        type: "POST",
        url: "https://magerya.ru/api/v1/core/feedback",
        // dataType: "json",
        data: requestParams,
        success: function(response) {
          alert('Спасибо. Наш менеджер Вам перезвонит.');
          $.each($formInputs, function(idx, input) {
            $(input).val('');
          });
        },
        error: function(error) {
          console.log(error)
        }
      });
    } else {
      alert('Ошибка! Не заполнены поля формы.');
    }
    return false;
  });

  var $logo = $('.js-logo');
  var $login = $('.js-login'), $register = $('.js-register'), $footerLinkList = $('.js-footer-link');
  var url = location.href.match(/\?.*/);
  if (Array.isArray(url)) {
    $logo.attr('href', '/' + url[0]);
    $login.attr('href', 'https://auth.magerya.ru/sign-in' + url[0]);
    $register.attr('href', 'https://auth.magerya.ru/sign-up' + url[0]);
    $.each($footerLinkList, function(idx, link) {
      $(link).attr('href', $(link).attr('href') + url[0]);
    });
  }
});