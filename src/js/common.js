$(document).ready(function(){
  let burger          = $('.burger'),
      mobileMenu      = $('.mobile__dropdown'),
      mobileBurg      = $('.mobile__menu'),          
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

//Randomly Generate Bubbles
const container = document.querySelector('.circle')
const emitterWidth = 100
for (let i = 0; i < 5; i++) {
  let bubble = document.createElement('div')
  let {style} = bubble
  let size = 10 + (Math.random() * 10) >>0
  bubble.classList.add('bubble')
  style.width = size + 'px'
  style.height = size + 'px'
  style.left = 10 + Math.random() * emitterWidth + 'px'
  container.appendChild(bubble)
  style.animationDelay = i + 0.5 + 's' 
}

$(function(){
  $('.selectpicker').selectpicker();
});