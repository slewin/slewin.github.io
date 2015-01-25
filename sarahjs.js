/*Script by Sarah Lewin*/

var currentselection = "featured";


$(document).ready(function(){
  $('div[class*="clip"]').addClass("hidden");
  $('div[tags*="'+currentselection+'"]').removeClass("hidden");

  $("div").click(function(){
  if($(this).hasClass("clip")){window.open($(this).attr("site"));}
  if($(this).hasClass("button")){
  currentselection = $(this).attr("id");
  $('div[class*="clip"]').addClass("hidden");
  $('div[tags*="'+currentselection+'"]').removeClass("hidden");
  $('div[class*="button"]').removeClass("selected");
  $(this).addClass("selected");
  $('#container').masonry();
	}
  if($(this).hasClass("hyperbolicspace")){rotateAnimation("blob",10);}
  });
});  

$(document).ready(function(){
  $("div").mouseover(function(){
  if($(this).hasClass("clip")){$(this).addClass("selected");}
  });
});

$(document).ready(function(){
  $("div").mouseout(function(){
  if($(this).hasClass("clip")){$(this).removeClass("selected");}
  });
});


/*This rotation business is included for no reason whatsoever, and is adapted to go counterclockwise (also known as widdershins) from http://www.developphp.com/video/JavaScript/Transform-Rotate-Image-Spin-Smooth-Animation-Tutorial*/

var looper;
var degrees = 360;
function rotateAnimation(el,speed){
	var elem = document.getElementById(el);
	if(navigator.userAgent.match("Chrome")){
		elem.style.WebkitTransform = "rotate("+degrees+"deg)";
	} else if(navigator.userAgent.match("Firefox")){
		elem.style.MozTransform = "rotate("+degrees+"deg)";
	} else if(navigator.userAgent.match("MSIE")){
		elem.style.msTransform = "rotate("+degrees+"deg)";
	} else if(navigator.userAgent.match("Opera")){
		elem.style.OTransform = "rotate("+degrees+"deg)";
	} else {
		elem.style.transform = "rotate("+degrees+"deg)";
	}
	looper = setTimeout('rotateAnimation(\''+el+'\','+speed+')',speed);
	degrees--;
	if(degrees < 1){
		degrees = 360;
		clearTimeout(looper);
	}
	}
