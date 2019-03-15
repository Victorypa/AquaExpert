$(document).ready(function(){
  var burger          = $('.burger'),
      mobileMenu      = $('.mobile-menu'),
      mobileBurg      = $('.mobile__burger'),
      body            = $('body');

  $('body').delegate('.burger','click',  function(){
    burger.toggleClass('burger-active');
    mobileMenu.toggleClass('show');
    mobileBurg.toggleClass('active');
    body.toggleClass('no-scroll');
  });

});