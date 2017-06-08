  /*$(document).ready(function () {
    $('.bxslider').bxSlider({
      mode: 'horizontal',
      useCSS: false,
      infiniteLoop: false,
      hideControlOnEnd: true,
      easing: 'easeOutElastic',
      speed: 2000
    });
  });
*/
$(document).ready(function(){
  $('.bxslider').bxSlider({
  mode: 'fade',
  auto: true,
  autoControls: true,
  pause: 2000
});
});
