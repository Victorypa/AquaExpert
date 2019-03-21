$(document).ready(function(){
  let burger          = $('.burger'),
      mobileMenu      = $('.mobile-menu'),
      mobileBurg      = $('.mobile__burger'),          
      body            = $('body');

  $('body').delegate('.burger','click',  function(){
    burger.toggleClass('burger-active');
    mobileMenu.toggleClass('show');
    mobileBurg.toggleClass('active');
    body.toggleClass('no-scroll');
  });

	$(".header-menu").on("click","a", function (event) {
		event.preventDefault();
		  let id  = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 1500);
	});

});