$(document).ready(function() {

	// The Slider initialization:

	   $("#home-callouts").responsiveSlides();
       $("#testimonials-slider").responsiveSlides();
       $("#client-slider").responsiveSlides();
       $("#project1-slideshow").responsiveSlides();
       
    // The masonry portfolio initialization:
       
       $('#portfolio-container').isotope({
		  // options
		  itemSelector : '.isotope-item',
		  layoutMode : 'fitRows'
		});

	// Smooth Scroll to internal links

	$(".scroll").click(function(event){		
			event.preventDefault();
			
			$scroll = $(this.hash).offset().top;
			$scroll = $scroll - 65;
			$('html,body').animate({scrollTop:$scroll}, 500);
		});


	// Handle hover event for the project images

	$(".isotope-item").mouseenter(function(){
			$(this).children('.portfolio-overlay').fadeIn(200);
			
		}).mouseleave(function(){
		  $(this).children('.portfolio-overlay').slideUp(200);
		});	
		
		
	// Handle hover event for team member images
	
	$(".team-image-wrap").mouseenter(function(){
			$(this).children('.team-hover').fadeIn(200);
		}).mouseleave(function(){
		  $(this).children('.team-hover').fadeOut(200);
		});	
		
	// Manage responsive nav dropdown menu
	
	$('#pull').click(function(event){
	
		event.preventDefault();
	
		if($('#nav-container').css('height') != '66px'){
			$('#nav-container').animate({height:'66px'}, 500);
			$("#pull").html('<a class="right pull-toggle" href="#"><i class="foundicon-down-arrow"></i></a>');

		
		}else{
			$('#nav-container').css('height', 'auto');
			$("#pull").html('<a class="right pull-toggle" href="#"><i class="foundicon-up-arrow"></i></a>');
		}
	
	});
	
	$('.scroll').click(function(event){
	
		event.preventDefault();
	
		if($("#pull").is(":visible")){
			$('#nav-container').animate({height:'66px'}, 500);
			$("#pull").html('<a class="right pull-toggle" href="#"><i class="foundicon-down-arrow"></i></a>');
		}
	});
	
	//Contact Form Code:
	
	$(function (e) {
		$("#form-send").click(function (e) {
			var $error = 0;
			var name = $("#form-name").val();
			var email = $("#form-email").val();
			var text = $("#form-msg").val();
		
			
			if(name == "" || email=="" || text=="" ){
				$('#details-error-wrap').fadeIn(1000);
				$error = 1;
			}else{
				$('#details-error-wrap').fadeOut(1000);
			}
			

			
			var dataString = 'name=' + name + '&email=' + email + '&text=' + text;
			
			if($error == 0){
				$.ajax({
					type: "POST",
					url: "mail.php",
					data: dataString,
					success: function () {
						$('#details-error-wrap').fadeOut(500);
					
						$('#form-sent').fadeIn(1000);
					}
				});
				return false;
			}
			
			e.preventDefault();
		});
	});
	
	// Filter the isotope masonry
	
	$('#filters a').click(function(){
	  var selector = $(this).attr('data-filter');
	  $('#portfolio-container').isotope({ filter: selector });
	  $('#filters a').removeClass('active-filter');
	  $(this).addClass('active-filter');
	  return false;
	});
	
	
	
	

});