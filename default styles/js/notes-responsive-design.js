/*notes-responsive-design.js

Responsive Design
  Fluid Layout
  Media Queris
  Em Typography
CSS Positioning

Using percentages instead of pixels


MATCHMAKER
header
	with h1 (inline-block), nav with a

div with centered text with spans

div with background image no repeat background size 100%
	div inside float right with margin semi opacity
		heading, paragraph, text, clickable, button

three divs, float left, with percentage 33.3333%

footer



MEDIA QUERY

@media print {
	
}

@media only screen and (min-width: length) {
	style goes here
}

i.e.
@media only screen and (min-width: 1350px) {
	#wrapper {
		width: 1350px;
		margin: 0 auto;
	}
}

@media only screen and (max-width: 934px) {
	#page-header h1 {
	float: none;
	text-align: center;
	}

	#page-header nav {
	float: none;
	text-align: center;
	width: auto;
	}

	.callout {
	float: none;
	}

}


@media only screen and (min-width: 320px) and (max-width: 480px) {
	
}

Break Points
>1280px, 1024px, 768px, 480px, 320px



@media only screen and (min-width: 1500px) {
	#container {
		width: 1200px; (80% of 1500px)
	}
}

@media only screen and (max-width: 1024px) {
	#container {
		width: 90%;
	}

	nav a {
		padding: 10px;
	}

	header img {
		width: 120px;
	}

	.main-article img {
		display: none;
	}

	.main-article {
		float: none;
		width: auto;
		margin: auto;
		border-bottom: 2px solid #ccc;
	}
}

@media only screen and (max-width: 685px) {
	#articles, #side-column {
		width: auto;
		float: none;
	}

	.main-article img {
		display: block;
	}

	.main-article {
		border: none;
	}

	h1 {
		text-align: left;
		font-size: 20px;
	}

	h2, h3 {
		font-size: 18px;
	}
}

@media only screen and (max-width: 500px){
	#container {
		width auto
	}

	h1, h2, h3, p {
		padding: 0 2%;
	}

	header {
	text-align: left;
	}

	header img {
		width: 80px;
	}

	nav a {
		float: none;
		width: auto;
	}

	nav {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		display: none;
	}
}


$(document).ready(function(){
	$("menu-toggle").click (function(){
		$("nav").fadeTogggle(200);
		or
		$("nav").show().animate({left:0}, 200);
	});
});


$(window).resize(function(){
	if($(window).width() > 500) {
		$("nav").attr("style", "");
	}
});


<meta name="viewport" content="initial-scale=1">






------
































*/