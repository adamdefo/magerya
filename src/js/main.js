$(function() {
  var $teamSlider = $('.team-slider__slider'),
      $teamSlides = $teamSlider.find('.team__item');
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
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });
  $teamSlider.slick('slickGoTo', 2);
  $teamSlides.on('click', function() {
    $teamSlider.slick('slickGoTo', this.dataset.slickIndex);
  })

  var $faqs = document.querySelector('.js-faqs');
  if ($faqs) {
    var $faqsTtl = [].slice.call($faqs.querySelectorAll('.faqs__title'));
    var $faqsItem = [].slice.call($faqs.querySelectorAll('.faqs__item'));

    $faqsTtl.forEach(function (el) {
      el.addEventListener('click', function() {
        classie.toggle(this.parentNode, '_opened');
      })
    });
  }
});