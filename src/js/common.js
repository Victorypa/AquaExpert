$(document).ready(function(){
  var burger          = $('.burger'),
      mobileMenu      = $('.mobile-menu'),
      mobileBurg      = $('.mobile__burger'),
      langshowMenu    = $('.check-lang__dropdown'),
      langCheck       = $('.check-lang__wrapper'),
      langArrow       = $('.check-lang__arrow'),            
      body            = $('body');

  $('body').delegate('.burger','click',  function(){
    burger.toggleClass('burger-active');
    mobileMenu.toggleClass('show');
    mobileBurg.toggleClass('active');
    body.toggleClass('no-scroll');
  });

    langCheck.click(function() {
      langshowMenu.toggleClass('show');
      langArrow.toggleClass('active');
  });
});