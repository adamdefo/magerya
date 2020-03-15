$(function() {
  $('.team-slider__slider').slick({
    arrows: true,
    dots: false,
    infinite: true,
    centerMode: true,
    focusOnSelect: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: '.team-slider__arrow_prev',
    nextArrow: '.team-slider__arrow_next'
  });
});