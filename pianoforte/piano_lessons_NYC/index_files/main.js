jQuery(document).ready(function($){

	$(".post-thumb").fitVids(); 
		
	// ====================================================================

	// Smooth Scroll on Menu Click

	var navbarHeight = $('.navbar-nav').outerHeight();

	$('.navbar-nav a[href*="#"]').not('.navbar-nav a[href="#"]').on("click",function(){
		var t = $(this.hash);
		var t = t.length&&t||$('[name='+this.hash.slice(1)+']'); 
		if(t.length){
			var tOffset=t.offset().top - navbarHeight;
			$('html,body').animate({scrollTop:tOffset},'slow');
			return false;
		}
	});

	$(".dropdown-menu a, .navbar-nav > li > a").not(".navbar-nav > li.dropdown > a").click(function() {
	    $('body').click();
	});

	// ====================================================================

	// Superslides

	function makeFullscreen() {
		$('section.fullscreen').each(function(){
			win_height = $(window).height();
			navbar_height = $('body > .navbar').height();
			available_height = win_height - navbar_height;
			$(this).css('min-height', available_height + 'px'); 
		});
	}

	makeFullscreen();

	$(window).resize(function(){
		makeFullscreen();
	});

	if( $().superslides ) {
		$('.superslides').each(function(){

			play            = $(this).attr('data-pause');
			animation_speed = $(this).attr('data-animation');
			animation       = $(this).attr('data-effect');
			pagination      = $(this).attr('data-pagination');
			width           = $(this).attr('data-width');
			height          = $(this).attr('data-height');

			$('.superslides').superslides({
				play: play,
				animation_speed: animation_speed,
				animation: animation,
				pagination: false,
				inherit_height_from: width,
				inherit_width_from: height
			});

		});
	}


	// ====================================================================

	// Menu Item Activation

	$('.navbar-collapse a').each(function(){

		var location = window.location.toString();
		var url = $(this).attr('href');
		var hash = url.substring( url.indexOf('#') );
		var clean_url = url.replace(hash, '');

		if( location === hash ) hash = '#top';

		if( location = clean_url ) $(this).attr('data-target', hash);

	});

	$('body').scrollspy({
		target: '.navbar-collapse',
		offset: 10
	});

	$('[data-spy="scroll"]').each(function () {
		var $spy = $(this).scrollspy('refresh');
	});

	// Fix scroll position set by browser when page loads first
	$(window).one("load", function() {
		$('.navbar a[href$="' + window.location.hash + '"]').click();
	});


	// ====================================================================

	// Owl Carousel

	if( $().owlCarousel ) {

		$('.staff-carousel').each(function(){
			var visible = $(this).attr('data-visible');
			if( visible == 1 ) {
				var sItem = true;	
			} else {
				var sItem = false;
			}
			$(this).owlCarousel({
				items: visible,
				slideSpeed: 800,
				singleItem: sItem
			});
		});

		$('.review-carousel').each(function(){
			var visible = $(this).attr('data-visible');
			if( visible == 1 ) {
				var sItem = true;	
			} else {
				var sItem = false;
			}
			$(this).owlCarousel({
				items: visible,
				navigation: true,
				pagination: false,
				slideSpeed: 800,
				autoHeight: true,
				singleItem: sItem,
				navigationText: [
					"<i class='fa fa-angle-left'></i>",
					"<i class='fa fa-angle-right'></i>"
				]
			});
		});

		$('.blog-carousel').each(function(){
			var visible = $(this).attr('data-visible');
			if( visible == 1 ) {
				var sItem = true;	
			} else {
				var sItem = false;
			}
			$(this).owlCarousel({
				items: visible,
				navigation: false,
				pagination: true,
				slideSpeed: 800,
				singleItem: sItem
				/*autoHeight: true*/
			});
		});

	}

	// ====================================================================

	// Fancybox

	if( $().fancybox ) {
		$('.fancybox').fancybox({
			openEffect: 'none'
		});
	}

	// ====================================================================

	// Direction-Aware Hover Effect

	if( $().hoverdir ) {
		$('.gallery > li').each(function(){
			$(this).hoverdir();
		});
	}

	// ===================================================================

	// Column Menu

	$('.submenu li a').append("<i class='fa fa-angle-right'></i>");


	// ====================================================================

	// Comments Reply Link Fix

	$('.comment-reply-link').addClass('btn btn-default');
	$('#commentform #submit').addClass('btn btn-primary btn-lg');

	$('.panel-group[data-open="first"]').each(function(){
		$('.panel:eq(0) .panel-collapse', this).collapse('show');
	});


	// ====================================================================

	// Widget Title Icons

	$('.widget_recent_comments li, .widget_nav_menu > div > ul > li > a, .widget_recent_entries > ul > li > a, .widget_pages > ul > li > a, .widget_meta > ul > li > a').append("<i class='fa fa-angle-right'></i>");

	$('.widget_archive h5').prepend("<i class='fa fa-archive fa-lg'></i>");
	$('.widget_meta h5').prepend("<i class='fa fa-coffee fa-lg'></i>");
	$('.widget_nav_menu h5').prepend("<i class='fa fa-bars fa-lg'></i>");
	$('.widget_pages h5').prepend("<i class='fa fa-clipboard fa-lg'></i>");
	$('.widget_recent_entries h5').prepend("<i class='fa fa-file-text fa-lg'></i>");
	$('.widget_categories h5').prepend("<i class='fa fa-folder-open fa-lg'></i>");	
	$('.widget_calendar h5').prepend("<i class='fa fa-calendar fa-lg'></i>");
	$('.widget_recent_comments h5').prepend("<i class='fa fa-comments fa-lg'></i>");
	$('.widget_tag_cloud h5').prepend("<i class='fa fa-tags fa-lg'></i>");
	$('.widget_text h5').prepend("<i class='fa fa-info-circle fa-lg'></i>");

	$('img.alignnone, img.alignright, img.aligleft, .post-thumb > img').addClass('img-responsive');

});