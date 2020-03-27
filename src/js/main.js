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

  // отправка формы
  $('.js-submit-form').on('click', function(event) {
    alert('Отправка формы!');
		event.preventDefault();
		// var form = $(this).parent().parent();
		// var $name = form.find('[name="name"]');
		// var $phone = form.find('[name="phone"]');

		// var $formItems = form.find('.form__item');

		// var requestParams = {
		// 	name: $name.val(),
		// 	phone: $phone.val()
		// };

		// $.ajax({
		// 	async: true,
		// 	type: "POST",
		// 	url: "/ajax/order.php",
		// 	dataType: "json",
		// 	data: requestParams,
		// 	success: function(response) {
		// 		console.log(response)
		// 		orderForm.find('.order__form-answer').removeClass('hide');
		// 		orderForm.find('.order__form-answer > .ttl').text(response.message);
		// 		form.addClass('hide');
		// 		setTimeout(function() {
		// 			orderForm.find('.order__form-answer').fadeOut('slow');
		// 		}, 3000);
		// 	},
		// 	error: function(error) {
		// 		console.log(error)
		// 	}
		// });

		// orderForm.find('.order__form-answer').removeClass('hide');
		// orderForm.find('.order__form-answer > .ttl').text('Спасибо! Ваша заявка отправлена.');
		// form.addClass('hide');
		// setTimeout(function() {
		// 	orderForm.find('.order__form-answer').fadeOut('slow');
		// }, 3000);

		// (function() {
		// 	requestParams = {};
		// 	$name.val('');
		// 	$phone.val('');
		// 	$email.val('');
		// 	$formItems.removeClass('form__item_active', 'form__item_focused');
		// })();

		return false;
	});
});