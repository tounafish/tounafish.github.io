/*!
 * jQuery placeholder polyfill
 *
 * @author: Brandon Lee Kitajchuk
 * http://blkcreative.com
 * EDITED by aeasterling to check for value before 1st render
 *
 * Tested in IE6-9, Firefox, Safari, Chrome and Opera
 *
 * callback:	function () {},
 * polyClass:	"placeholder",
 * wrapClass:	"placeholder-wrap",
 * tagName:		"span"
 *
 */
(function ( $ ) {

var inp = document.createElement( "input" );

$.support.placeholder = "placeholder" in inp;

inp = null;

$.fn.extend({
	placeholder: function () {
		if ( $.support.placeholder ) {
			return false;
		}

		var settings = {
				callback:	function () {},
				polyClass:	"placeholder",
				wrapClass:	"placeholder-wrap",
				tagName:	"span"
			};

		if ( typeof arguments[0] === "function" ) {
			settings.callback = arguments[0];

		} else {
			$.extend( settings, arguments[0] );
		}

		return this.filter( "[placeholder]" ).each(function ( i ) {
			var $input = $( this ),
				$placeholder = $( "<" +  settings.tagName + " />", {
					"class":	settings.polyClass,
					id:			"ph-" + ( i + 1 ),
					text:		$input.attr( "placeholder" )
				}),
				$wrapper = $( "<" +  settings.tagName + " />", {
					"class":	settings.wrapClass
				});

      /* if starting with value, for example editing forms */
      if ( this.value !== "" ) {
					$placeholder.text( "" );
				}

			$input.wrap( $wrapper ).focus(function ( event ) {
				$placeholder.text( "" );

				settings.callback.apply( this, arguments );

			}).blur(function () {
				if ( this.value !== "" ) {
					$placeholder.text( "" );

				} else {
					$placeholder.text( $( this ).attr( "placeholder" ) );
				}
			});

			$placeholder.insertAfter( $input ).click(function ( event ) {
				$placeholder.text( "" );
				$input.focus();
			});
		});
	}
});

})( jQuery );;
(function($) {

/**
 * Action links tweaks.
 */
Drupal.behaviors.elcActionLinks = {
  attach: function (context, settings) {
    $('.action-links li:first-child').addClass('first');
    $('.action-links, context').hover(function() {
      $(this).toggleClass('active');
    });
  }
}

/**
 * Collapsible menus.
 */
Drupal.behaviors.elcMenuToggle = {
  attach: function (context, settings) {
    $('.menu .menu-item').click(function () {
      $(this).parent().toggleClass('selected');
    });
  }
}

/**
 * IE Placeholder -- depends on js/jquery.placeholder.js.
 */
Drupal.behaviors.formPlaceholder = {
  attach: function (context, settings) {
    // $( "input.field, input.form-text" ).placeholder({
    //   tagName:  "div",
    //   polyClass:  "placeholder",
    //   wrapClass:  "placeholder-wrap",
    //   callback: function () {}
    // });
  }
}

/**
 * Position and fade out console messages
 */
Drupal.behaviors.pageMessages = {
  attach: function(context, settings) {
    var $console = $('#console');

    // Don't do anything further if there are no console message
    if ($console.length == 0) {
      // Estee of course has to be difficult and use different dom.
      $console = $('.main-console');
      if ($console.length == 0) {
        return;
      }
    }

    var docHeight = $(window).height();
    var height = $console.outerHeight(true);
    var topPosition = Math.round((docHeight - height) / 2);

    // Vertically center the console messages
    $console.css('top', topPosition + 'px');
    $('<span id="error-close">x</span>').prependTo( $console.children('.messages') )
        .click(function() {
             $(this).parent().remove();
        });


    // Fade out console messages after 5 seconds
    /*setTimeout(function() {
      $console.fadeOut('fast');
    }, 6000);*/
  }
};

})(jQuery);
;
/* Modernizr 2.7.0 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-flexboxlegacy-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-mq-cssclasses-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function D(a){j.cssText=a}function E(a,b){return D(n.join(a+";")+(b||""))}function F(a,b){return typeof a===b}function G(a,b){return!!~(""+a).indexOf(b)}function H(a,b){for(var d in a){var e=a[d];if(!G(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function I(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:F(f,"function")?f.bind(d||b):f}return!1}function J(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return F(b,"string")||F(b,"undefined")?H(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),I(e,b,c))}function K(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.7.0",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return y("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},A=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=F(e[d],"function"),F(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),B={}.hasOwnProperty,C;!F(B,"undefined")&&!F(B.call,"undefined")?C=function(a,b){return B.call(a,b)}:C=function(a,b){return b in a&&F(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.flexbox=function(){return J("flexWrap")},s.flexboxlegacy=function(){return J("boxDirection")},s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!F(b.createElement("canvas").getContext("2d").fillText,"function")},s.webgl=function(){return!!a.WebGLRenderingContext},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.geolocation=function(){return"geolocation"in navigator},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!J("indexedDB",a)},s.hashchange=function(){return A("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!!a.history&&!!history.pushState},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},s.rgba=function(){return D("background-color:rgba(150,255,150,.5)"),G(j.backgroundColor,"rgba")},s.hsla=function(){return D("background-color:hsla(120,40%,100%,.5)"),G(j.backgroundColor,"rgba")||G(j.backgroundColor,"hsla")},s.multiplebgs=function(){return D("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return J("backgroundSize")},s.borderimage=function(){return J("borderImage")},s.borderradius=function(){return J("borderRadius")},s.boxshadow=function(){return J("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return E("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return J("animationName")},s.csscolumns=function(){return J("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return D((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),G(j.backgroundImage,"gradient")},s.cssreflections=function(){return J("boxReflect")},s.csstransforms=function(){return!!J("transform")},s.csstransforms3d=function(){var a=!!J("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return J("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var L in s)C(s,L)&&(x=L.toLowerCase(),e[x]=s[L](),v.push((e[x]?"":"no-")+x));return e.input||K(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)C(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},D(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.mq=z,e.hasEvent=A,e.testProp=function(a){return H([a])},e.testAllProps=J,e.testStyles=y,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};;
/**
 * Copyright (c) 2007-2013 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.4.7
 */
(function(d){function h(b){return"object"==typeof b?b:{top:b,left:b}}var n=d.scrollTo=function(b,c,a){return d(window).scrollTo(b,c,a)};n.defaults={axis:"xy",duration:1.3<=parseFloat(d.fn.jquery)?0:1,limit:!0};n.window=function(b){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){if(this.nodeName&&-1==d.inArray(this.nodeName.toLowerCase(),["iframe","#document","html","body"]))return this;var b=(this.contentWindow||this).document||this.ownerDocument||this;return/webkit/i.test(navigator.userAgent)|| "BackCompat"==b.compatMode?b.body:b.documentElement})};d.fn.scrollTo=function(b,c,a){"object"==typeof c&&(a=c,c=0);"function"==typeof a&&(a={onAfter:a});"max"==b&&(b=9E9);a=d.extend({},n.defaults,a);c=c||a.duration;a.queue=a.queue&&1<a.axis.length;a.queue&&(c/=2);a.offset=h(a.offset);a.over=h(a.over);return this._scrollable().each(function(){function q(b){k.animate(e,c,a.easing,b&&function(){b.call(this,g,a)})}if(null!=b){var l=this,k=d(l),g=b,p,e={},s=k.is("html,body");switch(typeof g){case "number":case "string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(g)){g= h(g);break}g=d(g,this);if(!g.length)return;case "object":if(g.is||g.style)p=(g=d(g)).offset()}d.each(a.axis.split(""),function(b,d){var c="x"==d?"Left":"Top",m=c.toLowerCase(),f="scroll"+c,h=l[f],r=n.max(l,d);p?(e[f]=p[m]+(s?0:h-k.offset()[m]),a.margin&&(e[f]-=parseInt(g.css("margin"+c))||0,e[f]-=parseInt(g.css("border"+c+"Width"))||0),e[f]+=a.offset[m]||0,a.over[m]&&(e[f]+=g["x"==d?"width":"height"]()*a.over[m])):(c=g[m],e[f]=c.slice&&"%"==c.slice(-1)?parseFloat(c)/100*r:c);a.limit&&/^\d+$/.test(e[f])&& (e[f]=0>=e[f]?0:Math.min(e[f],r));!b&&a.queue&&(h!=e[f]&&q(a.onAfterFirst),delete e[f])});q(a.onAfter)}}).end()};n.max=function(b,c){var a="x"==c?"Width":"Height",h="scroll"+a;if(!d(b).is("html,body"))return b[h]-d(b)[a.toLowerCase()]();var a="client"+a,l=b.ownerDocument.documentElement,k=b.ownerDocument.body;return Math.max(l[h],k[h])-Math.min(l[a],k[a])}})(jQuery);
;
/**
 * Copyright (c) 2007-2013 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.3.1
 */
;(function($){var h=location.href.replace(/#.*/,'');var i=$.localScroll=function(a){$('body').localScroll(a)};i.defaults={duration:1000,axis:'y',event:'click',stop:true,target:window};i.hash=function(a){if(location.hash){a=$.extend({},i.defaults,a);a.hash=false;if(a.reset){var d=a.duration;delete a.duration;$(a.target).scrollTo(0,a);a.duration=d}scroll(0,location,a)}};$.fn.localScroll=function(b){b=$.extend({},i.defaults,b);return b.lazy?this.bind(b.event,function(e){var a=$([e.target,e.target.parentNode]).filter(filter)[0];if(a)scroll(e,a,b)}):this.find('a,area').filter(filter).bind(b.event,function(e){scroll(e,this,b)}).end().end();function filter(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')==h&&(!b.filter||$(this).is(b.filter))}};function scroll(e,a,b){var c=a.hash.slice(1),elem=document.getElementById(c)||document.getElementsByName(c)[0];if(!elem)return;if(e)e.preventDefault();var d=$(b.target);if(b.lock&&d.is(':animated')||b.onBefore&&b.onBefore(e,elem,d)===false)return;if(b.stop)d._scrollable().stop(true);if(b.hash){var f=b.offset;f=f&&f.top||f||0;var g=elem.id==c?'id':'name',$a=$('<a> </a>').attr(g,c).css({position:'absolute',top:$(window).scrollTop()+f,left:$(window).scrollLeft()});elem[g]='';$('body').prepend($a);location=a.hash;$a.remove();elem[g]=c}d.scrollTo(elem,b).trigger('notify.serialScroll',[elem])}})(jQuery);;
/*
 * jQuery selectBox - A cosmetic, styleable replacement for SELECT elements
 *
 * Licensed under the MIT license: http://opensource.org/licenses/MIT
 *
 * v1.2.0
 *
 * https://github.com/marcj/jquery-selectBox
 */
;(function ($) {

    /**
     * SelectBox class.
     *
     * @param {HTMLElement|jQuery} select If it's a jQuery object, we use the first element.
     * @param {Object}             options
     * @constructor
     */
    var SelectBox = this.SelectBox = function (select, options) {
        if (select instanceof jQuery) {
            if (select.length > 0) {
                select = select[0];
            } else {
                return;
            }
        }

        this.typeTimer     = null;
        this.typeSearch    = '';
        this.isMac         = navigator.platform.match(/mac/i);
        options            = 'object' === typeof options ? options :  {};
        this.selectElement = select;

        // Disable for iOS devices (their native controls are more suitable for a touch device)
        if (!options.mobile && navigator.userAgent.match(/iPhone|Android|IEMobile|BlackBerry/i)) {
            return false;
        }

        // Element must be a select control
        if ('select' !== select.tagName.toLowerCase()) {
            return false;
        }

        this.init(options);
    };

    /**
     * @type {String}
     */
    SelectBox.prototype.version = '1.2.0';

    /**
     * @param {Object} options
     *
     * @returns {Boolean}
     */
    SelectBox.prototype.init = function (options) {
        var select = $(this.selectElement);
        if (select.data('selectBox-control')) {
            return false;
        }

        var control    = $('<a class="selectBox" />')
            , inline   = select.attr('multiple') || parseInt(select.attr('size')) > 1
            , settings = options || {}
            , tabIndex = parseInt(select.prop('tabindex')) || 0
            , self     = this;

        control
            // .width(select.outerWidth())
            .addClass(select.attr('class'))
            .attr('title', select.attr('title') || '')
            .attr('tabindex', tabIndex)
            .css('display', 'inline-block')
            .bind('focus.selectBox', function () {
                if (this !== document.activeElement && document.body !== document.activeElement) {
                    $(document.activeElement).blur();
                }
                if (control.hasClass('selectBox-active')) {
                    return;
                }
                control.addClass('selectBox-active');
                select.trigger('focus');
            })
            .bind('blur.selectBox', function () {
                if (!control.hasClass('selectBox-active')) {
                    return;
                }
                control.removeClass('selectBox-active');
                select.trigger('blur');
            });

        if (!$(window).data('selectBox-bindings')) {
            $(window)
                .data('selectBox-bindings', true)
                .bind('scroll.selectBox', (settings.hideOnWindowScroll) ? this.hideMenus : $.noop)
                .bind('resize.selectBox', this.hideMenus);
        }

        if (select.attr('disabled')) {
            control.addClass('selectBox-disabled');
        }

        // Focus on control when label is clicked
        select.bind('click.selectBox', function (event) {
            control.focus();
            event.preventDefault();
        });

        // Generate control
        if (inline) {
            // Inline controls
            options = this.getOptions('inline');

            control
                .append(options)
                .data('selectBox-options', options).addClass('selectBox-inline selectBox-menuShowing')
                .bind('keydown.selectBox', function (event) {
                    self.handleKeyDown(event);
                })
                .bind('keypress.selectBox',function (event) {
                    self.handleKeyPress(event);
                })
                .bind('mousedown.selectBox',function (event) {
                    if (1 !== event.which) {
                        return;
                    }
                    if ($(event.target).is('A.selectBox-inline')) {
                        event.preventDefault();
                    }
                    if (!control.hasClass('selectBox-focus')) {
                        control.focus();
                    }
                })
                .insertAfter(select);

            // Auto-height based on size attribute
            if (!select[0].style.height) {
                var size = select.attr('size') ? parseInt(select.attr('size')) : 5;
                // Draw a dummy control off-screen, measure, and remove it
                var tmp = control
                    .clone()
                    .removeAttr('id')
                    .css({
                        position: 'absolute',
                        top: '-9999em'
                    })
                    .show()
                    .appendTo('body');
                tmp.find('.selectBox-options').html('<li><a>\u00A0</a></li>');
                var optionHeight = parseInt(tmp.find('.selectBox-options A:first').html('&nbsp;').outerHeight());
                tmp.remove();
                control.height(optionHeight * size);
            }
            this.disableSelection(control);
        } else {
            // Dropdown controls
            var label = $('<span class="selectBox-label" />'),
                arrow = $('<span class="selectBox-arrow" />');

            // Update label
            label.attr('class', this.getLabelClass()).text(this.getLabelText());
            options = this.getOptions('dropdown');
            options.appendTo('BODY');

            control
                .data('selectBox-options', options)
                .addClass('selectBox-dropdown')
                .append(label)
                .append(arrow)
                .bind('mousedown.selectBox', function (event) {
                    if (1 === event.which) {
                        if (control.hasClass('selectBox-menuShowing')) {
                            self.hideMenus();
                        } else {
                            event.stopPropagation();
                            // Webkit fix to prevent premature selection of options
                            options
                                .data('selectBox-down-at-x', event.screenX)
                                .data('selectBox-down-at-y', event.screenY);
                            self.showMenu();
                        }
                    }
                })
                .bind('keydown.selectBox', function (event) {
                    self.handleKeyDown(event);
                })
                .bind('keypress.selectBox', function (event) {
                    self.handleKeyPress(event);
                })
                .bind('open.selectBox',function (event, triggerData) {
                    if (triggerData && triggerData._selectBox === true) {
                        return;
                    }
                    self.showMenu();
                })
                .bind('close.selectBox', function (event, triggerData) {
                    if (triggerData && triggerData._selectBox === true) {
                        return;
                    }
                    self.hideMenus();
                })
                .insertAfter(select);

            // Set label width
            // var labelWidth =
            //         control.width()
            //       - arrow.outerWidth()
            //       - (parseInt(label.css('paddingLeft')) || 0)
            //       - (parseInt(label.css('paddingRight')) || 0);

            // label.width(labelWidth);
            this.disableSelection(control);
        }
        // Store data for later use and show the control
        select
            .addClass('selectBox')
            .data('selectBox-control', control)
            .data('selectBox-settings', settings)
            .hide();
    };

    /**
     * @param {String} type 'inline'|'dropdown'
     * @returns {jQuery}
     */
    SelectBox.prototype.getOptions = function (type) {
        var options;
        var select = $(this.selectElement);
        var self   = this;
        // Private function to handle recursion in the getOptions function.
        var _getOptions = function (select, options) {
            // Loop through the set in order of element children.
            select.children('OPTION, OPTGROUP').each(function () {
                // If the element is an option, add it to the list.
                if ($(this).is('OPTION')) {
                    // Check for a value in the option found.
                    if ($(this).length > 0) {
                        // Create an option form the found element.
                        self.generateOptions($(this), options);
                    } else {
                        // No option information found, so add an empty.
                        options.append('<li>\u00A0</li>');
                    }
                } else {
                    // If the element is an option group, add the group and call this function on it.
                    var optgroup = $('<li class="selectBox-optgroup" />');
                    optgroup.text($(this).attr('label'));
                    options.append(optgroup);
                    options = _getOptions($(this), options);
                }
            });
            // Return the built strin
            return options;
        };

        switch (type) {
            case 'inline':
                options = $('<ul class="selectBox-options" />');
                options = _getOptions(select, options);
                options
                    .find('A')
                    .bind('mouseover.selectBox', function (event) {
                        self.addHover($(this).parent());
                    })
                    .bind('mouseout.selectBox',function (event) {
                        self.removeHover($(this).parent());
                    })
                    .bind('mousedown.selectBox',function (event) {
                        if (1 !== event.which) {
                            return
                        }
                        event.preventDefault(); // Prevent options from being "dragged"
                        if (!select.selectBox('control').hasClass('selectBox-active')) {
                            select.selectBox('control').focus();
                        }
                    })
                    .bind('mouseup.selectBox', function (event) {
                        if (1 !== event.which) {
                            return;
                        }
                        self.hideMenus();
                        self.selectOption($(this).parent(), event);
                    });

                this.disableSelection(options);
                return options;
            case 'dropdown':
                options = $('<ul class="selectBox-dropdown-menu selectBox-options" />');
                options = _getOptions(select, options);

                options
                    .data('selectBox-select', select)
                    .css('display', 'none')
                    .appendTo('BODY')
                    .find('A')
                    .bind('mousedown.selectBox', function (event) {
                        if (event.which === 1) {
                            event.preventDefault(); // Prevent options from being "dragged"
                            if (event.screenX === options.data('selectBox-down-at-x') &&
                                event.screenY === options.data('selectBox-down-at-y')) {
                                options.removeData('selectBox-down-at-x').removeData('selectBox-down-at-y');
                                if (/android/i.test(navigator.userAgent.toLowerCase()) &&
                                    /chrome/i.test(navigator.userAgent.toLowerCase())) {
                                    self.selectOption($(this).parent());
                                }
                                self.hideMenus();
                            }
                        }
                    })
                    .bind('mouseup.selectBox', function (event) {
                        if (1 !== event.which) {
                            return;
                        }
                        if (event.screenX === options.data('selectBox-down-at-x') &&
                            event.screenY === options.data('selectBox-down-at-y')) {
                            return;
                        } else {
                            options.removeData('selectBox-down-at-x').removeData('selectBox-down-at-y');
                        }
                        self.selectOption($(this).parent());
                        self.hideMenus();
                    })
                    .bind('mouseover.selectBox', function (event) {
                        self.addHover($(this).parent());
                    })
                    .bind('mouseout.selectBox', function (event) {
                        self.removeHover($(this).parent());
                    });

                // Inherit classes for dropdown menu
                var classes = select.attr('class') || '';
                if ('' !== classes) {
                    classes = classes.split(' ');
                    for (var i = 0; i < classes.length; i++) {
                        options.addClass(classes[i] + '-selectBox-dropdown-menu');
                    }

                }
                this.disableSelection(options);
                return options;
        }
    };

    /**
     * Returns the current class of the selected option.
     *
     * @returns {String}
     */
    SelectBox.prototype.getLabelClass = function () {
        var selected = $(this.selectElement).find('OPTION:selected');
        return ('selectBox-label ' + (selected.attr('class') || '')).replace(/\s+$/, '');
    };

    /**
     * Returns the current label of the selected option.
     *
     * @returns {String}
     */
    SelectBox.prototype.getLabelText = function () {
        var selected = $(this.selectElement).find('OPTION:selected');
        return selected.text() || '\u00A0';
    };

    /**
     * Sets the label.
     * This method uses the getLabelClass() and getLabelText() methods.
     */
    SelectBox.prototype.setLabel = function () {
        var select = $(this.selectElement);
        var control = select.data('selectBox-control');
        if (!control) {
            return;
        }

        control
            .find('.selectBox-label')
            .attr('class', this.getLabelClass())
            .text(this.getLabelText());
    };

    /**
     * Destroys the SelectBox instance and shows the origin select element.
     *
     */
    SelectBox.prototype.destroy = function () {
        var select = $(this.selectElement);
        var control = select.data('selectBox-control');
        if (!control) {
            return;
        }

        var options = control.data('selectBox-options');
        options.remove();
        control.remove();
        select
            .removeClass('selectBox')
            .removeData('selectBox-control')
            .data('selectBox-control', null)
            .removeData('selectBox-settings')
            .data('selectBox-settings', null)
            .show();
    };

    /**
     * Refreshes the option elements.
     */
    SelectBox.prototype.refresh = function () {
        var select = $(this.selectElement)
            , control = select.data('selectBox-control')
            , type = control.hasClass('selectBox-dropdown') ? 'dropdown' : 'inline'
            , options;

        // Remove old options
        control.data('selectBox-options').remove();

        // Generate new options
        options  = this.getOptions(type);
        control.data('selectBox-options', options);

        switch (type) {
            case 'inline':
                control.append(options);
                break;
            case 'dropdown':
                // Update label
                this.setLabel();
                $("BODY").append(options);
                break;
        }

        // Restore opened dropdown state (original menu was trashed)
        if ('dropdown' === type && control.hasClass('selectBox-menuShowing')) {
            this.showMenu();
        }
    };

    /**
     * Shows the dropdown menu.
     */
    SelectBox.prototype.showMenu = function () {
        var self = this
            , select   = $(this.selectElement)
            , control  = select.data('selectBox-control')
            , settings = select.data('selectBox-settings')
            , options  = control.data('selectBox-options');

        if (control.hasClass('selectBox-disabled')) {
            return false;
        }

        this.hideMenus();

        // Get top and bottom width of selectBox
        var borderBottomWidth = parseInt(control.css('borderBottomWidth')) || 0;
        var borderTopWidth = parseInt(control.css('borderTopWidth')) || 0;

        // Get proper variables for keeping options in viewport
        var pos = control.offset()
            , topPositionCorrelation = (settings.topPositionCorrelation) ? settings.topPositionCorrelation : 0
            , bottomPositionCorrelation = (settings.bottomPositionCorrelation) ? settings.bottomPositionCorrelation : 0
            , optionsHeight = options.outerHeight()
            , controlHeight = control.outerHeight()
            , maxHeight = parseInt(options.css('max-height'))
            , scrollPos = $(window).scrollTop()
            , heightToTop = pos.top - scrollPos
            , heightToBottom = $(window).height() - ( heightToTop + controlHeight )
            , posTop = (heightToTop > heightToBottom) && (settings.keepInViewport == null ? true : settings.keepInViewport)
            , top = posTop
                  ? pos.top - optionsHeight + borderTopWidth + topPositionCorrelation
                  : pos.top + controlHeight - borderBottomWidth - bottomPositionCorrelation;


        // If the height to top and height to bottom are less than the max-height
        if(heightToTop < maxHeight&& heightToBottom < maxHeight){

            // Set max-height and top
            if(posTop){
                var maxHeightDiff = maxHeight - ( heightToTop - 5 );
                options.css({'max-height': maxHeight - maxHeightDiff + 'px'});
                top = top + maxHeightDiff;
            }else{
                var maxHeightDiff = maxHeight - ( heightToBottom - 5 );
                options.css({'max-height': maxHeight - maxHeightDiff + 'px'});
            }

        }

        // Save if position is top to options data
        options.data('posTop',posTop);


        // Menu position
        options
            .width(control.innerWidth())
            .css({
                top: top,
                left: control.offset().left
            })
            // Add Top and Bottom class based on position
            .addClass('selectBox-options selectBox-options-'+(posTop?'top':'bottom'));


        if (select.triggerHandler('beforeopen')) {
            return false;
        }

        var dispatchOpenEvent = function () {
            select.triggerHandler('open', {
                _selectBox: true
            });
        };

        // Show menu
        switch (settings.menuTransition) {
            case 'fade':
                options.fadeIn(settings.menuSpeed, dispatchOpenEvent);
                break;
            case 'slide':
                options.slideDown(settings.menuSpeed, dispatchOpenEvent);
                break;
            default:
                options.show(settings.menuSpeed, dispatchOpenEvent);
                break;
        }

        if (!settings.menuSpeed) {
            dispatchOpenEvent();
        }

        // Center on selected option
        var li = options.find('.selectBox-selected:first');
        this.keepOptionInView(li, true);
        this.addHover(li);
        control.addClass('selectBox-menuShowing selectBox-menuShowing-'+(posTop?'top':'bottom'));

        $(document).bind('mousedown.selectBox', function (event) {
            if (1 === event.which) {
                if ($(event.target).parents().andSelf().hasClass('selectBox-options')) {
                    return;
                }
                self.hideMenus();
            }
        });
    };

    /**
     * Hides the menu of all instances.
     */
    SelectBox.prototype.hideMenus = function () {
        if ($(".selectBox-dropdown-menu:visible").length === 0) {
            return;
        }

        $(document).unbind('mousedown.selectBox');
        $(".selectBox-dropdown-menu").each(function () {
            var options = $(this)
                , select = options.data('selectBox-select')
                , control = select.data('selectBox-control')
                , settings = select.data('selectBox-settings')
                , posTop = options.data('posTop');

            if (select.triggerHandler('beforeclose')) {
                return false;
            }

            var dispatchCloseEvent = function () {
                select.triggerHandler('close', {
                    _selectBox: true
                });
            };
            if (settings) {
                switch (settings.menuTransition) {
                    case 'fade':
                        options.fadeOut(settings.menuSpeed, dispatchCloseEvent);
                        break;
                    case 'slide':
                        options.slideUp(settings.menuSpeed, dispatchCloseEvent);
                        break;
                    default:
                        options.hide(settings.menuSpeed, dispatchCloseEvent);
                        break;
                }
                if (!settings.menuSpeed) {
                    dispatchCloseEvent();
                }
                control.removeClass('selectBox-menuShowing selectBox-menuShowing-'+(posTop?'top':'bottom'));
            } else {
                $(this).hide();
                $(this).triggerHandler('close', {
                    _selectBox: true
                });
                $(this).removeClass('selectBox-menuShowing selectBox-menuShowing-'+(posTop?'top':'bottom'));
            }

            options.css('max-height','');
            //Remove Top or Bottom class based on position
            options.removeClass('selectBox-options-'+(posTop?'top':'bottom'));
            options.data('posTop' , false);
        });
    };

    /**
     * Selects an option.
     *
     * @param {HTMLElement} li
     * @param {DOMEvent}    event
     * @returns {Boolean}
     */
    SelectBox.prototype.selectOption = function (li, event) {
        var select = $(this.selectElement);
        li         = $(li);

        var control    = select.data('selectBox-control')
            , settings = select.data('selectBox-settings');

        if (control.hasClass('selectBox-disabled')) {
            return false;
        }

        if (0 === li.length || li.hasClass('selectBox-disabled')) {
            return false;
        }

        if (select.attr('multiple')) {
            // If event.shiftKey is true, this will select all options between li and the last li selected
            if (event.shiftKey && control.data('selectBox-last-selected')) {
                li.toggleClass('selectBox-selected');
                var affectedOptions;
                if (li.index() > control.data('selectBox-last-selected').index()) {
                    affectedOptions = li
                        .siblings()
                        .slice(control.data('selectBox-last-selected').index(), li.index());
                } else {
                    affectedOptions = li
                        .siblings()
                        .slice(li.index(), control.data('selectBox-last-selected').index());
                }
                affectedOptions = affectedOptions.not('.selectBox-optgroup, .selectBox-disabled');
                if (li.hasClass('selectBox-selected')) {
                    affectedOptions.addClass('selectBox-selected');
                } else {
                    affectedOptions.removeClass('selectBox-selected');
                }
            } else if ((this.isMac && event.metaKey) || (!this.isMac && event.ctrlKey)) {
                li.toggleClass('selectBox-selected');
            } else {
                li.siblings().removeClass('selectBox-selected');
                li.addClass('selectBox-selected');
            }
        } else {
            li.siblings().removeClass('selectBox-selected');
            li.addClass('selectBox-selected');
        }

        if (control.hasClass('selectBox-dropdown')) {
            control.find('.selectBox-label').text(li.text());
        }

        // Update original control's value
        var i = 0, selection = [];
        if (select.attr('multiple')) {
            control.find('.selectBox-selected A').each(function () {
                selection[i++] = $(this).attr('rel');
            });
        } else {
            selection = li.find('A').attr('rel');
        }

        // Remember most recently selected item
        control.data('selectBox-last-selected', li);

        // Change callback
        if (select.val() !== selection) {
            select.val(selection);
            this.setLabel();
            select.trigger('change');
        }

        return true;
    };

    /**
     * Adds the hover class.
     *
     * @param {HTMLElement} li
     */
    SelectBox.prototype.addHover = function (li) {
        li = $(li);
        var select = $(this.selectElement)
            , control   = select.data('selectBox-control')
            , options = control.data('selectBox-options');

        options.find('.selectBox-hover').removeClass('selectBox-hover');
        li.addClass('selectBox-hover');
    };

    /**
     * Returns the original HTML select element.
     *
     * @returns {HTMLElement}
     */
    SelectBox.prototype.getSelectElement = function () {
        return this.selectElement;
    };

    /**
     * Remove the hover class.
     *
     * @param {HTMLElement} li
     */
    SelectBox.prototype.removeHover = function (li) {
        li = $(li);
        var select = $(this.selectElement)
            , control = select.data('selectBox-control')
            , options = control.data('selectBox-options');

        options.find('.selectBox-hover').removeClass('selectBox-hover');
    };

    /**
     * Checks if the widget is in the view.
     *
     * @param {jQuery}      li
     * @param {Boolean}     center
     */
    SelectBox.prototype.keepOptionInView = function (li, center) {
        if (!li || li.length === 0) {
            return;
        }

        var select = $(this.selectElement)
            , control     = select.data('selectBox-control')
            , options   = control.data('selectBox-options')
            , scrollBox = control.hasClass('selectBox-dropdown') ? options : options.parent()
            , top       = parseInt(li.offset().top -scrollBox.position().top)
            , bottom    = parseInt(top + li.outerHeight());

        if (center) {
            scrollBox.scrollTop(li.offset().top - scrollBox.offset().top + scrollBox.scrollTop() -
                (scrollBox.height() / 2));
        } else {
            if (top < 0) {
                scrollBox.scrollTop(li.offset().top - scrollBox.offset().top + scrollBox.scrollTop());
            }
            if (bottom > scrollBox.height()) {
                scrollBox.scrollTop((li.offset().top + li.outerHeight()) - scrollBox.offset().top +
                    scrollBox.scrollTop() - scrollBox.height());
            }
        }
    };

    /**
     * Handles the keyDown event.
     * Handles open/close and arrow key functionality
     *
     * @param {DOMEvent}    event
     */
    SelectBox.prototype.handleKeyDown = function (event) {
        var select = $(this.selectElement)
            , control        = select.data('selectBox-control')
            , options      = control.data('selectBox-options')
            , settings     = select.data('selectBox-settings')
            , totalOptions = 0, i = 0;

        if (control.hasClass('selectBox-disabled')) {
            return;
        }

        switch (event.keyCode) {
            case 8:
                // backspace
                event.preventDefault();
                this.typeSearch = '';
                break;
            case 9:
            // tab
            case 27:
                // esc
                this.hideMenus();
                this.removeHover();
                break;
            case 13:
                // enter
                if (control.hasClass('selectBox-menuShowing')) {
                    this.selectOption(options.find('LI.selectBox-hover:first'), event);
                    if (control.hasClass('selectBox-dropdown')) {
                        this.hideMenus();
                    }
                } else {
                    this.showMenu();
                }
                break;
            case 38:
            // up
            case 37:
                // left
                event.preventDefault();
                if (control.hasClass('selectBox-menuShowing')) {
                    var prev = options.find('.selectBox-hover').prev('LI');
                    totalOptions = options.find('LI:not(.selectBox-optgroup)').length;
                    i = 0;
                    while (prev.length === 0 || prev.hasClass('selectBox-disabled') ||
                        prev.hasClass('selectBox-optgroup')) {
                        prev = prev.prev('LI');
                        if (prev.length === 0) {
                            if (settings.loopOptions) {
                                prev = options.find('LI:last');
                            } else {
                                prev = options.find('LI:first');
                            }
                        }
                        if (++i >= totalOptions) {
                            break;
                        }
                    }
                    this.addHover(prev);
                    this.selectOption(prev, event);
                    this.keepOptionInView(prev);
                } else {
                    this.showMenu();
                }
                break;
            case 40:
            // down
            case 39:
                // right
                event.preventDefault();
                if (control.hasClass('selectBox-menuShowing')) {
                    var next = options.find('.selectBox-hover').next('LI');
                    totalOptions = options.find('LI:not(.selectBox-optgroup)').length;
                    i = 0;
                    while (0 === next.length || next.hasClass('selectBox-disabled') ||
                        next.hasClass('selectBox-optgroup')) {
                        next = next.next('LI');
                        if (next.length === 0) {
                            if (settings.loopOptions) {
                                next = options.find('LI:first');
                            } else {
                                next = options.find('LI:last');
                            }
                        }
                        if (++i >= totalOptions) {
                            break;
                        }
                    }
                    this.addHover(next);
                    this.selectOption(next, event);
                    this.keepOptionInView(next);
                } else {
                    this.showMenu();
                }
                break;
        }
    };

    /**
     * Handles the keyPress event.
     * Handles type-to-find functionality
     *
     * @param {DOMEvent}    event
     */
    SelectBox.prototype.handleKeyPress = function (event) {
        var select = $(this.selectElement)
            , control = select.data('selectBox-control')
            , options = control.data('selectBox-options')
            , self    = this;

        if (control.hasClass('selectBox-disabled')) {
            return;
        }

        switch (event.keyCode) {
            case 9:
            // tab
            case 27:
            // esc
            case 13:
            // enter
            case 38:
            // up
            case 37:
            // left
            case 40:
            // down
            case 39:
                // right
                // Don't interfere with the keydown event!
                break;
            default:
                // Type to find
                if (!control.hasClass('selectBox-menuShowing')) {
                    this.showMenu();
                }
                event.preventDefault();
                clearTimeout(this.typeTimer);
                this.typeSearch += String.fromCharCode(event.charCode || event.keyCode);
                options.find('A').each(function () {
                    if ($(this).text().substr(0, self.typeSearch.length).toLowerCase() === self.typeSearch.toLowerCase()) {
                        self.addHover($(this).parent());
                        self.selectOption($(this).parent(), event);
                        self.keepOptionInView($(this).parent());
                        return false;
                    }
                });
                // Clear after a brief pause
                this.typeTimer = setTimeout(function () {
                    self.typeSearch = '';
                }, 1000);
                break;
        }
    };

    /**
     * Enables the selectBox.
     */
    SelectBox.prototype.enable = function () {
        var select = $(this.selectElement);
        select.prop('disabled', false);
        var control = select.data('selectBox-control');
        if (!control) {
            return;
        }
        control.removeClass('selectBox-disabled');
    };

    /**
     * Disables the selectBox.
     */
    SelectBox.prototype.disable = function () {
        var select = $(this.selectElement);
        select.prop('disabled', true);
        var control = select.data('selectBox-control');
        if (!control) {
            return;
        }
        control.addClass('selectBox-disabled');
    };

    /**
     * Sets the current value.
     *
     * @param {String}      value
     */
    SelectBox.prototype.setValue = function (value) {
        var select = $(this.selectElement);
        select.val(value);
        value = select.val(); // IE9's select would be null if it was set with a non-exist options value

        if (null === value) { // So check it here and set it with the first option's value if possible
            value = select.children().first().val();
            select.val(value);
        }

        var control = select.data('selectBox-control');
        if (!control) {
            return;
        }

        var settings = select.data('selectBox-settings')
            , options = control.data('selectBox-options');

        // Update label
        this.setLabel();

        // Update control values
        options.find('.selectBox-selected').removeClass('selectBox-selected');
        options.find('A').each(function () {
            if (typeof(value) === 'object') {
                for (var i = 0; i < value.length; i++) {
                    if ($(this).attr('rel') == value[i]) {
                        $(this).parent().addClass('selectBox-selected');
                    }
                }
            } else {
                if ($(this).attr('rel') == value) {
                    $(this).parent().addClass('selectBox-selected');
                }
            }
        });

        if (settings.change) {
            settings.change.call(select);
        }
    };

    /**
     * Sets the option elements.
     *
     * @param {String|Object} options
     */
    SelectBox.prototype.setOptions = function (options) {
        var select = $(this.selectElement)
            , control = select.data('selectBox-control');

        switch (typeof(options)) {
            case 'string':
                select.html(options);
                break;
            case 'object':
                select.html('');
                for (var i in options) {
                    if (options[i] === null) {
                        continue;
                    }
                    if (typeof(options[i]) === 'object') {
                        var optgroup = $('<optgroup label="' + i + '" />');
                        for (var j in options[i]) {
                            optgroup.append('<option value="' + j + '">' + options[i][j] + '</option>');
                        }
                        select.append(optgroup);
                    } else {
                        var option = $('<option value="' + i + '">' + options[i] + '</option>');
                        select.append(option);
                    }
                }
                break;
        }

        if (control) {
            // Refresh the control
            this.refresh();
        }
    };

    /**
     * Disables the selection.
     *
     * @param {*} selector
     */
    SelectBox.prototype.disableSelection = function (selector) {
        $(selector).css('MozUserSelect', 'none').bind('selectstart', function (event) {
            event.preventDefault();
        });
    };

    /**
     * Generates the options.
     *
     * @param {jQuery} self
     * @param {jQuery} options
     */
    SelectBox.prototype.generateOptions = function (self, options) {
        var li = $('<li />'), a = $('<a />');
        li.addClass(self.attr('class'));
        li.data(self.data());
        a.attr('rel', self.val()).text(self.text());
        li.append(a);
        if (self.attr('disabled')) {
            li.addClass('selectBox-disabled');
        }
        if (self.attr('selected')) {
            li.addClass('selectBox-selected');
        }
        options.append(li);
    };

    /**
     * Extends the jQuery.fn object.
     */
    $.extend($.fn, {
        selectBox: function (method, options) {
            var selectBox;

            switch (method) {
                case 'control':
                    return $(this).data('selectBox-control');
                case 'settings':
                    if (!options) {
                        return $(this).data('selectBox-settings');
                    }
                    $(this).each(function () {
                        $(this).data('selectBox-settings', $.extend(true, $(this).data('selectBox-settings'), options));
                    });
                    break;
                case 'options':
                    // Getter
                    if (undefined === options) {
                        return $(this).data('selectBox-control').data('selectBox-options');
                    }
                    // Setter
                    $(this).each(function () {
                        if (selectBox = $(this).data('selectBox')) {
                            selectBox.setOptions(options);
                        }
                    });
                    break;
                case 'value':
                    // Empty string is a valid value
                    if (undefined === options) {
                        return $(this).val();
                    }
                    $(this).each(function () {
                        if (selectBox = $(this).data('selectBox')) {
                            selectBox.setValue(options);
                        }
                    });
                    break;
                case 'refresh':
                    $(this).each(function () {
                        if (selectBox = $(this).data('selectBox')) {
                            selectBox.refresh();
                        }
                    });
                    break;
                case 'enable':
                    $(this).each(function () {
                        if (selectBox = $(this).data('selectBox')) {
                            selectBox.enable(this);
                        }
                    });
                    break;
                case 'disable':
                    $(this).each(function () {
                        if (selectBox = $(this).data('selectBox')) {
                            selectBox.disable();
                        }
                    });
                    break;
                case 'destroy':
                    $(this).each(function () {
                        if (selectBox = $(this).data('selectBox')) {
                            selectBox.destroy();
                            $(this).data('selectBox', null);
                        }
                    });
                    break;
                case 'instance':
                    return $(this).data('selectBox');
                default:
                    $(this).each(function (idx, select) {
                        if (!$(select).data('selectBox')) {
                            $(select).data('selectBox', new SelectBox(select, method));
                        }
                    });
                    break;
            }
            return $(this);
        }
    });
})(jQuery);
;
// Generated by CoffeeScript 1.6.2
/*
jQuery Waypoints - v2.0.4
Copyright (c) 2011-2014 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(this,function(n,r){var i,o,l,s,f,u,c,a,h,d,p,y,v,w,g,m;i=n(r);a=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;c={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};this.element[u]=this.id;c[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||a)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(a&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete c[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;r=n.extend({},n.fn[g].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=this.element[w])!=null?o:[];i.push(this.id);this.element[w]=i}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=t[w];if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;if(e==null){e={}}if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=c[i[0][u]];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke.call(this,"disable")},enable:function(){return d._invoke.call(this,"enable")},destroy:function(){return d._invoke.call(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t){this.each(function(){var e;e=l.getWaypointsByElement(this);return n.each(e,function(e,n){n[t]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(c,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=c[n(t)[0][u]])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=c[n(t)[0][u]];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.load(function(){return n[m]("refresh")})})}).call(this);;
//     Underscore.js 1.5.2
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,w=Object.keys,_=i.bind,j=function(n){return n instanceof j?n:this instanceof j?(this._wrapped=n,void 0):new j(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=j),exports._=j):n._=j,j.VERSION="1.5.2";var A=j.each=j.forEach=function(n,t,e){if(null!=n)if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a=j.keys(n),u=0,i=a.length;i>u;u++)if(t.call(e,n[a[u]],a[u],n)===r)return};j.map=j.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e.push(t.call(r,n,u,i))}),e)};var E="Reduce of empty array with no initial value";j.reduce=j.foldl=j.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduce===h)return e&&(t=j.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(E);return r},j.reduceRight=j.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return e&&(t=j.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=j.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(E);return r},j.find=j.detect=function(n,t,r){var e;return O(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},j.filter=j.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&e.push(n)}),e)},j.reject=function(n,t,r){return j.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},j.every=j.all=function(n,t,e){t||(t=j.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var O=j.some=j.any=function(n,t,e){t||(t=j.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};j.contains=j.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:O(n,function(n){return n===t})},j.invoke=function(n,t){var r=o.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){return(e?t:n[t]).apply(n,r)})},j.pluck=function(n,t){return j.map(n,function(n){return n[t]})},j.where=function(n,t,r){return j.isEmpty(t)?r?void 0:[]:j[r?"find":"filter"](n,function(n){for(var r in t)if(t[r]!==n[r])return!1;return!0})},j.findWhere=function(n,t){return j.where(n,t,!0)},j.max=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);if(!t&&j.isEmpty(n))return-1/0;var e={computed:-1/0,value:-1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a>e.computed&&(e={value:n,computed:a})}),e.value},j.min=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);if(!t&&j.isEmpty(n))return 1/0;var e={computed:1/0,value:1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a<e.computed&&(e={value:n,computed:a})}),e.value},j.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=j.random(r++),e[r-1]=e[t],e[t]=n}),e},j.sample=function(n,t,r){return arguments.length<2||r?n[j.random(n.length-1)]:j.shuffle(n).slice(0,Math.max(0,t))};var k=function(n){return j.isFunction(n)?n:function(t){return t[n]}};j.sortBy=function(n,t,r){var e=k(t);return j.pluck(j.map(n,function(n,t,u){return{value:n,index:t,criteria:e.call(r,n,t,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={},i=null==r?j.identity:k(r);return A(t,function(r,a){var o=i.call(e,r,a,t);n(u,o,r)}),u}};j.groupBy=F(function(n,t,r){(j.has(n,t)?n[t]:n[t]=[]).push(r)}),j.indexBy=F(function(n,t,r){n[t]=r}),j.countBy=F(function(n,t){j.has(n,t)?n[t]++:n[t]=1}),j.sortedIndex=function(n,t,r,e){r=null==r?j.identity:k(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;r.call(e,n[o])<u?i=o+1:a=o}return i},j.toArray=function(n){return n?j.isArray(n)?o.call(n):n.length===+n.length?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:n.length===+n.length?n.length:j.keys(n).length},j.first=j.head=j.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:o.call(n,0,t)},j.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},j.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},j.rest=j.tail=j.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var M=function(n,t,r){return t&&j.every(n,j.isArray)?c.apply(r,n):(A(n,function(n){j.isArray(n)||j.isArguments(n)?t?a.apply(r,n):M(n,t,r):r.push(n)}),r)};j.flatten=function(n,t){return M(n,t,[])},j.without=function(n){return j.difference(n,o.call(arguments,1))},j.uniq=j.unique=function(n,t,r,e){j.isFunction(t)&&(e=r,r=t,t=!1);var u=r?j.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:j.contains(a,r))||(a.push(r),i.push(n[e]))}),i},j.union=function(){return j.uniq(j.flatten(arguments,!0))},j.intersection=function(n){var t=o.call(arguments,1);return j.filter(j.uniq(n),function(n){return j.every(t,function(t){return j.indexOf(t,n)>=0})})},j.difference=function(n){var t=c.apply(e,o.call(arguments,1));return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){for(var n=j.max(j.pluck(arguments,"length").concat(0)),t=new Array(n),r=0;n>r;r++)t[r]=j.pluck(arguments,""+r);return t},j.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=j.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},j.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},j.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=new Array(e);e>u;)i[u++]=n,n+=r;return i};var R=function(){};j.bind=function(n,t){var r,e;if(_&&n.bind===_)return _.apply(n,o.call(arguments,1));if(!j.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));R.prototype=n.prototype;var u=new R;R.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},j.partial=function(n){var t=o.call(arguments,1);return function(){return n.apply(this,t.concat(o.call(arguments)))}},j.bindAll=function(n){var t=o.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return A(t,function(t){n[t]=j.bind(n[t],n)}),n},j.memoize=function(n,t){var r={};return t||(t=j.identity),function(){var e=t.apply(this,arguments);return j.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},j.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=function(n){return j.delay.apply(j,[n,1].concat(o.call(arguments,1)))},j.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var c=function(){o=r.leading===!1?0:new Date,a=null,i=n.apply(e,u)};return function(){var l=new Date;o||r.leading!==!1||(o=l);var f=t-(l-o);return e=this,u=arguments,0>=f?(clearTimeout(a),a=null,o=l,i=n.apply(e,u)):a||r.trailing===!1||(a=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u,i,a,o;return function(){i=this,u=arguments,a=new Date;var c=function(){var l=new Date-a;t>l?e=setTimeout(c,t-l):(e=null,r||(o=n.apply(i,u)))},l=r&&!e;return e||(e=setTimeout(c,t)),l&&(o=n.apply(i,u)),o}},j.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},j.wrap=function(n,t){return function(){var r=[n];return a.apply(r,arguments),t.apply(this,r)}},j.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.keys=w||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t=[];for(var r in n)j.has(n,r)&&t.push(r);return t},j.values=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},j.pairs=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},j.invert=function(n){for(var t={},r=j.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},j.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},j.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)j.contains(r,u)||(t[u]=n[u]);return t},j.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]===void 0&&(n[r]=t[r])}),n},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;var a=n.constructor,o=t.constructor;if(a!==o&&!(j.isFunction(a)&&a instanceof a&&j.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c=0,f=!0;if("[object Array]"==u){if(c=n.length,f=c==t.length)for(;c--&&(f=S(n[c],t[c],r,e)););}else{for(var s in n)if(j.has(n,s)&&(c++,!(f=j.has(t,s)&&S(n[s],t[s],r,e))))break;if(f){for(s in t)if(j.has(t,s)&&!c--)break;f=!c}}return r.pop(),e.pop(),f};j.isEqual=function(n,t){return S(n,t,[],[])},j.isEmpty=function(n){if(null==n)return!0;if(j.isArray(n)||j.isString(n))return 0===n.length;for(var t in n)if(j.has(n,t))return!1;return!0},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=x||function(n){return"[object Array]"==l.call(n)},j.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){j["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return!(!n||!j.has(n,"callee"))}),"function"!=typeof/./&&(j.isFunction=function(n){return"function"==typeof n}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!=+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return n===void 0},j.has=function(n,t){return f.call(n,t)},j.noConflict=function(){return n._=t,this},j.identity=function(n){return n},j.times=function(n,t,r){for(var e=Array(Math.max(0,n)),u=0;n>u;u++)e[u]=t.call(r,u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))};var I={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};I.unescape=j.invert(I.escape);var T={escape:new RegExp("["+j.keys(I.escape).join("")+"]","g"),unescape:new RegExp("("+j.keys(I.unescape).join("|")+")","g")};j.each(["escape","unescape"],function(n){j[n]=function(t){return null==t?"":(""+t).replace(T[n],function(t){return I[n][t]})}}),j.result=function(n,t){if(null==n)return void 0;var r=n[t];return j.isFunction(r)?r.call(n):r},j.mixin=function(n){A(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(j,n))}})};var N=0;j.uniqueId=function(n){var t=++N+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;j.template=function(n,t,r){var e;r=j.defaults({},r,j.templateSettings);var u=new RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(D,function(n){return"\\"+B[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=new Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,j);var c=function(n){return e.call(this,n,j)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},j.chain=function(n){return j(n).chain()};var z=function(n){return this._chain?j(n).chain():n};j.mixin(j),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];j.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),j.extend(j.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);
//# sourceMappingURL=underscore-min.map;
/*
 * jQuery outside events - v1.1 - 3/16/2010
 * http://benalman.com/projects/jquery-outside-events-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,c,b){$.map("click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup".split(" "),function(d){a(d)});a("focusin","focus"+b);a("focusout","blur"+b);$.addOutsideEvent=a;function a(g,e){e=e||g+b;var d=$(),h=g+"."+e+"-special-event";$.event.special[e]={setup:function(){d=d.add(this);if(d.length===1){$(c).bind(h,f)}},teardown:function(){d=d.not(this);if(d.length===0){$(c).unbind(h)}},add:function(i){var j=i.handler;i.handler=function(l,k){l.target=k;j.apply(this,arguments)}}};function f(i){$(d).each(function(){var j=$(this);if(this!==i.target&&!j.has(i.target).length){j.triggerHandler(e,[i.target])}})}}})(jQuery,document,"outside");
;
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false*/

(function (root, factory) {
  if (typeof exports === "object" && exports) {
    factory(exports); // CommonJS
  } else {
    var mustache = {};
    factory(mustache);
    if (typeof define === "function" && define.amd) {
      define(mustache); // AMD
    } else {
      root.Mustache = mustache; // <script>
    }
  }
}(this, function (mustache) {

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var RegExp_test = RegExp.prototype.test;
  function testRegExp(re, string) {
    return RegExp_test.call(re, string);
  }

  var nonSpaceRe = /\S/;
  function isWhitespace(string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var Object_toString = Object.prototype.toString;
  var isArray = Array.isArray || function (object) {
    return Object_toString.call(object) === '[object Array]';
  };

  function isFunction(object) {
    return typeof object === 'function';
  }

  function escapeRegExp(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  function escapeTags(tags) {
    if (!isArray(tags) || tags.length !== 2) {
      throw new Error('Invalid tags: ' + tags);
    }

    return [
      new RegExp(escapeRegExp(tags[0]) + "\\s*"),
      new RegExp("\\s*" + escapeRegExp(tags[1]))
    ];
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
  function parseTemplate(template, tags) {
    tags = tags || mustache.tags;
    template = template || '';

    if (typeof tags === 'string') {
      tags = tags.split(spaceRe);
    }

    var tagRes = escapeTags(tags);
    var scanner = new Scanner(template);

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length) {
          delete tokens[spaces.pop()];
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(tagRes[0]);
      if (value) {
        for (var i = 0, len = value.length; i < len; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push(['text', chr, start, start + 1]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n') {
            stripSpace();
          }
        }
      }

      // Match the opening tag.
      if (!scanner.scan(tagRes[0])) break;
      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(tagRes[1]);
      } else if (type === '{') {
        value = scanner.scanUntil(new RegExp('\\s*' + escapeRegExp('}' + tags[1])));
        scanner.scan(curlyRe);
        scanner.scanUntil(tagRes[1]);
        type = '&';
      } else {
        value = scanner.scanUntil(tagRes[1]);
      }

      // Match the closing tag.
      if (!scanner.scan(tagRes[1])) {
        throw new Error('Unclosed tag at ' + scanner.pos);
      }

      token = [ type, value, start, scanner.pos ];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection) {
          throw new Error('Unopened section "' + value + '" at ' + start);
        }
        if (openSection[1] !== value) {
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
        }
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        tagRes = escapeTags(tags = value.split(spaceRe));
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();
    if (openSection) {
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
    }

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens(tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case '#':
      case '^':
        collector.push(token);
        sections.push(token);
        collector = token[4] = [];
        break;
      case '/':
        section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
        break;
      default:
        collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function () {
    return this.tail === "";
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function (re) {
    var match = this.tail.match(re);

    if (match && match.index === 0) {
      var string = match[0];
      this.tail = this.tail.substring(string.length);
      this.pos += string.length;
      return string;
    }

    return "";
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function (re) {
    var index = this.tail.search(re), match;

    switch (index) {
    case -1:
      match = this.tail;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context(view, parentContext) {
    this.view = view == null ? {} : view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function (name) {
    var value;
    if (name in this.cache) {
      value = this.cache[name];
    } else {
      var context = this;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;

          var names = name.split('.'), i = 0;
          while (value != null && i < names.length) {
            value = value[names[i++]];
          }
        } else {
          value = context.view[name];
        }

        if (value != null) break;

        context = context.parent;
      }

      this.cache[name] = value;
    }

    if (isFunction(value)) {
      value = value.call(this.view);
    }

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer() {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function () {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function (template, tags) {
    var cache = this.cache;
    var tokens = cache[template];

    if (tokens == null) {
      tokens = cache[template] = parseTemplate(template, tags);
    }

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function (template, view, partials) {
    var tokens = this.parse(template);
    var context = (view instanceof Context) ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function (tokens, context, partials, originalTemplate) {
    var buffer = '';

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    var self = this;
    function subRender(template) {
      return self.render(template, context, partials);
    }

    var token, value;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case '#':
        value = context.lookup(token[1]);
        if (!value) continue;

        if (isArray(value)) {
          for (var j = 0, jlen = value.length; j < jlen; ++j) {
            buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
          }
        } else if (typeof value === 'object' || typeof value === 'string') {
          buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
        } else if (isFunction(value)) {
          if (typeof originalTemplate !== 'string') {
            throw new Error('Cannot use higher-order sections without the original template');
          }

          // Extract the portion of the original template that the section contains.
          value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

          if (value != null) buffer += value;
        } else {
          buffer += this.renderTokens(token[4], context, partials, originalTemplate);
        }

        break;
      case '^':
        value = context.lookup(token[1]);

        // Use JavaScript's definition of falsy. Include empty arrays.
        // See https://github.com/janl/mustache.js/issues/186
        if (!value || (isArray(value) && value.length === 0)) {
          buffer += this.renderTokens(token[4], context, partials, originalTemplate);
        }

        break;
      case '>':
        if (!partials) continue;
        value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
        if (value != null) buffer += this.renderTokens(this.parse(value), context, partials, value);
        break;
      case '&':
        value = context.lookup(token[1]);
        if (value != null) buffer += value;
        break;
      case 'name':
        value = context.lookup(token[1]);
        if (value != null) buffer += mustache.escape(value);
        break;
      case 'text':
        buffer += token[1];
        break;
      }
    }

    return buffer;
  };

  mustache.name = "mustache.js";
  mustache.version = "0.8.1";
  mustache.tags = [ "{{", "}}" ];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function (template, view, partials) {
    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.
  mustache.to_html = function (template, view, partials, send) {
    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

}));
;
/*
 * Purl (A JavaScript URL parser) v2.3.1
 * Developed and maintanined by Mark Perkins, mark@allmarkedup.com
 * Source repository: https://github.com/allmarkedup/jQuery-URL-Parser
 * Licensed under an MIT-style license. See https://github.com/allmarkedup/jQuery-URL-Parser/blob/master/LICENSE for details.
 */

;(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        window.purl = factory();
    }
})(function() {

    var tag2attr = {
            a       : 'href',
            img     : 'src',
            form    : 'action',
            base    : 'href',
            script  : 'src',
            iframe  : 'src',
            link    : 'href',
            embed   : 'src',
            object  : 'data'
        },

        key = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'fragment'], // keys available to query

        aliases = { 'anchor' : 'fragment' }, // aliases for backwards compatability

        parser = {
            strict : /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,  //less intuitive, more accurate to the specs
            loose :  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // more intuitive, fails on relative paths and deviates from specs
        },

        isint = /^[0-9]+$/;

    function parseUri( url, strictMode ) {
        var str = decodeURI( url ),
        res   = parser[ strictMode || false ? 'strict' : 'loose' ].exec( str ),
        uri = { attr : {}, param : {}, seg : {} },
        i   = 14;

        while ( i-- ) {
            uri.attr[ key[i] ] = res[i] || '';
        }

        // build query and fragment parameters
        uri.param['query'] = parseString(uri.attr['query']);
        uri.param['fragment'] = parseString(uri.attr['fragment']);

        // split path and fragement into segments
        uri.seg['path'] = uri.attr.path.replace(/^\/+|\/+$/g,'').split('/');
        uri.seg['fragment'] = uri.attr.fragment.replace(/^\/+|\/+$/g,'').split('/');

        // compile a 'base' domain attribute
        uri.attr['base'] = uri.attr.host ? (uri.attr.protocol ?  uri.attr.protocol+'://'+uri.attr.host : uri.attr.host) + (uri.attr.port ? ':'+uri.attr.port : '') : '';

        return uri;
    }

    function getAttrName( elm ) {
        var tn = elm.tagName;
        if ( typeof tn !== 'undefined' ) return tag2attr[tn.toLowerCase()];
        return tn;
    }

    function promote(parent, key) {
        if (parent[key].length === 0) return parent[key] = {};
        var t = {};
        for (var i in parent[key]) t[i] = parent[key][i];
        parent[key] = t;
        return t;
    }

    function parse(parts, parent, key, val) {
        var part = parts.shift();
        if (!part) {
            if (isArray(parent[key])) {
                parent[key].push(val);
            } else if ('object' == typeof parent[key]) {
                parent[key] = val;
            } else if ('undefined' == typeof parent[key]) {
                parent[key] = val;
            } else {
                parent[key] = [parent[key], val];
            }
        } else {
            var obj = parent[key] = parent[key] || [];
            if (']' == part) {
                if (isArray(obj)) {
                    if ('' !== val) obj.push(val);
                } else if ('object' == typeof obj) {
                    obj[keys(obj).length] = val;
                } else {
                    obj = parent[key] = [parent[key], val];
                }
            } else if (~part.indexOf(']')) {
                part = part.substr(0, part.length - 1);
                if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
                parse(parts, obj, part, val);
                // key
            } else {
                if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
                parse(parts, obj, part, val);
            }
        }
    }

    function merge(parent, key, val) {
        if (~key.indexOf(']')) {
            var parts = key.split('[');
            parse(parts, parent, 'base', val);
        } else {
            if (!isint.test(key) && isArray(parent.base)) {
                var t = {};
                for (var k in parent.base) t[k] = parent.base[k];
                parent.base = t;
            }
            if (key !== '') {
                set(parent.base, key, val);
            }
        }
        return parent;
    }

    function parseString(str) {
        return reduce(String(str).split(/&|;/), function(ret, pair) {
            try {
                pair = decodeURIComponent(pair.replace(/\+/g, ' '));
            } catch(e) {
                // ignore
            }
            var eql = pair.indexOf('='),
                brace = lastBraceInKey(pair),
                key = pair.substr(0, brace || eql),
                val = pair.substr(brace || eql, pair.length);

            val = val.substr(val.indexOf('=') + 1, val.length);

            if (key === '') {
                key = pair;
                val = '';
            }

            return merge(ret, key, val);
        }, { base: {} }).base;
    }

    function set(obj, key, val) {
        var v = obj[key];
        if (typeof v === 'undefined') {
            obj[key] = val;
        } else if (isArray(v)) {
            v.push(val);
        } else {
            obj[key] = [v, val];
        }
    }

    function lastBraceInKey(str) {
        var len = str.length,
            brace,
            c;
        for (var i = 0; i < len; ++i) {
            c = str[i];
            if (']' == c) brace = false;
            if ('[' == c) brace = true;
            if ('=' == c && !brace) return i;
        }
    }

    function reduce(obj, accumulator){
        var i = 0,
            l = obj.length >> 0,
            curr = arguments[2];
        while (i < l) {
            if (i in obj) curr = accumulator.call(undefined, curr, obj[i], i, obj);
            ++i;
        }
        return curr;
    }

    function isArray(vArg) {
        return Object.prototype.toString.call(vArg) === "[object Array]";
    }

    function keys(obj) {
        var key_array = [];
        for ( var prop in obj ) {
            if ( obj.hasOwnProperty(prop) ) key_array.push(prop);
        }
        return key_array;
    }

    function purl( url, strictMode ) {
        if ( arguments.length === 1 && url === true ) {
            strictMode = true;
            url = undefined;
        }
        strictMode = strictMode || false;
        url = url || window.location.toString();

        return {

            data : parseUri(url, strictMode),

            // get various attributes from the URI
            attr : function( attr ) {
                attr = aliases[attr] || attr;
                return typeof attr !== 'undefined' ? this.data.attr[attr] : this.data.attr;
            },

            // return query string parameters
            param : function( param ) {
                return typeof param !== 'undefined' ? this.data.param.query[param] : this.data.param.query;
            },

            // return fragment parameters
            fparam : function( param ) {
                return typeof param !== 'undefined' ? this.data.param.fragment[param] : this.data.param.fragment;
            },

            // return path segments
            segment : function( seg ) {
                if ( typeof seg === 'undefined' ) {
                    return this.data.seg.path;
                } else {
                    seg = seg < 0 ? this.data.seg.path.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.path[seg];
                }
            },

            // return fragment segments
            fsegment : function( seg ) {
                if ( typeof seg === 'undefined' ) {
                    return this.data.seg.fragment;
                } else {
                    seg = seg < 0 ? this.data.seg.fragment.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.fragment[seg];
                }
            }

        };

    }

    purl.jQuery = function($){
        if ($ != null) {
            $.fn.purl_url = function( strictMode ) {
                var url_val = '';
                if ( this.length ) {
                    url_val = $(this).attr( getAttrName(this[0]) ) || '';
                }
                return purl( url_val, strictMode );
            };

            $.purl_url = purl;
        }
    };

    purl.jQuery(window.jQuery);

    return purl;

});
;
var site = site || {};

site.addToCart = function(args) {
  var skuBaseId;
  if (args.skuData && args.skuData.SKU_BASE_ID) {
    skuBaseId = args.skuData.SKU_BASE_ID;
  } else if (args.skuBaseId) {
    skuBaseId = args.skuBaseId;
  } else {
    return null;
  }

  var quantity;
  if (args.quantity) {
    quantity = args.quantity;
  } else {
    quantity = 1;
  }

  var catBaseId = '';
  if (args.skuData && args.skuData.PARENT_CAT_ID) {
    var matchResult = args.skuData.PARENT_CAT_ID.match("[0-9]+");
    if (matchResult) {
      cat_base_id = matchResult[0];
    }
  }

  args.skus = args.skus || [skuBaseId];
  args.itemType = args.itemType || 'cart';
  args.INCREMENT = 1;
  args.CAT_BASE_ID = args.CAT_BASE_ID || catBaseId;
  args.QTY = args.QTY || quantity;

  generic.checkout.cart.updateCart({
    params: args,
    onSuccess: function(r) {
      var resultObj = r.getCartResults();
      // // Report product view based on either loctmpl attribute (if it exists) or last QV location.
      // // Call with URL_CLICK 0 to unset location override. We only neeed it for for add to cart.
      // // This seems kind of horrible to me.
      // if ( typeof Analytics =='object' ){
      //     var locType = $(thisButton).attr("loctmpl");
      //     var params = {};
      //     if (locType) {
      //         location_params = locType.split(",");
      //         params['TYPE_LOCATION'] = location_params[0];
      //         params['PRODUCT_KEY'] = location_params[1];
      //         params['URL_CLICK'] = 0;
      //         Analytics.reportProductView(params);
      //     }
      // }
      $(document).trigger("addToCart.success", [resultObj]);
    },
    onFailure: function(ss) {
      var errorObjectsArray = ss.getMessages();
        $(document).trigger("addToCart.failure", [errorObjectsArray]);
        // // Escape any html in the alert box.
        prodAddedMsg = $('<div/>').html(errorObjectsArray[0].text).text();
        // TODO replace alert message with something nicer
        //alert(prodAddedMsg);
        var resultObj = ss.getCartResults();
        $(document).trigger("addToCart.success", [resultObj]);
      }
  });

};

site.productData = {
  isActive: function(skuData) {
    return skuData.INVENTORY_STATUS && skuData.INVENTORY_STATUS == 1;
  },
  isTempOutOfStock: function(skuData) {
    return skuData.INVENTORY_STATUS && skuData.INVENTORY_STATUS == 2;
  },
  isComingSoon: function(skuData) {
    return skuData.INVENTORY_STATUS && skuData.INVENTORY_STATUS == 3;
  },
  isInactive: function(skuData) {
    return skuData.INVENTORY_STATUS && skuData.INVENTORY_STATUS == 5;
  },
  isSoldOut: function(skuData) {
    return skuData.INVENTORY_STATUS && skuData.INVENTORY_STATUS == 7;
  },
  isShoppable: function(skuData) {
    return site.productData.isActive(skuData) ||  site.productData.isTempOutOfStock(skuData);
  }
};

site.addToFavorites = function(args) {

  var params = {
    "_SUBMIT": "alter_collection",
    "action": "add"
  };

  var skuBaseId;
  if (args.skuData && args.skuData.SKU_BASE_ID) {
    skuBaseId = args.skuData.SKU_BASE_ID;
  } else if (args.skuBaseId) {
    skuBaseId = args.skuBaseId;
  } else {
    return null;
  }
  params.SKU_BASE_ID = skuBaseId;

  var catBaseId = '';
  if (args.skuData && args.skuData.PARENT_CAT_ID) {
    var matchResult = args.skuData.PARENT_CAT_ID.match("[0-9]+");
    if (matchResult) {
      params.CAT_BASE_ID = matchResult[0];
    }
  }

  var id = generic.jsonrpc.fetch({
    method : 'rpc.form',
    params: [params],
    onSuccess:function(jsonRpcResponse) {
      var d = jsonRpcResponse.getData();
      var r = d.ac_results[0].result;
      
      if (r.KEY == 'SKU_ALREADY_IN_COLLECTION.ADD_SKU.COLLECTION.SAVE') {
        $(document).trigger("addToWishlist.exists", [r]);
      } else if (r.SUCCESS == 1 || r.KEY == 'SUCCESS.ADD_SKU.COLLECTION.SAVE') {
        var cr = jsonRpcResponse.getCartResults();
        $(document).trigger("addToWishlist.success", [cr]);
      }
    },
    onFailure: function(jsonRpcResponse) {
      console.log("add to favorites failure");
      console.log(jsonRpcResponse.getError());
    }
  });
};

/*
 * DEPRECATED - Use createAddButton instead
 */
site.addButton = function(args) {
  var p = args.productData;
  var $addButton = $(".js-add-to-cart[data-product-id=" + p.PRODUCT_ID + "]");
  $addButton.bind("click", function(clickEvt) {
    var skuBaseId = $(this).attr("data-sku-base-id");
    var quantity = $(this).attr("data-qty");
    site.addToCart({skuBaseId: skuBaseId, quantity : quantity}  );
  });
  var selectSku = function(skuBaseId) {
    $addButton.attr("data-sku-base-id", skuBaseId);
    updateInvStatus();
  }
  var updateInvStatus = function() {
    var currentSkuId = "SKU" + $addButton.attr("data-sku-base-id");
    var skuDataL2 = $(document).data(currentSkuId);
    if (skuDataL2 && !skuDataL2.isShoppable) {
      $addButton.hide();
    } else {
      $addButton.show();
    }
  }

  selectSku(p.skus[0]["SKU_BASE_ID"]);
  
  $(document).on('sku:select', function(e, skuData) {
    if (skuData.PRODUCT_ID == p.PRODUCT_ID) {
      selectSku(skuData.SKU_BASE_ID);
    }
  });
  $(document).bind('inventory_status_stored', function(e, skuData) {
    updateInvStatus();
  });
  var selectQuantity = function(quantity) {
    $addButton.attr("data-qty", quantity);
  }
  $(document).bind('qty:select', function(e, quantity) {
    selectQuantity(quantity);
  });
};

site.addFavoritesButton = function($favButton) {
  var that = {};
  that.$favButton = $favButton;

  $favButton.bind("click", function(clickEvt) {
    clickEvt.preventDefault();
    var skuBaseId = $(this).attr("data-sku-base-id");
    site.addToFavorites({skuBaseId: skuBaseId});
  });
  var selectSku = function(skuBaseId) {
    $favButton.attr("data-sku-base-id", skuBaseId);
  };
  $favButton.bind('sku:select', function(e, skuData) {
    selectSku(skuData.SKU_BASE_ID);
    e.stopPropagation();
  });
};

site.qtySelectMenu = function($selectNode) {
  var that = {
    $selectNode: $selectNode
  };
  that.$selectNode.on("change", function(event) {
    var productId = that.$selectNode.attr("data-product-id");
    var quantity = that.$selectNode.val();
    site.qtySelect(productId, quantity);
  });
  return that;
};

// 
// site.sizeSelectMenu = function($selectNode) {
//   var that = {
//     $selectNode: $selectNode,
//   };
//   that.$selectNode.on("change", function(event) {
//     var selectedSku = $that.selectNode.find('option:selected').attr('data-sku-base-id');
//       var skuData = _.find(that.productData.skus, function(sku){ return sku.SKU_BASE_ID== selectedSku; });
//       site.skuSelect(skuData);
//     });
//     var productId = that.$selectNode.attr("data-product-id");
//     var quantity = that.$selectNode.val();
//     site.qtySelect(productId, quantity);
//   });
//   return that;
// };


site.createAddButton = function($addButton) {
  var that = {};
  that.$addButton = $addButton;
  that.productId = that.$addButton.attr("data-product-id");
  that.$quantity = $('.js-quantity').filter("[data-product-id=" + that.productId +  "]");

  //For new MPP template
  if($('.extended-mpp').length > 0) {
    that.$quantity = $('.js-quantity', that.$addButton.parents("li")).filter("[data-product-id=" + that.productId +  "]");
  }

  // click handler
  that.$addButton.on('click', function(e) {
    e.preventDefault();
    var skuBaseId = $(this).attr("data-sku-base-id");
    if (!skuBaseId || skuBaseId.length<1) return null;
    var args = {skuBaseId: skuBaseId}
    var quantity = $(this).attr("data-qty");
    if (!!quantity) {
      args.quantity = quantity;
    }
    site.addToCart(args);
  });

  // SKU change handler
  var selectSku = function(skuBaseId) {
    that.$addButton.attr("data-sku-base-id", skuBaseId);
    that.updateInvStatus();
  };

  that.$addButton.on('sku:select', function(e, skuData) {
    if (skuData.PRODUCT_ID == that.productId) {
      selectSku(skuData.SKU_BASE_ID);
      that.updateInvStatus();
    }
    e.stopPropagation();
  });

  // Inventory Status change handler
  that.updateInvStatus = function() {
    var currentSkuId = "SKU" + that.$addButton.attr("data-sku-base-id");
    var skuDataL2 = $(document).data(currentSkuId);
    if (skuDataL2 && !skuDataL2.isShoppable) {
      that.$addButton.hide();
      that.$quantity.hide();
    } else {
      that.$addButton.show();
      that.$quantity.show();
    }

    //Show Estimated delivery date in SPP
    if (skuDataL2 && site.EDD && site.EDD.showEstimatedDeliveryDate) {
      site.EDD.showEstimatedDeliveryDate({
        isShoppable: skuDataL2.isShoppable && !(skuDataL2.INVENTORY_STATUS && skuDataL2.INVENTORY_STATUS == 2)
      });
    }
    if (skuDataL2 && site.EDD && site.EDD.whenWillMyOrderArrive) {
      site.EDD.whenWillMyOrderArrive({
        isShoppable: skuDataL2.isShoppable && !(skuDataL2.INVENTORY_STATUS && skuDataL2.INVENTORY_STATUS == 2)
      });
    }
  };

  that.$addButton.on('inventory_status_stored', function(e, skuData) {
    that.updateInvStatus();
    e.stopPropagation();
  });

  // Quantity change handler
  var selectQuantity = function(quantity) {
    that.$addButton.attr("data-qty", quantity);
  };
  that.$addButton.on('qty:select', function(e, quantity) {
    selectQuantity(quantity);
    e.stopPropagation();
  });
  return that;
};


site.skuSelect = function(skuData) {
  var prodId = skuData.PRODUCT_ID;
  var prodSlctr = "[data-product-id='" + prodId + "']";
  $(prodSlctr).trigger('sku:select', skuData);
};


site.qtySelect = function(prodId, qty) {
  var prodSlctr = "[data-product-id='" + prodId + "']";
  $(prodSlctr).trigger('qty:select', qty);
};


(function($) {
  Drupal.behaviors.ELB_addToCartButton = {
    attach: function(context, settings) {
      $('.js-add-to-cart').each( function() {
        var btn = site.createAddButton($(this));
      });
    }
  };
  Drupal.behaviors.ELB_addToFavorites = {
    attach: function(context, settings) {
      $('.js-add-to-favorites-btn').each( function() {
		site.addFavoritesButton($(this));
      });
    }
  };
  
})(jQuery);
;
var site = site || {};

site.ShadePicker = function (productData) {
    //console.log('init productData: ' + productData.PRODUCT_ID);
    this.init(productData);
};

site.ShadePicker.prototype = {
  productData : null,
  skus: [],
  swatches : '',
  shadeSelects : '',
  wireSwatches : function(){
    var self = this;
    self.swatches.bind( "click", function(e) {
      e.preventDefault();
      var selectedSkuBaseId = $(this).attr("data-sku-base-id");
      self.updateSwatches(selectedSkuBaseId);
      site.skuSelect(self.skus[selectedSkuBaseId]);
    });
    self.swatches.on( "sku:select", function(e, skuData) {
      var selectedSkuBaseId = skuData.SKU_BASE_ID;
      self.updateSwatches(selectedSkuBaseId);
      e.stopPropagation();
    });
    //init first swatch
    self.swatches.eq(0).addClass("selected");
  },
  wireShadeSelects : function() {
    var self = this;
    self.customSelects(true);
    self.shadeSelects.bind('change', function(e) {
      var selectedSkuBaseId = $(this).val();
      self.updateSelects(selectedSkuBaseId);
      site.skuSelect(self.skus[selectedSkuBaseId]);
    });
    self.shadeSelects.on( "sku:select", function(e, skuData) {
      var selectedSkuBaseId = skuData.SKU_BASE_ID;
      self.updateSelects(selectedSkuBaseId);
      e.stopPropagation();
    });
  },
  customSelects : function(init) {
    var self = this;
    self.shadeSelects.each(function(index, val) {
      if(init){
        $(this).selectBox({ mobile: true });
      }else{
        $(this).selectBox('refresh');
        //self.shadeSelects.selectBox('destroy');
        //self.shadeSelects.selectBox({ mobile: true });
      }
      var $shadeSelect = $(this).selectBox('control');
      var $shadeSelectOption = $($shadeSelect).data('selectBox-options');  // extra $() for iPad

      if(!_.isUndefined($shadeSelectOption) && !_.isNull($shadeSelectOption)){
        var $shadeMenuOptions = $shadeSelectOption.find('li a');
        // add shade divs to custom select
        $shadeMenuOptions.each(function() {
          var shadeSku = $(this).attr('rel');
          //var shadeProductData = _.find(self.skus, function(p){ return p.SKU_BASE_ID == shadeSku; });
          var shadeProductData = _.find(self.productData.skus, function(sku){ return sku.SKU_BASE_ID == shadeSku; });
          var shadeHex = shadeProductData.HEX_VALUE_STRING;

          // explode
          var shadeHex = shadeHex.split(',');

          //sort swathes
          var swatchType, hexValue1, hexValue2, hexValue3, hexValue4, hexValue5;
          if(shadeHex.length == 1) {
            swatchType = 'swatches--single';
            hexValue1 = shadeHex[0];
          }else if(shadeHex.length == 2){
            swatchType = 'swatches--duo';
            hexValue1 = shadeHex[0];
            hexValue2 = shadeHex[1];
          }else if(shadeHex.length == 3){
            swatchType = 'swatches--trio';
            hexValue1 = shadeHex[0];
            hexValue2 = shadeHex[1];
            hexValue3 = shadeHex[2];
          }else if(shadeHex.length == 4){
            swatchType = 'swatches--quad';
            hexValue1 = shadeHex[0];
            hexValue2 = shadeHex[1];
            hexValue3 = shadeHex[2];
            hexValue4 = shadeHex[3];
          }else if(shadeHex.length == 5){
            swatchType = 'swatches--quint';
            hexValue1 = shadeHex[0];
            hexValue2 = shadeHex[1];
            hexValue3 = shadeHex[2];
            hexValue4 = shadeHex[3];
            hexValue5 = shadeHex[4];
          }

          var $swatchContainer = $('<div/>', {
            'class': 'swatch__container ' + swatchType
          });
          for(var i=0; i<shadeHex.length; i++){
            var $swatchDiv = $('<div/>', {
              'class': 'swatch--'+(i+1),
              'style': 'background-color:'+shadeHex[i]
            });
            $swatchContainer.append($swatchDiv);
          }

          // add to li
          $(this).prepend($swatchContainer).clone(true);
          // add to label
          if($(this).parent().hasClass('selectBox-selected')){
            var $shadeSelectLabel = $shadeSelect.parent().find('.selectBox-dropdown');
            if($('.swatch__container',$shadeSelectLabel).length){
              var $clone = $swatchContainer.clone(true);
              $('.swatch__container',$shadeSelectLabel).replaceWith($clone);
            }else{
              var $clone = $swatchContainer.clone(true);
              $shadeSelectLabel.prepend($clone);
            }
          }
           
           //ie8 pie attach behavior
           if ( generic.env.isIE8 ) {
             if (window.PIE) {
               $('.swatches--single div').each(function(i, el) {
                 PIE.attach(this);
               });
             }
           }
        });
      }
    });
  },
  updateSwatches : function(skuId){
    var self = this;
    self.swatches.removeClass("selected");
    self.swatches.filter("[data-sku-base-id=" + skuId +  "]").addClass("selected");
  },
  updateSelects : function(skuId){
    var self = this;
    self.shadeSelects.val(skuId);
    self.customSelects(false);
  },
  init: function (productData) {
    var self = this;
    self.productData = productData;
    var pid = self.productData.PRODUCT_ID;
    for (var i=0; i<self.productData.skus.length; i++) {
      var s = self.productData.skus[i];
      self.skus[s.SKU_BASE_ID] = s;
      //self.skus.push(s);
    }

    //check for swatches
    self.swatches = $("a.swatch[data-product-id=" + pid + "]");
    if(self.swatches.length > 0){
      self.wireSwatches(self.swatches);
    }
    //check for selects
    self.shadeSelects = $("select.js-sku-menu[data-product-id=" + pid + "]");
    if(self.shadeSelects.length > 0){
      self.wireShadeSelects(self.shadeSelects);
    }
  }
};


site.SmooshSlider = function(args) {
  var that = {
    $list : $(args.containerNode)
  };
  var productData = args.productData;
  //smoosh list
  setTimeout(function(){
    that.$list.slick({
      lazyLoad: 'progressive',
      centerPadding: '50%',
      dots: false,
      arrows: true,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      onAfterChange: function(slider){
        var $currentSlide = $(slider.$slides).eq(slider.currentSlide);
        var skuBaseId = $currentSlide.attr('data-sku-base-id');
        var skuData = _.find(productData.skus, function(p){ return p.SKU_BASE_ID == skuBaseId; });
        site.skuSelect(skuData);
      }
    });
  },200); //give the first image some time to load

  //hook into shade picker
  that.$list.on('sku:select', function(e, skuData) {
    var skuId = skuData.SKU_BASE_ID;
    var $smooshes= $('.smoosh-list-item', that.$list);
    var smooshIndex = $smooshes.filter("[data-sku-base-id=" + skuId + "]").index();
    var currentSlide = that.$list.slickCurrentSlide();
    if(smooshIndex != currentSlide) {
      that.$list.slickGoTo(smooshIndex);
    }
    e.stopPropagation();
  });

  return that;

};

;
(function($) {
  // global settings object
  Drupal.ELB = {
    ui: {
      alt_class: "is-alternate", // global/_variables.scss:$alt,
      landing_class: "is-landing", // front/landing class based on home/mobile-home-formatter
      sticky_class: "is-sticky", // header sticky
      active_class: "js-active", // active states (menus), _variables.scss
      search_class: "is-search", // global/_variables.scss:$search,
      dark_nav_class: "is-dark-nav", // global/_variables.scss:$$dark-nav,
      back_top_duration: 800, // default scroll to top value, components/_scroll_to_top.scss
      back_top_distance: -50, // how far from top of page before showing "top" widget
      mq_state: {
        small_only: 'only screen and (max-width: 640px)',
        medium_only: 'only screen and (min-width:641px) and (max-width: 768px)'
      },
      nav_open: false,
      search_open: false,
      // we often need to get the header height for other calculations
      header_height: function() {
        // set a variable value here instead of constant lookup
        return $('#toolbar').height() + $('.page-header').outerHeight();
      },
      // we often need to get the sticky footer height for other calculations
      sticky_footer_height: function() {
        return $('.page-sticky-footer').height();
      },
      // Resize an element to the usable height of the window,
      // see home_formatter.js for implementation
      fullHeightElement: function($element, includeHeader) {
        // scope stickyFooterHeight
        var stickyFooterHeight = this.sticky_footer_height(),
          headerHeight = this.header_height();
        // return a throttle-able function (with args!) ready to be used in a .resize
        return _.throttle(function() {
          // start with window height, subtract admin toolbar height
          var windowHeight = $(window).height(),
            realWindowHeight = windowHeight - stickyFooterHeight,
            // minHeight = 700;
            minHeight = 650;
          if (includeHeader) {
            realWindowHeight = realWindowHeight - headerHeight;
          }
          // Set element to safe height unless it's below minHeight
          $element.height((realWindowHeight >= minHeight ? realWindowHeight : minHeight));
        }, 250);
      } // fullHeightElement()
    }, // ui
    getJSONCookie : function(cookieName) {
      return jQuery.parseJSON($.cookie(cookieName)) || {};
    },
    // Initiate all selectboxes
    applySelectBoxes: function() {
      $('select.selectbox, select.selectBox').selectBox().removeClass('selectbox');
    },
    // selectbox.js doesn't account for iOS when refreshing even though it does
    // when initing. Use this wrapper function instead of using .selectBox('refresh')
    // directly
    refreshSelectBoxes : function($selectBoxes) {
      $selectBoxes.each(function(){
        var control = $(this).data('selectBox-control');
        if (control && control.length) {
          $(this).selectBox('refresh');
        }
      });
    },
    waypointBottomOffset : function(element) {
      var $element = $(element);
      var contextHeight = $(window).height();
      if( $element.outerHeight() >  contextHeight){
        contextHeight = $element.outerHeight() - 200; //200 for minibag offset
      }
      return contextHeight - $element.outerHeight() - 200;
    },
    //
    // Helper function to return TRUE or FALSE based on whether the personalization engine is enabled.
    // We know this to be true or not based on personal_block being loaded in Drupal.settings.
    //
    hasPersonalization: function() {
      var settings        = Drupal || {};
          settings        = settings.settings || {};
          personalization = settings.personal_block;
      return personalization ? 1 : 0;
    },
    loadPersistenUserCookie: function() {
      var cookieName = 'persistent_user_cookie';
      var cookieVal = Drupal.ELB.getJSONCookie(cookieName);
      // These are the keys we want to copy out of FE_USER_CART:
      var cookieKeys = ['first_name', 'pc_email_optin', 'email', 'is_loyalty_member', 'points', 'loyalty_level', 'loyalty_level_name', 'points_to_next_level', 'next_level', 'next_level_name'];
      // Share accross desktop and mobile sites:
      var domain = '.' + window.location.hostname.replace(
        /^.*(esteelauder\.)/,
        function(m, $1) { return $1; }
      );

      // The jquery.cookie.js included in Drupal is from before this feature
      // existed :(
      // $.cookie.json = true;

      // User only gets one first time:
      if ($.isEmptyObject(cookieVal)) {
        cookieVal.first_time = 1;
      } else {
        cookieVal.first_time = 0;
      }

      // Prevent errors if user_info_cookie.js isn't found:
      if (typeof site != 'undefined' && typeof site.userInfoCookie != 'undefined') {
        // FE_USER_CART is not persistent, it gets emptied when the user signs
        // out. If the values in it update, we want to update our persistent
        // cookie as well, but if they're null we want what's in our cookie to
        // persist.
        var key, val;
        for (var i = 0; i < cookieKeys.length; i++) {
          key = cookieKeys[i];
          val = site.userInfoCookie.getValue(key);
          cookieVal[key] = val;
        }
      }

      $.cookie(cookieName, JSON.stringify(cookieVal), { expires: 365 * 5, path: '/', domain: domain });

      if(cookieVal.is_loyalty_member - 0) {
        // set global loyalty class for when user is enlisted in loyalty
        // used to controll footer state
        $('body').addClass('elc-user-state-loyalty');
      }else{
        // make sure class is not there for non-loyal
        $('body').removeClass('elc-user-state-loyalty');
      }

    }
  }; // Drupal.ELB

  // init page_data
  var page_data = page_data || {};

  Drupal.behaviors.ELB = {
    attach: function(context, settings) {
      //init
      Drupal.ELB.ui.mq = {
        small_only: Modernizr.mq(Drupal.ELB.ui.mq_state.small_only),
        medium_only: Modernizr.mq(Drupal.ELB.ui.mq_state.medium_only)
      };
      //resize
      $(window).resize(function(){
        Drupal.ELB.ui.mq = {
          small_only: Modernizr.mq(Drupal.ELB.ui.mq_state.small_only),
          medium_only: Modernizr.mq(Drupal.ELB.ui.mq_state.medium_only)
        };
      });
    } // attach
  };

  /**
   * Nav fixed position scroll behavior
   */
  Drupal.behaviors.ELB_headersticky = {
    attach: function(context, settings) {
      var $header = $('.page-header'),
        headerHeight = $header.height();
      // Only apply sticky header above mobile mq, because we sometimes demo
      // mobile behavior on a PC browser. THIS JS ONLY FIRES ON PC
      // if (!Drupal.ELB.ui.mq.small_only){

        // waypoint module, once we hit the bottom of header, trigger
        $('body').waypoint(function(direction){
            $header.toggleClass(Drupal.ELB.ui.sticky_class);
        }, {
          offset: function(){
            return -headerHeight;
          }
        }); // waypoint

      // } // if mq.small_only
    } // attach
  };

  Drupal.behaviors.ELB_userState = {
    attach: function(context, settings) {
      var signedIn = typeof site != 'undefined';
      signedIn = signedIn && typeof site.userInfoCookie != 'undefined';
      signedIn = signedIn && parseInt(site.userInfoCookie.getValue('signed_in'), 10);
      var signInState = signedIn ? 'logged-in' : 'anonymous';
      $('body').addClass( 'elc-user-state-' + signInState );
    }
  };

  Drupal.behaviors.ELB_persistentUserCookie = {
    attach: function(context, settings) {
      Drupal.ELB.loadPersistenUserCookie();
    }
  };

  Drupal.behaviors.ELBPC_clientToggle = {
    attach: function (context, settings) {
      // wire device toggle links
      if(site && site.client && site.client.controls) {
        site.client.controls();
      }
    }
  };

  /**
   * Modernizr shivs and checks
   */
  Drupal.behaviors.ELB_shivs = {
    attach: function(context, settings) {
      // Modernizr.load({
      //   test: Modernizr.mq('only all'),
      //   nope: 'respond.min.js'
      // });
    }
  };

  /**
   * Mobile-pc navigation behaviors
   */
  Drupal.behaviors.ELBPC_nav = {
    attach: function(context, settings) {
      var $header = $('.page-header'),
      $footer = $('.page-footer'),
      activeclass = Drupal.ELB.ui.active_class;

      // When clicking away from nav header, close the nav header
      $('html').on('click', function() {
        // Trigger generic close event other things can hop onto
        $(document).trigger('navClose');
      });

      // Prevent header clicks from propagating to html tag
      $header.on('click', function(event) {
        event.stopPropagation();
      });
       // Clicking .menu-trigger menu headers (Makeup, Skinecare)
      $header.on('click', '.menu-trigger', function(event) {
        event.preventDefault();
        // go all the way up the chain to the parent menu-reference
        var $major_section = $(this).parents('.menu-reference');

        // Major section toggling hide/showing, take into account mobile toggle
        if ($major_section.hasClass(activeclass) && Drupal.ELB.ui.mq.small_only) {
          $('.'+activeclass, $header).removeClass(activeclass);
        } else {
          $('.'+activeclass, $header).removeClass(activeclass);
          $major_section.addClass(activeclass);
        }

        // Get category class from array of css classes
        var trigger_class_split = $(this).attr('class').split(' ');
        // Ignore the standard drupal classes
        var ignoreThese = ['', 'active-trail', 'level-1', 'menu-trigger', 'leaf', 'last', 'expanded'];
        trigger_class_split = _.difference(trigger_class_split, ignoreThese);
        // Category class is most likely what is left
        var cat_class = trigger_class_split[0];
        // Trigger generic open event other things can hop onto
        $(document).trigger('navOpen', [cat_class]);
      });

      // Mobile nav: Clicking submenus (Makeup > Face), toggle active state
      $header.on('click', '.depth-1 h3', function(event) {
        event.stopPropagation();
        var $sub_menu = $(this).parents('.menu-item-container');
        if (!$sub_menu.hasClass(activeclass)) {
          $('.menu-item-container', $header).removeClass(activeclass);
        }
        $sub_menu.toggleClass(activeclass);
      });
       // Menu toggle
      $header.on('click', '.page-navigation__menu-toggle', function(event) {
        var startingCat = 'makeup';
        // toggle header state
        if (Drupal.ELB.ui.nav_open) {
          $(document).trigger('navClose');
          if (generic.env.isIOS4) {
           $header.css({'top' : $(window).scrollTop()});
          }
        } else {
          // $(document).trigger('navOpen', [startingCat]); // give a default cat
          $(document).trigger('navOpen'); // requested we remove starting cat, 180070
          // Edit, NOPE: 180070. Since we safely have a default cat, set js-active on it.
          // $('.menu-trigger.'+startingCat).parents('.menu-reference').addClass(activeclass);
        }
      });

      // Close nav on esc press
      $(document).keyup(function(e) {
        if (e.which === 27) {
          $(document).trigger('navClose');
          $(document).trigger('searchClose');
        }
      });

      /**
       * React to navOpen event
       */
      $(document).on('navOpen', function(event, category) {
        // add active header state class
        $header.addClass(Drupal.ELB.ui.alt_class);
        // hide footer if it is visible
        //if ($footer.is(':visible')) {
        //  $footer.fadeOut();
        //}
        // finally set global var
        Drupal.ELB.ui.nav_open = true;
        // do one little .resize() to trigger js layout recalcs
        $(window).resize();
         if (generic.env.isIOS4) {
           setTimeout(function(){
             navScroll.refresh();
           }, 500);
         }
      });
       /**
       * React to navClose event
       */
      $(document).on('navClose', function(event, category) {
        // remove active header class
        $header.removeClass(Drupal.ELB.ui.alt_class);
        // remove menu active states
        $('.'+activeclass, $header).removeClass(activeclass);
        // specific footer handling
        $footer.fadeIn();
        // finally set global var
        Drupal.ELB.ui.nav_open = false;
      });

      $('.page-navigation .nav-tout').parents('.menu-item-container').addClass('menu-item-container--has-nav-tout').parents('.menu-container').addClass('menu-container').addClass('menu-container--has-nav-tout');

    } // attach
  }; // ELBPC_nav

  Drupal.behaviors.ELB_cartConfirm = {
    attach: function(context, settings) {
      if (typeof site.cartConfirm != 'undefined') {
        site.cartConfirm.init();
      }
      if (typeof site.offerConfirm != 'undefined') {
        site.offerConfirm.init();
      }
      $('.page-utilities__cart-button').click(function(event) {
        /* Act on the event */
        event.preventDefault();
        window.location.href = '/checkout/viewcart.tmpl';
      });
      var item_count = site.userInfoCookie.getValue('item_count');
      if(item_count > 0){
        $('.page-utilities__cart-count').html(item_count);
      }else{
        $('.page-utilities__cart-count').html('');
      }
    }
  };

  /**
   * Nav fixed position scroll behavior
   */
  Drupal.behaviors.ELB_headersticky = {
    attach: function(context, settings) {
      var $header = $('.page-header'),
        headerHeight = $header.height();

      // Only apply sticky header above mobile mq, because we sometimes demo
      // mobile behavior on a PC browser. THIS JS ONLY FIRES ON PC
      // if (!Drupal.ELB.ui.mq.small_only){

        // waypoint module, once we hit the bottom of header, trigger
        $('body').waypoint(function(direction){
            $header.toggleClass(Drupal.ELB.ui.sticky_class);
        }, {
          offset: function(){
            return -headerHeight;
          }
        }); // waypoint

      // } // if mq.small_only
    } // attach
  };

  Drupal.behaviors.ELB_userState = {
    attach: function(context, settings) {
      var signedIn = typeof site != 'undefined';
      signedIn = signedIn && typeof site.userInfoCookie != 'undefined';
      signedIn = signedIn && parseInt(site.userInfoCookie.getValue('signed_in'), 10);
      var signInState = signedIn ? 'logged-in' : 'anonymous';
      $('body').addClass( 'elc-user-state-' + signInState );
    }
  };

  Drupal.behaviors.ELB_persistentUserCookie = {
    attach: function(context, settings) {
      var cookieName = 'persistent_user_cookie';
      var cookieVal = Drupal.ELB.getJSONCookie(cookieName);
      // These are the keys we want to copy out of FE_USER_CART:
      var cookieKeys = ['first_name', 'pc_email_optin', 'email'];
      // Share accross desktop and mobile sites:
      var domain = '.' + window.location.hostname.replace(
        /^.*(esteelauder\.)/,
        function(m, $1) { return $1; }
      );

      // The jquery.cookie.js included in Drupal is from before this feature
      // existed :(
      // $.cookie.json = true;

      // User only gets one first time:
      if ($.isEmptyObject(cookieVal)) {
        cookieVal.first_time = 1;
      } else {
        cookieVal.first_time = 0;
      }

      // Prevent errors if user_info_cookie.js isn't found:
      if (typeof site != 'undefined' && typeof site.userInfoCookie != 'undefined') {
        // FE_USER_CART is not persistent, it gets emptied when the user signs
        // out. If the values in it update, we want to update our persistent
        // cookie as well, but if they're null we want what's in our cookie to
        // persist.
        var key, val;
        for (var i = 0; i < cookieKeys.length; i++) {
          key = cookieKeys[i];
          val = site.userInfoCookie.getValue(key);
          if (!cookieVal[key] || (typeof val != 'undefined' && val !== null && val != 'null')) {
            cookieVal[key] = val;
          }
        }
      }

      $.cookie(cookieName, JSON.stringify(cookieVal), { expires: 365 * 5, path: '/', domain: domain });
    }
  };

  Drupal.behaviors.ELBPC_clientToggle = {
    attach: function (context, settings) {
      // wire device toggle links
      if(site && site.client && site.client.controls) {
        site.client.controls();
      }
    }
  };

  /**
   * Modernizr shivs and checks
   */
  Drupal.behaviors.ELB_shivs = {
    attach: function(context, settings) {
      // Modernizr.load({
      //   test: Modernizr.mq('only all'),
      //   nope: 'respond.min.js'
      // });
    }
  };

  /**
   * Move submenus into .page-navigation__hotswap when the nav is opened
   */
  Drupal.behaviors.ELBPC_nav_hotswap = {
    attach: function(context, settings) {
      var $hotswap = $('.page-navigation__hotswap');

      // hop on navOpen event
      $(document).on('navOpen', function(event, category) {
        // clear out our "landing area"
        $hotswap.empty();
        // only trigger this "hotswap" container behavior ABOVE mobile
        if (!Drupal.ELB.ui.mq.small_only){
          // clone our subnav in prep for positioning, category is emmitted with event
          var $subnav = $('.'+category).next('.depth-1').clone(),
            // holding var for child elements
            $subnav_children = $('.menu-item-container', $subnav),
            // count of subnav elements
            sliceafter = 8;

          // Break apart ULs longer than 7 (according to comps)
          $subnav_children.each(function(){
            // When subnav longer than 7 li's
            if ($('.depth-2 li', $(this)).length > sliceafter) {
              // Make new ul
              $menucol = $('<ul class="menu menu-column"></ul>');
              // Rip out all lis after 7
              $('.depth-2 li', $(this)).slice(sliceafter).appendTo($menucol);
              // UL's are now side by side
              $('.depth-2', $(this)).append($menucol);
            }
          });

          // put a count on the elements to help sizing columns
          $subnav_children.addClass('menu-item-container--childcount-' + $subnav_children.length);
          // place
          $subnav.appendTo($hotswap);
        }
      }); //.on('navOpen')

    $(document).on('navClose', function(event, category) {
      // clear hotswap
      $hotswap.empty();
    }); //.on('navClose')

    } // attach
  }; // ELBBPC_nav_hotswap

  /**
   * Sticky footer behaviors
   */
  Drupal.behaviors.ELB_stickyFooter = {
    attach: function(context, settings) {
      var $footer = $('.page-footer', context);
      var $stickyFooter = $('.page-sticky-footer', context);
      var $promos = $('.promo-messages', $stickyFooter).children();
      var offset = 0;
      var stickyFooterHeight = $stickyFooter.height();
      var promoIndex = -1;

      if (!$footer.length) {
        return;
      }

      function _setStickyClass() {
        $stickyFooter.toggleClass( 'is-sticky', $(window).scrollTop() < offset );
      }

      function _setOffset() {
        offset = $footer.offset().top - $(window).height() + stickyFooterHeight;
        _setStickyClass();
      }

      function _fadePromos() {
        ++promoIndex;
        $promos.eq(promoIndex % $promos.length).fadeIn(300).delay(5000).fadeOut(500, _fadePromos);
      }

      $(window).scroll(_setOffset).resize(_setOffset);

      _setOffset();
      // Use a timeout to ensure this is run after other scripts set their dimensions
      setTimeout(_setOffset, 60);

      if ($promos.length > 1) {
        _fadePromos();
      }
    }
  };

  Drupal.behaviors.ELB_mp_translate = {
    attach: function(context, settings) {
      window.MP = {
        Version: '1.0.23',
        Domains: {'es':'stage3espanol.esteelauder.com', 'fr':'stagefrancais.esteelauder.ca'},
        SrcLang: 'en',
        UrlLang: 'mp_js_current_lang',
        SrcUrl: decodeURIComponent('mp_js_orgin_url'),
        init: function(){
          if (MP.UrlLang.indexOf('p_js_')==1) {
            MP.SrcUrl=window.top.document.location.href;
            MP.UrlLang=MP.SrcLang;
          }
        },
        getCookie: function(name){
          var start=document.cookie.indexOf(name+'=');
          if(start < 0) return null;
          start=start+name.length+1;
          var end=document.cookie.indexOf(';', start);
          if(end < 0) end=document.cookie.length;
          while (document.cookie.charAt(start)==' '){ start++; }
          return decodeURIComponent(document.cookie.substring(start,end));
        },
        setCookie: function(name,value,path,domain){
          var cookie=name+'='+encodeURIComponent(value);
          if(path)cookie+='; path='+path;
          if(domain)cookie+='; domain='+domain;
          var now=new Date();
          now.setTime(now.getTime()+1000*60*60*24*365);
          cookie+='; expires='+now.toUTCString();
          document.cookie=cookie;
        },
        switchLanguage: function(lang){
          var script;
          if (lang!=MP.SrcLang){
            script=document.createElement('SCRIPT');
            script.src=location.protocol+'//'+MP.Domains[lang]+'/'+MP.SrcLang+lang+'/?1023749632;'+encodeURIComponent(MP.SrcUrl);
            document.body.appendChild(script);
          } else if(lang==MP.SrcLang && MP.UrlLang!=MP.SrcLang){
            script=document.createElement('SCRIPT');
            script.src=location.protocol+'//'+MP.Domains[MP.UrlLang]+'/'+MP.SrcLang+MP.UrlLang+'/?1023749634;'+encodeURIComponent(location.href);
            document.body.appendChild(script);
          }
          return false;
        },
        switchToLang: function(url) {
          window.top.location.href=url;
        }
      };

      function switchLanguage(lang) {
        MP.SrcUrl=decodeURIComponent('mp_js_orgin_url');
        MP.UrlLang='mp_js_current_lang';
        MP.init();
        MP.switchLanguage(MP.UrlLang==lang?'en':lang);
        return false;
      }

      $('.switch-lang-link').on('click', function(event) {
        event.preventDefault();
        return switchLanguage( $(this).attr('data-mp-lang') );
      });
    }
  };

  /**
   * product CTA quickshop
   */
  Drupal.behaviors.ELB_CTA_quickshop = {
    attach: function(context, settings) {

      if(!_.isUndefined(page_data['cta-mpp'])){
        var quickData = page_data['custom-mpp'].products;
        var $btn_quickshop = $('.action-quickview');
        $btn_quickshop.click(function(e) {
          e.preventDefault();
          var quickshopPID = $(this).attr('data-productid');
          var quickshopData = _.find(quickData, function(p){ return p.PRODUCT_ID == quickshopPID; });
          site.quickshop(quickshopData);
        });
      }

    }
  };

  /**
   * Add a class to checkout pages for a different nav bar
   */
  Drupal.behaviors.checkout_theme = {
    attach: function(context, settings) {
      var pathArray = window.location.pathname.split( '/' );
      // on checkout pages AND cart is not found in path
      if (pathArray[1] === 'checkout' && pathArray[2].search('cart') < 0 && pathArray[2].search('samples') < 0 && pathArray[2].search('confirm') < 0) {
        $('body').addClass('is-min-nav');
      }
    } // attach
  };

  /**
   * estee edit moodboard slideshow overlay launcher
   */
  Drupal.behaviors.mb_slideshow = {
    attach: function(context, settings) {
      if (!$('.formatter-mb-slideshow').length) return;
      // share link vars
      var url = document.documentURI;
      var title = document.title;

      var twitter_url = 'http://twitter.com/intent/tweet?url=' + encodeURI(url) + '&amp;text=' + encodeURI(title) + '&amp;via=EsteeLauder';
      $('.mb-slide-share__link.twitter').attr('href', twitter_url);

      var facebook_url = 'http://www.facebook.com/sharer.php?u=' + encodeURI(url) + '&amp;t=' + encodeURI(title);
      $('.mb-slide-share__link.facebook').attr('href', facebook_url);

      // @todo debug this is grabbing the first image/first slide only
      var img = $('.mb-slideshow__slide img').attr("src");
      var pinterest_url = 'http://pinterest.com/pin/create/button/?url=' + encodeURI(url) + '&amp;media=' + encodeURI(window.location.protocol) + '//' + encodeURI(window.location.host) + img + '&amp;description=' + encodeURI(title);
      $('.mb-slide-share__link.pinterest').attr('href', pinterest_url);

      // launch colorbox slideshow and oncomplete add what we need
      $('.mb-slides-launcher').colorbox({
        width: '100%',
        height: '100%',
        fixed: true,
        transition: 'none',
        speed: 0,
        className: 'colorbox__mb-slides',
        href: function() { return this.href + ' #main';},
        onOpen: function() {
          $(document).trigger('elc_colorboxOpen');
        },
        onClosed: function() {
          $(document).trigger('elc_colorboxClosed');
        },
        onComplete:function(){
          $('.formatter-mb-slideshow .flexslider').flexslider({
            animation: "fade",
            slideshow: false,
            controlNav: false
          });
          $('.mb-slide-share__link.twitter').attr('href', twitter_url);
          $('.mb-slide-share__link.facebook').attr('href', facebook_url);

          // Each slide inside the colorbox needs to have that image associated with it's pinterest share. All social links (Pinterest included) just need the URL from the main page.
          $('.colorbox__mb-slides .mb-slideshow__slide').each(function(i) {
            var img = $(this).find('.mb-slideshow__slide__image').attr("src");
            var pinterest_url = 'http://pinterest.com/pin/create/button/?url=' + encodeURI(url) + '&amp;media=' + encodeURI(window.location.protocol) + '//' + encodeURI(window.location.host) + img + '&amp;description=' + encodeURI(title);
            $(this).find('.mb-slide-share__link.pinterest').attr('href', pinterest_url);
          });
        }
        });

      // responsive colorbox
      $( window ).resize(function() {
        if($('#cboxOverlay').is(':visible')){
          $.colorbox.resize({width:'100%',height:'100%'});
        }
      });

      // apply flexslider to the main node for previewing purposes
      if( $('.formatter-mb-slideshow .flexslider').length > 0 ){
        $('.formatter-mb-slideshow .flexslider').flexslider({
          animation: "fade",
          slideshow: false,
          controlNav: false
        });
      }

    } // attach
  };


  /**
   * Print this page
   */
  Drupal.behaviors.ELB_printPage = {
    attach: function(context, settings) {
      var $trigger = $('.print-link');
      $trigger.on('click', function(e) {
        e.preventDefault();
        window.print();
      });
    } // attach
  };

  /**
   * Colorbox Common Events
   */
  Drupal.behaviors.colorbox_events = {
    attach: function(context, settings) {

      $(document).on('elc_colorboxOpen', function(event, category) {
        $('body').addClass('colorbox-on');
      });
      $(document).on('elc_colorboxClosed', function(event, category) {
        $('body').removeClass('colorbox-on');
      });

    } // attach
  };

  Drupal.behaviors.ELB_fileUpload = {
    attach: function(context, settings) {
      var $uploadContainers = $('.upload-file', context);
      $uploadContainers.each(function() {
        var $fileInput = $('input[type=file]', this);
        var $fileInputImposterVal = $('.upload-file__value', this);
        if (!$fileInput.length || !$fileInputImposterVal.length) return;
        $fileInput.on('change', function(event) {
          $fileInputImposterVal.text( $(this).val().replace('C:\\fakepath\\', '') );
        });
      });
    }
  };

})(jQuery);

// Adds User Agent string as data attribute on <html> needed mainly for IE8 ~ http://css-tricks.com/ie-10-specific-styles/
var doc = document.documentElement;
doc.setAttribute('data-useragent', navigator.userAgent);
;
var site = site || {};
site.productView = site.productView || {};


$(document).on('prodcat.status', function(e, data) {
  _.each(data.products, function(product, i, products) {
    _.each(product.skus, function(sku, j, skus) {
      // save the data somewhere
       $(document).data(sku.SKU_ID, sku);
    });
  });
  $(".js-inv-status-list").trigger("inventory_status_stored");
  $(".js-add-to-cart").trigger("inventory_status_stored");
  //code will trigger the select box change event on spp page
  if($('div.spp .selectBox').length)
  {
    $('.selectBox').trigger('change');
  }
});


// site.productView.displayInvStatus = function() {
//   if(_.isUndefined($listNode)) return null; 
//   if ($listNode.length < 1) return null;
//   var skuId = $listNode.attr("data-skuid");
//   if (_.isUndefined(skuId) || skuId.length < 1) return null;
//   var skuData = $(document).data(skuId);
//   if (!skuData || !skuData.INVENTORY_STATUS) return null;
//   $("li", $listNode).hide();
//   $(".js-inv-status-" + skuData.INVENTORY_STATUS, $listNode).show();
// };


site.productView.InvStatusList = function($listNode) {
  var that = {
    $listNode : $listNode
  };
  that.productId = that.$listNode.attr("data-product-id");
  
  that.$listNode.on("inventory_status_stored", function(e) {
    that.updateInvStatus();
    e.stopPropagation();
  });

  that.updateInvStatus = function() {
    var skuId = that.$listNode.attr("data-sku-id");
    var skuData = $(document).data(skuId);
    if (!skuData || !skuData.INVENTORY_STATUS) return null;
    $("li", that.$listNode).hide();
    $(".js-inv-status-" + skuData.INVENTORY_STATUS, that.$listNode).show();
    var $statusToShow = $(".js-inv-status-" + skuData.INVENTORY_STATUS, that.$listNode);
    if ($statusToShow.length > 0) {
      $statusToShow.show();
      that.$listNode.trigger("inventory_status_updated");
    }
  };

  that.updateInvStatus();

  that.$listNode.on('sku:select', function(e, skuData) {
    that.$listNode.attr("data-sku-id", skuData.SKU_ID);
    that.updateInvStatus();
    e.stopPropagation();
  });

  return that;
};

site.productView.collectProductIds = function($context) {
  var prodIds = [];
  $('[data-product-id]', $context).each( function() {
      $this = $(this);
      var prodId = $this.attr('data-product-id');
      var insert = true;
      for (var i=prodIds.length-1; i>-1; i--) {
          if (prodIds[i] == prodId) {
              insert = false;
              break;
          }
      }
      if (insert) {
          prodIds.push(prodId);
      }
      insert = true;
  });
  return prodIds;
};

site.productView.loadL2Data = function(productIds) {
  
  if (!_.isArray(productIds) || productIds.length<1) return null;
  
  generic.jsonrpc.fetch({
    "method":   "prodcat.querykey",
    "params":   [{
        products: productIds,
        query_key: 'catalog-mpp-volatile'
    }],
    "onSuccess" : function (response) {
        var v = response.getValue();
        $(document).trigger('prodcat.status', v);
    }
   });
  
};


(function($) {
  Drupal.behaviors.ELB_invStatusList = {
    attach: function(context, settings) {
      $('.js-inv-status-list').each( function() {
        var invStatusList = site.productView.InvStatusList($(this));
      });
    }
  };
})(jQuery);

;
var site = site || {};
var profileRequests = profileRequests || '';
site.profile = site.profile || {};

/**
  * Function that stores any common functionality between PC and Mobile.
  * Any common helper functionality, variables, etc should be added here using the private this object.
  *
*/
site.profile.common = function() {

  // Method to get the profile events class from /personal_block/js/events.js if available.
  var _getEventClass = function() {
    return (site.profile && site.profile.events) ? site.profile.events() : {};
  };

  // Class to handle setting the individual pageview events.
  this.setPageView = {
    mpp : function(id) {
      if (!id) {
        return null;
      };
      this.set({ 'VIEWED_MPP' : id });
    },
    spp : function(id) {
      if (!id) {
        return null;
      };
      this.set({ 'VIEWED_SPP' : id });
    },
    set : function(event) {
      if (!event) {
        return null;
      };

      var eventClass = _getEventClass();
      if (jQuery.isEmptyObject(eventClass)) {
        return null;
      };

      eventClass.store(event);
    }
  };

  // Method to handle the gathering and storing of the page_data for mpp and spp pages.
  this.data = {
    mpp : function(data) {
      if (!data) {
        return null;
      };
      var that      = this;
      var catInfo   = data['categories'] || '';

      return catInfo ? catInfo[0] : {};
    },
    spp : function(data) {
      if (!data) {
        return null;
      };
      var products  = data.products;

      return products ? products[0] : {};
    }
  };

};;
/*global jQuery */
/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );;
var site = site || {};

(function($) {
  site.cartConfirm = function() {
    var that = {
      content : null,
      init : function() {
        this.content = $('script.inline-template[path="cart_confirm"]').html();
        if (typeof this.content == 'undefined' || !this.content) { return null; }
        $(document).bind('addToCart.success', function(e, cartResult) {
          if (typeof (cartResult.getItem) != 'function') { return null; }

          //update cart count
          var item_count = cartResult.getCount();
          $('.page-utilities__cart-count').html(item_count);

          //don't show cart dropdown if flag is set
          if (typeof (cartResult.updateCountOnly) != 'undefined' ) { return null; }

          //Muliple Hex
          var sku = cartResult.getItem().product.sku
          var shadeHex = cartResult.getItem().product.sku.HEX_VALUE_STRING;
          if (shadeHex != null) {
              // explode
              var shadeHex = shadeHex.split(',');
              if (shadeHex.length == 1) {
                  sku['SWATCH_TYPE'] = 'single';
                  sku['HEX_VALUE_1'] = shadeHex[0];
              } else if (shadeHex.length == 2) {
                  sku['SWATCH_TYPE'] = 'duo';
                  sku['HEX_VALUE_1'] = shadeHex[0];
                  sku['HEX_VALUE_2'] = shadeHex[1];
              } else if (shadeHex.length == 3) {
                  sku['SWATCH_TYPE'] = 'trio';
                  sku['HEX_VALUE_1'] = shadeHex[0];
                  sku['HEX_VALUE_2'] = shadeHex[1];
                  sku['HEX_VALUE_3'] = shadeHex[2];
              } else if (shadeHex.length == 5) {
                  sku['SWATCH_TYPE'] = 'quint';
                  sku['HEX_VALUE_1'] = shadeHex[0];
                  sku['HEX_VALUE_2'] = shadeHex[1];
                  sku['HEX_VALUE_3'] = shadeHex[2];
                  sku['HEX_VALUE_4'] = shadeHex[3];
                  sku['HEX_VALUE_5'] = shadeHex[4];
              }
          }
          that.launch(cartResult.getItem());
        });
      },
      launch : function(cartItem) {
        var html = Mustache.render(this.content, cartItem);
        $('.cart-confirm__content').html(html).parent().fadeIn('200');
        setTimeout(function() {
          $('.cart-confirm__content').parent().fadeOut('200');
        }, 3500);
      }
    };
    return that;
  }();
})(jQuery);

(function($) {
  site.wishlistConfirm = function() {
    var that = {
      content : null,
      init : function() {
        this.content = $('script.inline-template[path="wishlist_confirm"]').html();
        if (typeof this.content == 'undefined' || !this.content) { return null; }
        $(document).bind('addToWishlist.success', function(e, cartResult) {
          // var ci = cartResult.getItem();
          that.launch({wishlist_add_success: true});
        });
        $(document).bind('addToWishlist.exists', function(e, result) {
          that.launch({wishlist_add_exists: true});
        });
      },
      launch : function(args) {
        var html = Mustache.render(this.content, args);
        $.colorbox({
          html: html,
          className: 'colorbox__wishlist-confirm',
          width: "350px",
          height: "180px",
        });
        $(".js-wishlist-confirm-close").one( "click", function(){
          $.colorbox.close();
        });
      }
    };
    return that;
  }();
})(jQuery);

(function($) {
  site.offerConfirm = function() {
    var that = {
      content : null,
      init : function() {
        this.content = $('script.inline-template[path="offer_confirm"]').html();
        if (typeof this.content == 'undefined' || !this.content) { return null; }
        $(document).bind('addOffer.success', function(e, offerResult) {
          that.launch(offerResult);
        });
      },
      launch : function(args) {
        var html = Mustache.render(this.content, args);
        $('.cart-confirm__content').html(html).parent().fadeIn('200');
        setTimeout(function() {
          $('.cart-confirm__content').parent().fadeOut('200');
        }, 3500);
      }
    };
    return that;
  }();
})(jQuery);;
(function($) {

  /**
   * Generic behaviors for every page load that don't need their own behavior
   */
  Drupal.behaviors.ELBPC = {
    attach: function(context, settings) {
      // Use mustache-style templating with underscore:
      _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
      };

      // Detect IE and inject class to body tag
      function detectIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        var trident = ua.indexOf('Trident/');

        if (msie > 0) {
          // IE 10 or older => return version number
          return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        if (trident > 0) {
          // IE 11 (or newer) => return version number
          var rv = ua.indexOf('rv:');
          return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        // other browser
        return false;
      }

      if (detectIE()) {
        var ieVersion = 'ie-' + detectIE();
        $('body').addClass('ie').addClass(ieVersion);
      } else {
        $('body').addClass('not-ie');
      }


    } // attach
  };

  /**
   * Footer behaviors
   */
  Drupal.behaviors.ELBPC_footer = {
    attach: function(context, settings) {
      var $footerMenus = $('.footer-links-sitewide-footer-menu-grouping-elc-nodeblock .menu-reference');
      var $footerMenuHeaders = $('.footer-links-sitewide-footer-menu-grouping-elc-nodeblock .footer-header');
      $footerMenuHeaders.click(function(event) {
        if(Drupal.ELB.ui.mq.medium_only){
          var $footerMenu = $(this).parents('.menu-reference');
          if($footerMenu.hasClass('is_open')){
            $footerMenus.show();
            $footerMenus.last().hide();
            $footerMenu.removeClass('is_open',200,function(){
              // $('html, body').animate({scrollTop:$(document).height()}, 500);
              // return false;
            });
          }else{
            $footerMenus.hide();
            $footerMenu.show();
            $footerMenu.addClass('is_open',200,function(){
              // $('html, body').animate({scrollTop:$(document).height()}, 500);
              // return false;
            });
          }
        }
      });
    }
  };

  /**
   * Back to top widget functionality
   *
   * Styleguide pg.168
   *
   * TODO: use Modernizr to test for opacity, otherwise just hide/show
   */
  Drupal.behaviors.ELBPC_toTop = {
    attach: function(context, settings) {

      var $back_top_el = $('.back-to-top');
      var $spp_mini_bag = $('.spp-product__mini-bag');
      var $productFull = $('.product-full');

      if($spp_mini_bag.length){
        //console.log('$spp_mini_bag: ' + $spp_mini_bag.outerHeight());
        var miniBagHeightOffset = $spp_mini_bag.outerHeight() + 65;
        var topBottom = miniBagHeightOffset + 'px';
        $back_top_el.css('bottom',topBottom);
      }
      // Trigger when we're not at top
      if($productFull.length && $spp_mini_bag.length){
        $productFull.waypoint(function(direction) {
          $back_top_el.toggleClass('back-to-top-show');
        }, { offset: Drupal.ELB.waypointBottomOffset($productFull) });
      }else{
        $('body').waypoint(function(direction) {
          // show back to top, this toggles just fine whether up or down
          $back_top_el.toggleClass('back-to-top-show');
        }, { offset: Drupal.ELB.ui.back_top_distance });
      }

      // scroll to top
      $back_top_el.on('click', function(event){
        $.scrollTo('0px', Drupal.ELB.ui.back_top_duration);
      });

      // hide/show when nav is open/closed
      $(document).on('navOpen', function(event, category) {
        $back_top_el.addClass('hidden');
      });
      $(document).on('navClose', function(event, category) {
        $back_top_el.removeClass('hidden');
      });
    } // attach
  };

  /**
   * Input Functionality
   *
   * Styleguide pg.177 and batch 2 styleguide p.73
   */
  Drupal.behaviors.formTextInputs = {
    attach: function(context, settings) {
      var $formTextInputs = $('.form-text, input.field[type="text"], input.field[type="tel"], input.field[type="password"], textarea', context);

      $formTextInputs.on({
        'focus.formTextInputs': function() {
          $(this).addClass('filled-in').attr('placeholder', '');
        },
        'blur.formTextInputs': function() {
          if ($(this).val() === '') {
            $(this).removeClass('filled-in').attr('placeholder', $(this).data('placeholder'));
          } else {
            $(this).addClass('filled-in');
          }
        }
      });

      $formTextInputs.each(function() {
        $(this).data('placeholder', $(this).attr('placeholder'));
      }).filter(function(){
        return !!this.value.length;
      }).addClass('filled-in').attr('placeholder', '');

    },
    detach: function(context, settings) {
      var $formTextInputs = $('.form-text, input.field[type="text"], input.field[type="password"]', context);
      $formTextInputs.off('.formTextInputs').removeData('placeholder');
    }
  };

  Drupal.behaviors.ELBPC_selectBoxes = {
    attach: function(context, settings) {
      // Initiate all selectboxes
      // $('select.selectbox').selectBox();
      Drupal.ELB.applySelectBoxes();
    }
  };

  /**
   * PC-Tablet specific search block interface behaviors
   */
  Drupal.behaviors.ELBPC_searchBlock = {
    attach: function(context, settings) {

      var $header = $('.page-header'),
        $footer = $('.page-footer'),
        $block = $('.el-search-block');

      // Close search when we click away
      $('html').on('click', function() {
        // if search is open, close it
        if (Drupal.ELB.ui.search_open) {
          $(document).trigger('searchClose');
        }
      });

      // Prevent header clicks from propagating to html tag
      $header.on('click', function(event) {
        event.stopPropagation();
      });

      // Search toggle on button click
      $header.on('click', '.page-utilities__search-button', function(event) {
        event.preventDefault();

        if (Drupal.ELB.ui.search_open) {
          // close if open
          $(document).trigger('searchClose');
        }
        else {
          // open if closed
          $(document).trigger('searchOpen');
        }
      });

      /**
       * React to searchOpen event
       */
      $(document).on('searchOpen', function(event) {
        Drupal.ELB.ui.search_open = true;

        // close all open nav
        $(document).trigger('navClose');
        // add custom search class onto header, with alt state
        $header.addClass(Drupal.ELB.ui.alt_class).addClass(Drupal.ELB.ui.search_class);

        // endeca search may happen here
        //remove input from search, reset typeahead
        $('input#search').val('');
        $('#typeahead-wrapper').hide();
        $('.el-search-block__links').show();

        $footer.fadeOut();
        // $block.fadeIn();
        $('#search').focus();
      });

      /**
       * React to searchClose event
       */
      $(document).on('searchClose', function(event) {
        Drupal.ELB.ui.search_open = false;

        // remove active header class
        $header.removeClass(Drupal.ELB.ui.alt_class).removeClass(Drupal.ELB.ui.search_class);

        // $block.fadeOut();
        $footer.fadeIn();
      });

      // submit using our faux button
      $('.el-search-block__btn-submit').click(function(e) {
        e.preventDefault();
        $('#perlgem-search-form').submit();
      });

    } // attach
  };

  /**
   * confirm wishlist addition
   */
  Drupal.behaviors.ELBPC_wishlistConfirm = {
    attach: function(context, settings) {
      if (typeof site.wishlistConfirm != 'undefined') {
        site.wishlistConfirm.init();
      }
    }
  };

  /**
   * estee edit moodboard slideshow overlay launcher
   */
  Drupal.behaviors.mb_slideshow = {
    attach: function(context, settings) {
      // share link vars
      var url = document.documentURI;
      var title = document.title;

      var twitter_url = 'http://twitter.com/intent/tweet?url=' + encodeURI(url) + '&amp;text=' + encodeURI(title) + '&amp;via=EsteeLauder';
      $('.mb-slide-share__link.twitter').attr('href', twitter_url);

      var facebook_url = 'http://www.facebook.com/sharer.php?u=' + encodeURI(url) + '&amp;t=' + encodeURI(title);
      $('.mb-slide-share__link.facebook').attr('href', facebook_url);

      // @todo debug this is grabbing the first image/first slide only
      var img = $('.mb-slideshow__slide img').attr("src");
      var pinterest_url = 'http://pinterest.com/pin/create/button/?url=' + encodeURI(url) + '&amp;media=' + encodeURI(window.location.protocol) + '//' + encodeURI(window.location.host) + img + '&amp;description=' + encodeURI(title);
      $('.mb-slide-share__link.pinterest').attr('href', pinterest_url);

      // launch colorbox slideshow and oncomplete add what we need
      $('.mb-slides-launcher').colorbox({
        width: '100%',
        height: '100%',
        fixed: true,
        transition: 'none',
        speed: 0,
        className: 'colorbox__mb-slides',
        href: function() { return this.href + ' #main';},
        onOpen: function() {
          $('body').addClass('colorbox-on');
        },
        onClosed: function() {
          $('body').removeClass('colorbox-on');
        },
        onComplete:function(){
          $('.formatter-mb-slideshow .flexslider').flexslider({
            animation: "fade",
            slideshow: false,
            controlNav: false
          });
          $('.mb-slide-share__link.twitter').attr('href', twitter_url);
          $('.mb-slide-share__link.facebook').attr('href', facebook_url);

          // Each slide inside the colorbox needs to have that image associated with it's pinterest share. All social links (Pinterest included) just need the URL from the main page.
          $('.colorbox__mb-slides .mb-slideshow__slide').each(function(i) {
            var img = $(this).find('.mb-slideshow__slide__image').attr("src");
            var pinterest_url = 'http://pinterest.com/pin/create/button/?url=' + encodeURI(url) + '&amp;media=' + encodeURI(window.location.protocol) + '//' + encodeURI(window.location.host) + img + '&amp;description=' + encodeURI(title);
            $(this).find('.mb-slide-share__link.pinterest').attr('href', pinterest_url);
          });
        }
      });

      // responsive colorbox
      $( window ).resize(function() {
        if($('#cboxOverlay').is(':visible')){
          // commenting this out due to this causing buggy behavior
          // $.colorbox.resize({width:'100%',height:'100%'});
        }
      });

      // apply flexslider to the main node for previewing purposes
      if( $('.formatter-mb-slideshow .flexslider').length > 0 ){
        $('.formatter-mb-slideshow .flexslider').flexslider({
          animation: "fade",
          slideshow: false,
          controlNav: false
        });
      }
    } // attach
  };

  /**
   * iframe boutique overlay launcher
   */
  Drupal.behaviors.iframe_boutique = {
    attach: function(context, settings) {
      // iframe version of boutique lunches in colorbox
      // @todo temporary fix for ipad - only target colorbox
      // to no-touch devices
      $('.no-touch .boutique-launcher').click(function () {
		$(this).data('origin', $(window).scrollTop());
		$(window).scrollTop(0);
	}).colorbox({
        iframe:true,
        transition:'fade',
        width: '100%',
        height: '100%',
       	//fixed: false,
       	//top: '0px',
	//left: '0px',
	//right: '0px',
	//reposition: false,
	scrolling : false,
        className: 'colorbox__boutique',
        onOpen: function() {
         // $(document).trigger('elc_colorboxOpen');
        },
        onClosed: function() {
         // $(document).trigger('elc_colorboxClosed');
        }
      });
      // launch the url in a new page for touch devices
      $('.touch .boutique-launcher').attr('target', '_blank');

	// Colorbox: setup iframe auto-resize
	$(document).on('cbox_complete', function () {
		var $catbox_iframe, catbox_width, catbox_innerHeight;

		// url_origin(string): Devine origin portion of a URL (protocol + hostname + port)
		function url_origin(url) {
			if (typeof url !== 'string') return false;
			var a = document.createElement('a'), protocol, host;
			a.href= url;
			protocol = (a.protocol.indexOf('http') !== -1)? a.protocol : window.location.protocol;
			host = (a.host !== '')? a.host : window.location.host;
			return protocol + '//' + host;
		}

		// Select Colorbox iframe
		$catbox_iframe = $('iframe.cboxIframe');

		// Check iframe and origin
		if (!$catbox_iframe.length || url_origin($catbox_iframe[0].src) !== window.location.protocol + '//' + window.location.host) return;

		// Set onload event
		$catbox_iframe.on('load', function () {

			$(window).trigger('resize.catbox');

			// Catch late loads
			setTimeout(function () {
				$(window).trigger('resize.catbox');
			}, 1000);
		});

		// Get Colorbox width
		catbox_width = $.colorbox.element().data()['colorbox']['width'];

		// Update iframe height to match content height continually
		$(window).on('resize.catbox', function () {
			catbox_innerHeight = $catbox_iframe.contents().find('body').height();

			$.colorbox.resize({
				'innerHeight' : catbox_innerHeight,
				'width' : catbox_width
			});
		});

	// Colorbox: remove iframe auto-resize
	}).on('cbox_closed', function () {
		$(window).off('resize.catbox');
		$(window).scrollTop($.colorbox.element().data('origin'));
	});


      // parse URL to load boutique
      // uses Purl.js
      var url_boutique = $.purl_url();
      if (url_boutique.fsegment(1) === 'boutique') {
        // grab the link
        var boutiqueLink = $('#' + url_boutique.fsegment(2) + ' > a');

        // if there is an additional segment on the url, pass it through as hashtags on the boutique link, for deep linking in the iframe
        // like /#/boutique/boutique-id-pcenvy/choose, 'choose' gets passed to the url
        if ( url_boutique.fsegment(3) ){
            boutiqueLink.attr('href', boutiqueLink.attr('href')+'#'+url_boutique.fsegment(3) );
        }

        // click it!
        boutiqueLink.click();
      }

    } // attach
  };

  /**
   * youtube video overlay launcher
   */
  Drupal.behaviors.video_youtube = {
    attach: function(context, settings) {
      $('.video-launcher').colorbox({iframe:true, width: '100%', height: '100%', className: 'colorbox__youtube'});
      $('.video-launcher').each(function(e) {
        var youtube_src = $(this).attr('href');
        youtube_src += "?autoplay=1";
        $(this).attr('href', youtube_src);
      });

      // deeplink to autoplay video
      var isAutoPlay = window.location.hash.substr(1);
      if (isAutoPlay == "video-autoplay") {
        $('.hero-block-wrapper:not(.cancel-autoplay)').each(function() {
          $(this).find('.video-launcher').trigger('click');
        });
      }

    } // attach
  };

  /**
   * Samples equal height
   */
  Drupal.behaviors.checkout_heights = {
    attach: function(context, settings) {
      site.product.view.equalRowHeight($('.samples li.product'));
      site.product.view.equalRowHeight($('.recommended-products-panel .recommended-item'));
    }
  };

  /**
   * Multi Hero positioning debug layer
   */
  Drupal.behaviors.multihero_debug_layer = {
    attach: function(context, settings) {

      function getQueryString() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++) {
          hash = hashes[i].split('=');
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
        }
        return vars;
      }
      // load the appropriate debug image
      // we use once() to prevent ajax from re-triggering this event
      var herotest = getQueryString()['herotest'],
      $heroImage = $('.hero-block__hero');
      if (herotest == 'small') {
        $heroImage.once(this).prepend('<div style="position: absolute;z-index: 2;width: 100%;"><img style="width: 100%;opacity: .5;" src="/media/multi_hero_tools/multihero-debug-sm.png" /></div>');
      }
      if (herotest == 'medium') {
        $heroImage.once(this).prepend('<div style="position: absolute;z-index: 2;width: 100%;"><img style="width: 100%;opacity: .5;" src="/media/multi_hero_tools/multihero-debug-med.png" /></div>');
      }
      if (herotest == 'mediumplus') {
        $heroImage.once(this).prepend('<div style="position: absolute;z-index: 2;width: 100%;"><img style="width: 100%;opacity: .5;" src="/media/multi_hero_tools/multihero-debug-medplus.png" /></div>');
      }
      if (herotest == 'large') {
        $heroImage.once(this).prepend('<div style="position: absolute;z-index: 2;width: 100%;"><img style="width: 100%;opacity: .5;" src="/media/multi_hero_tools/multihero-debug-large.png" /></div>');
      }

    }
  };


})(jQuery);
;
/* Placeholders.js v3.0.2 */
(function(t){"use strict";function e(t,e,r){return t.addEventListener?t.addEventListener(e,r,!1):t.attachEvent?t.attachEvent("on"+e,r):void 0}function r(t,e){var r,n;for(r=0,n=t.length;n>r;r++)if(t[r]===e)return!0;return!1}function n(t,e){var r;t.createTextRange?(r=t.createTextRange(),r.move("character",e),r.select()):t.selectionStart&&(t.focus(),t.setSelectionRange(e,e))}function a(t,e){try{return t.type=e,!0}catch(r){return!1}}t.Placeholders={Utils:{addEventListener:e,inArray:r,moveCaret:n,changeType:a}}})(this),function(t){"use strict";function e(){}function r(){try{return document.activeElement}catch(t){}}function n(t,e){var r,n,a=!!e&&t.value!==e,u=t.value===t.getAttribute(V);return(a||u)&&"true"===t.getAttribute(D)?(t.removeAttribute(D),t.value=t.value.replace(t.getAttribute(V),""),t.className=t.className.replace(R,""),n=t.getAttribute(F),parseInt(n,10)>=0&&(t.setAttribute("maxLength",n),t.removeAttribute(F)),r=t.getAttribute(P),r&&(t.type=r),!0):!1}function a(t){var e,r,n=t.getAttribute(V);return""===t.value&&n?(t.setAttribute(D,"true"),t.value=n,t.className+=" "+I,r=t.getAttribute(F),r||(t.setAttribute(F,t.maxLength),t.removeAttribute("maxLength")),e=t.getAttribute(P),e?t.type="text":"password"===t.type&&M.changeType(t,"text")&&t.setAttribute(P,"password"),!0):!1}function u(t,e){var r,n,a,u,i,l,o;if(t&&t.getAttribute(V))e(t);else for(a=t?t.getElementsByTagName("input"):b,u=t?t.getElementsByTagName("textarea"):f,r=a?a.length:0,n=u?u.length:0,o=0,l=r+n;l>o;o++)i=r>o?a[o]:u[o-r],e(i)}function i(t){u(t,n)}function l(t){u(t,a)}function o(t){return function(){m&&t.value===t.getAttribute(V)&&"true"===t.getAttribute(D)?M.moveCaret(t,0):n(t)}}function c(t){return function(){a(t)}}function s(t){return function(e){return A=t.value,"true"===t.getAttribute(D)&&A===t.getAttribute(V)&&M.inArray(C,e.keyCode)?(e.preventDefault&&e.preventDefault(),!1):void 0}}function d(t){return function(){n(t,A),""===t.value&&(t.blur(),M.moveCaret(t,0))}}function g(t){return function(){t===r()&&t.value===t.getAttribute(V)&&"true"===t.getAttribute(D)&&M.moveCaret(t,0)}}function v(t){return function(){i(t)}}function p(t){t.form&&(T=t.form,"string"==typeof T&&(T=document.getElementById(T)),T.getAttribute(U)||(M.addEventListener(T,"submit",v(T)),T.setAttribute(U,"true"))),M.addEventListener(t,"focus",o(t)),M.addEventListener(t,"blur",c(t)),m&&(M.addEventListener(t,"keydown",s(t)),M.addEventListener(t,"keyup",d(t)),M.addEventListener(t,"click",g(t))),t.setAttribute(j,"true"),t.setAttribute(V,x),(m||t!==r())&&a(t)}var b,f,m,h,A,y,E,x,L,T,N,S,w,B=["text","search","url","tel","email","password","number","textarea"],C=[27,33,34,35,36,37,38,39,40,8,46],k="#ccc",I="placeholdersjs",R=RegExp("(?:^|\\s)"+I+"(?!\\S)"),V="data-placeholder-value",D="data-placeholder-active",P="data-placeholder-type",U="data-placeholder-submit",j="data-placeholder-bound",q="data-placeholder-focus",z="data-placeholder-live",F="data-placeholder-maxlength",G=document.createElement("input"),H=document.getElementsByTagName("head")[0],J=document.documentElement,K=t.Placeholders,M=K.Utils;if(K.nativeSupport=void 0!==G.placeholder,!K.nativeSupport){for(b=document.getElementsByTagName("input"),f=document.getElementsByTagName("textarea"),m="false"===J.getAttribute(q),h="false"!==J.getAttribute(z),y=document.createElement("style"),y.type="text/css",E=document.createTextNode("."+I+" { color:"+k+"; }"),y.styleSheet?y.styleSheet.cssText=E.nodeValue:y.appendChild(E),H.insertBefore(y,H.firstChild),w=0,S=b.length+f.length;S>w;w++)N=b.length>w?b[w]:f[w-b.length],x=N.attributes.placeholder,x&&(x=x.nodeValue,x&&M.inArray(B,N.type)&&p(N));L=setInterval(function(){for(w=0,S=b.length+f.length;S>w;w++)N=b.length>w?b[w]:f[w-b.length],x=N.attributes.placeholder,x?(x=x.nodeValue,x&&M.inArray(B,N.type)&&(N.getAttribute(j)||p(N),(x!==N.getAttribute(V)||"password"===N.type&&!N.getAttribute(P))&&("password"===N.type&&!N.getAttribute(P)&&M.changeType(N,"text")&&N.setAttribute(P,"password"),N.value===N.getAttribute(V)&&(N.value=x),N.setAttribute(V,x)))):N.getAttribute(D)&&(n(N),N.removeAttribute(V));h||clearInterval(L)},100)}M.addEventListener(t,"beforeunload",function(){K.disable()}),K.disable=K.nativeSupport?e:i,K.enable=K.nativeSupport?e:l}(this);;
var site = site || {};
site.spp = site.spp || {};

(function($) {
  Drupal.behaviors.ELB_spp = {
    attach: function(context, settings) {
      site.spp.anchornav();

      if (!page_data || !page_data['catalog-spp'] || !$.isArray(page_data['catalog-spp']['products'])) return null;
      if (page_data['catalog-spp']['products'].length < 1) return null;
      var productData = page_data['catalog-spp']['products'][0];
      site.spp.minibag({productData: productData});
      site.product.view.full({productData: productData});
      site.spp.discoverMore();

      // Personalization SPP initialization
      if ( Drupal.ELB.hasPersonalization() ) {
        if (site.profile.pc && site.profile.pc.SPP) { 
          site.profile.pc.SPP(page_data['catalog-spp']);
        }
      };
    }
  };
})(jQuery);


site.spp.minibag = function(args){
  var $minibag = $(".spp-product__mini-bag");
  if ($minibag.length < 1) return null;

  var that = {
    productId: $minibag.attr("data-product-id"),
    productData : args.productData
  };

  var fixedBox = function(select){
    var $select = $(select);
    if($select.length){
      $select.selectBox({ mobile: true }).bind('open', function(){
        //set fixed position
        var $selectMenu = $(select+'-selectBox-dropdown-menu');
        $selectMenu.addClass('spp-product__mini-bag-show');
        var scrollTop = $(window).scrollTop();
        var menuTop = $selectMenu.css('top').split('px')[0];
        var fixedTop = parseInt(menuTop - scrollTop) + 'px';
        $selectMenu.css({
          'position':'fixed',
          'top': fixedTop,
          //'opacity': 1
        });
      });
    }
  };

  //make mini bag absolute
  fixedBox('.spp-product__mini-bag-quantity');
  if(that.productData.shaded){
    fixedBox('.spp-product__mini-bag-shade-select');
  }
  var $multipleSizeSelect = $('.spp-product__mini-price-size-select');
  if($multipleSizeSelect.length > 1){
    fixedBox('.spp-product__mini-price-size-select');
  }

  //bind to waypoint
  var $spp_mini_bag = $('.spp-product__mini-bag');
  var $productFull = $('.product-full');
  if($productFull.length && $spp_mini_bag.length){
    $productFull.waypoint(function(direction) {
      $('.spp-product__mini-bag').toggleClass('spp-product__mini-bag-show');
      $('.spp-product__mini-bag-quantity-selectBox-dropdown-menu').toggleClass('spp-product__mini-bag-show');
      $('.spp-product__mini-bag-shade-select-selectBox-dropdown-menu').toggleClass('spp-product__mini-bag-show');
      $('.spp-product__mini-price-size-select-selectBox-dropdown-menu').toggleClass('spp-product__mini-bag-show');
    }, {offset: Drupal.ELB.waypointBottomOffset($productFull)});
  }

  $('.spp-product__mini-bag-selecter').click(function(event) {
    event.preventDefault();
    $(this).hide();
    // get bottom offset of
    var backToTopPosition = $('.back-to-top').css('bottom');
    backToTopPosition = backToTopPosition.replace('px','');
    backToTopPosition = (parseInt(backToTopPosition,10) + 49) + 'px';
    $('.back-to-top').css('bottom',backToTopPosition);
    $('.spp-product__mini-bag-button-container').removeClass('hidden');
  });

  $multipleSizeSelect.change(function(event) {
    var selectedSku = $(this).find('option:selected').attr('data-sku-base-id');
    var skuData = _.find(that.productData.skus, function(sku){ return sku.SKU_BASE_ID== selectedSku; });
    site.skuSelect(skuData);
  });

  $('.spp-product__mini-bag-quantity').change(function(event) {
    var quantity = $(this).val();
    site.qtySelect(that.productId, quantity);
    $('select.product-full__quantity').val(quantity);
    $('.product-full__quantity').selectBox('refresh');
  });
  
  $minibag.on("sku:select", function(e, skuData) {
    $('.spp-product__mini-bag-image', $minibag).attr('src',skuData.XXS_IMAGE);
    e.stopPropagation();
  });
  
  return that;
};

site.spp.anchornav = function() {
  var self = this;

  var $sppAnchorNav = $('.spp-product__anchor');
  if ($sppAnchorNav.length < 1) return null;
  var $sppAnchorTab = $('.spp-product__anchor-tab');
  var $sppAnchorNavLinks = $('.spp-product__anchor a.spp-product__anchor--scroll');

  var sppAnchorNavOffset = $('.spp-product__anchor').height() + $('.spp-product__anchor').offset().top;
  $('.spp-product__details').waypoint(function(direction) {
    if(direction == 'down'){
      $sppAnchorNav.addClass('is_expanded', { duration:400, children:true });
      $sppAnchorNav.addClass('is_closed', { duration:400, children:true });
    }else if(direction == 'up'){
      $sppAnchorNav.removeClass('is_closed', { duration:400, children:true });
      $sppAnchorNav.removeClass('is_expanded', { duration:400, children:true });
    }
  }, { offset: sppAnchorNavOffset });

  $sppAnchorNavLinks.click(function(event) {
    event.preventDefault();
    var sppAnchorNavLink = $(this).attr('href');
    sppAnchorNavLink = sppAnchorNavLink.replace('#','.');
    $sppAnchorNavLink = $(sppAnchorNavLink);
    var anchorOffset = $sppAnchorNavLink.offset().top - $('.page-header').outerHeight();
    if(!$sppAnchorNav.hasClass('is_expanded')){
      $sppAnchorNav.addClass('is_expanded', {
        duration:400,
        children:true,
        complete: function(){
          $('html,body').animate({scrollTop: anchorOffset },400);
        }
      });
    }else{
      $('html,body').animate({scrollTop: anchorOffset },400);
    }
  });

  $('.product-full__detail-link').click(function(event) {
    event.preventDefault();
    $sppAnchorNavLinks.eq(0).trigger('click');
  });

  $sppAnchorTab.mouseenter(function() {
    if($sppAnchorNav.hasClass('is_closed')){
      $sppAnchorNav.removeClass('is_closed',400);
    }
  });
  $sppAnchorNav.mouseleave(function() {
    if($(this).hasClass('is_expanded')){
      $(this).addClass('is_closed',400);
    }
  });
  $sppAnchorTab.click(function() {
    if($sppAnchorNav.hasClass('is_closed')){
      $sppAnchorNav.removeClass('is_closed',400);
    } else {
      $sppAnchorNav.addClass('is_closed',400);
    }
  });
};

site.spp.discoverMore = function() {
  var $discoverMoreProducts = $('.discover_more__product');
  if($discoverMoreProducts.length > 1){
    site.product.view.equalRowHeight($discoverMoreProducts);
  }
};;
var site = site || {};
site.product = site.product || {};
site.product.view = site.product.view || {};

site.product.view.equalRowHeight = function(gridElement){
    //pass in the repeating product classname, for example mpp__product
    //even out row height
    //setTimeout(function(){ // timeout to let fonts render - @font-face FOUT
    $( window ).load(function() {
      site.product.view.equalRowHeightFunc(gridElement);
    });
    //},120);
};

site.product.view.equalRowHeightFunc = function(gridElement){
  var $products = $(gridElement);
  var rowCount = site.product.view.findRowCount($products);
  var rows = _.groupBy($products, function(element, index){
    return Math.floor(index/rowCount); //3 in a row
  });
  rows = _.toArray(rows);
  for(var x in rows){
    var row = rows[x];
    // var maxProductOuterHeight = Math.max.apply(null,$(row).map(function(){
    //   return $(this).outerHeight();
    // }).get());
    var maxProductHeight = Math.max.apply(null,$(row).map(function(){
      return $(this).height();
    }).get());
    //console.log('maxProductOuterHeight: ' + maxProductOuterHeight);
    //console.log('maxProductHeight: ' + maxProductHeight);
    //$(row).outerHeight(maxProductHeight);
    $(row).height(maxProductHeight);
  }
};

site.product.view.findRowCount = function(list){
  var $list = list;
  if($list.length < 1) return null;
  var listInRow = 0;
  $($list).each(function() {
    if($(this).prev().length > 0) {
      if($(this).position().top != $(this).prev().position().top) return false;
      listInRow++;
    }
    else {
      listInRow++;
    }
  });
  return listInRow;
};

site.product.view.fixedBox = function(select){
  var self = this;
  var $select = $(select);
  if($select.length){
    $select.selectBox({ mobile: true }).bind('open', function(){
      //set fixed position
      var $selectMenu = $(select+'-selectBox-dropdown-menu');
      var scrollTop = $(window).scrollTop();
      var menuTop = $selectMenu.css('top').split('px')[0];
      var fixedTop = parseInt(menuTop - scrollTop) + 'px';
      $selectMenu.css({
        'position':'fixed',
        'top': fixedTop,
        //'opacity': 1
      });
      window.onscroll = function (event) {
      //console.log('scrolling');
      }
    });
  }
};

site.product.view.qsFixedBox = function(select){
  var self = this;
  var $select = $(select);
  if($select.length){
    $select.selectBox({ mobile: true }).bind('open', function(){
      var $selectMenu = $(select+'-selectBox-dropdown-menu');
      var scrollTop = $(window).scrollTop();
      var menuTop = $selectMenu.css('top').split('px')[0];
      var fixedTop = parseInt(menuTop - scrollTop) + 'px';
      $selectMenu.css({
        'position':'fixed',
        'top': fixedTop,
        //'opacity': 1
      });
    });
    var selectControl = $select.selectBox('instance');
    $('#cboxLoadedContent').scroll(function() {
      selectControl.hideMenus();
    });
  }
};

site.product.view.getRatingPercentage = function(average) {
  // exit if we have no values
  if(_.isUndefined(average) && _.isNull(average)){
    return;
  }
  var scale = 5;
  var calc = average/scale;
  console.log('calc: ' + calc);
  var percentage = Math.round(parseFloat(calc) * 100);
  return percentage;
};

site.product.view.miscFlagAlign = function(gridElement){
  if($('.product_brief__misc-flag-spacer').length){
    $('.product_brief__misc-flag-spacer').removeAttr('style');
  }
  var $products = $(gridElement);
  var rowCount = site.product.view.findRowCount($products);
  var rows = _.groupBy($products, function(element, index){
    return Math.floor(index/rowCount); //3 in a row
  });
  rows = _.toArray(rows);
  $(rows).each(function(index, row) {
    var hasFlag = 0;
    var flagHeight = '19px';
    $(row).each(function(index, product) {
      if($(product).find('.product_brief__misc-flag').length){
        hasFlag++;
        flagHeight = $(product).find('.product_brief__misc-flag').outerHeight(true);
      }
    });
    $(row).each(function(index, product) {
      if(hasFlag && $(product).find('.product_brief__misc-flag').length == 0){
        var $spacer = $('<div class="product_brief__misc-flag-spacer">');
        $spacer.height(flagHeight)
        $(product).find('.product_brief__header').before($spacer);
      }
    });
  });
}


/**
 * automate the carousel
 */
Drupal.behaviors.mpp_slick = {
  attach: function (context, settings) {
    if ($(".js-mpp-wrapper").length < 1) return null;

    $headerTouts = $('.tout-wrapper, .js-hero-block-wrapper:not(.no-carousel)');
    $headerToutCount = $headerTouts.length;

    if($headerToutCount > 1) {
      $headerTouts.wrapAll('<div class="slick-carousel slick-prodpage" />');
      $ToutGroup = $('.slick-carousel');
      $ToutGroup.slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000
      });
    }

    // init jquery.fitext
    // fluid text sizes
    $('.js-tout-headline h1').not('.headline--small').not('.headline--small2').not('.headline--small3').fitText(1, {
      maxFontSize: '150px'
    });
  }
};
;
var site = site || {};
site.product = site.product || {};
site.product.view = site.product.view || {};

site.product.view.full = function (args) {
  var that = {
    productData : args.productData,
    productId : args.productData.PRODUCT_ID,
    productCode : args.productData.skus[0].PRODUCT_CODE
  };
  var productName = that.productData.PROD_RGN_NAME;
  var productSubname = that.productData.PROD_RGN_SUBHEADING;

  if (!args.productData) return null;
  
  $productImages = $('.product-full__images');
  $productImage = $('img',$productImages);
  $productImageCount = $productImage.length;

  var slickToggleTimer1;
  var slickToggleTimer2;

  // get the active image id from the slider
  var getActiveImageID = function() {
    var str = $('.slick-active img').attr('src');
    if (str.split("/")[2] == "tzclientscdn.taaz.com") {
      return str.split("/")[5];
    } else {
      return "non-taaz-image";
    }
  };

  var startSlider = function() {
    if (isTaaz) {
      if($('.product-full__images').hasClass('slick-slider')){
        $('.product-full__images').unslick();
      }
      $('.product-full__images').slick({
        dots: true,
        arrows: false,
        infinite: false,
        //fade: true,
        speed: 0,
        slidesToShow: 1,
        slidesToScroll: 1,
        onAfterChange: function() {
          var activeImageID = getActiveImageID();
          TAAZ.feedbackInterest('model image viewed', activeImageID, 1);
        }
      });
      $('.product-full__images').slickGoTo(currentSlidePosition);
    } else {
      
      function slickToggle(){
        slickToggleTimer1 = setTimeout(function(){
          $('.product-full__images').slickNext();
          slickToggleTimer2 = setTimeout(function(){
            $('.product-full__images').slickPrev();
          },3000);
        },3000);
      }
      if($('.product-full__images').hasClass('slick-slider')){
        $('.product-full__images').unslick();
      }
      $('.product-full__images').slick({
        dots: true,
        arrows: false,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        onInit: function(args){
          var slideLength = args.$slides.length;
          if(slideLength >= 2){
            slickToggle();
          }
        }
      });
    }
    // get SKU Base ID from url and change shade based on that
    var skuBaseIDfromURL = window.location.hash.substr(1);
    if (skuBaseIDfromURL.length > 1) {
      var skuDataFromURL = _.find(that.productData.skus, function(sku){ return sku.SKU_BASE_ID == skuBaseIDfromURL; });
      $productImages.trigger('sku:select', skuDataFromURL);
      sppPicker.updateSwatches(skuBaseIDfromURL);
      sppPicker.updateSelects(skuBaseIDfromURL);
    }
  };

  var updateThumbnails = function(imageURLs, taazModelNames) {
    var slickDots = $('.slick-dots li');
    var tzImageIndex = 0;
    slickDots.each(function(i, li) {
      var thumbURL = imageURLs[i];
      var taazImageCheck = thumbURL.indexOf('taaz');
      var image_name = "";
      if(taazImageCheck > 1) {
        image_name = taazModelNames[tzImageIndex];
        tzImageIndex++;
      } else {
        image_name = "non-taaz-image";
      }
      $(li).find('button').replaceWith('<img class="taaz-thumb" image_name="' + image_name + '" src="' + thumbURL + '" />');
    });
  };

  var adjustTaazImages = function() {
    var $taazContainerImages = $('.taaz_container .slick-list');
    var $slideImage = $('img', $taazContainerImages);
    $slideImage.each(function(index, val) {
      var taazImageCheck = $(this).attr('src').indexOf('taaz');
      var smooshCheck = $(this).attr('src').indexOf('smoosh');
      if(taazImageCheck > 1) {
        $(this).parent().addClass('taaz-image');
      }
      if(smooshCheck > 1) {
        $(this).parent().addClass('smoosh-image');
      }
    });
  }
  
  $productImage.each(function(index, val) {
    var smooshCheck = $(this).attr('src').indexOf('smoosh');
    if(smooshCheck > 1) {
      $(this).parent().addClass('smoosh');
    }
  });

  var isTaaz = false;
  var currentSlidePosition = 0;
  var nonTaazImagesArray = [];
  var thumbnails = [];

  // Check if Taaz supports currently viewed product
  var allSkus = [];
  var tazzURL = (typeof(site.taaz_api_url) != 'undef') ? site.taaz_api_url : '';

  // Check if currently viewed product is shaded
  if (that.productData.shaded && tazzURL) {
    $.each(args.productData.skus, function(index, val) {
      allSkus.push(val.PRODUCT_CODE);
    });
    tazzURL = tazzURL + allSkus.join(",");
    $.ajax({
      type: 'GET',
      timeout: 5000,
      url: location.protocol+'//'+tazzURL,
      error: function (x, t, m) {
        isTaaz = false;
        startSlider();
        if(t === "timeout") {
          $(window).trigger('TAAZ:timeout');//triggers a tag in BrightTag
        } 
      },
      success: function (data) {
        if (data === null) {
          isTaaz = false;
          startSlider();
        } else {
          isTaaz = true;
          // Add class to indicate Taaz container
          $('.product-full__image-container').addClass('taaz_container');

          // Initialize TAAZ
          var settings = {'clientId':'d8699d029c667de512f98d27ac5dc1f4', 'clientSubdomain': 'makeover.esteelauder.com'};
          TAAZ.initialize(settings);

          // TAAZ Setup
          var TAAZ_CDN_ADDRESS = 'http://tzclientscdn.taaz.com';
          var largeImageResizeCommand = 'images/R508h/';
          var thumbnailResizeCommand = 'images/R30w30h/';
          var taazImageURL;

          // This gets called by the TAAZ API and recieves the imagesIds array as parameter
          var taazModelImageHandler = function(response){
            // array of non Taaz image paths
            var nonTaazImages = [];
            if (nonTaazImagesArray.length === 0) {
              $productImage.each(function(index, val) {
                nonTaazImages.push($(this).attr('src')); 
              });
            } else {
              nonTaazImages = nonTaazImagesArray;
            }

            // Build the absolute image URLs that include the resize command:
            var largeImagesURLs = $.map(response, function(responseObject){
              return TAAZ_CDN_ADDRESS + '/' + largeImageResizeCommand + responseObject.imageId;
            });
            var thumbnailsImagesURLs = $.map(response, function(responseObject){
              return TAAZ_CDN_ADDRESS + '/' + thumbnailResizeCommand + responseObject.thumbnailImageId;
            });
            var taazModelNames = $.map(response, function(responseObject){
              return responseObject.modelData.name;
            });

            // join nonTaaz images and Taaz images into one array
            var allImageURLs = $.merge( $.merge( [], nonTaazImages ), largeImagesURLs );
            var allThumbnailImageURLs = $.merge( $.merge( [], nonTaazImages ), thumbnailsImagesURLs );
            thumbnails = allThumbnailImageURLs;

            if($('.product-full__images').hasClass('slick-slider') && ($('.slick-dots li').length >= 3)){
              // switching images after shade was selected
              $('.product-full__image').each(function(index, val) {
                if ((allImageURLs[index] == undefined) && (currentSlidePosition == index)){
                  $('.product-full__images').slickGoTo(0);
                } else {
                  $(this).find('img').attr('src', allImageURLs[index]);
                }
              });
              $('.slick-dots li').each(function(index, val) {
                //remove li that didn't get an image
                if (allThumbnailImageURLs[index] == undefined) {
                  $(this).remove();
                } else {
                  $(this).find('img').attr('src', allThumbnailImageURLs[index]);
                }
              });
            } else {
              // building slick slider including original and taaz images
              $productImages.empty();
              if(nonTaazImages.length){
                $(nonTaazImages).each(function(index, val) {
                  var div = $('<div class="product-full__image">');
                  var img = $('<img>');
                  img.attr('src', val);
                  img.appendTo(div);
                  div.appendTo($productImages);
                });
              }

              if(largeImagesURLs.length){
                $(largeImagesURLs).each(function(index, val) {
                  var div = $('<div class="product-full__image">');
                  var img = $('<img>');
                  img.attr('src', val);
                  img.appendTo(div);
                  div.appendTo($productImages);
                });
              }
              startSlider();
              updateThumbnails(thumbnails, taazModelNames);
              adjustTaazImages();
            }
          };

          TAAZ.setModelImageHandler(taazModelImageHandler);
          //first sku
          var firstProductCode = that.productCode;
          TAAZ.setProduct(firstProductCode);
        }
      }
    });
  } else {
    isTaaz = false;
    startSlider(); 
  }

  $productImages.on('sku:select', function(e, skuData) {
    if(isTaaz) {
      //determin order, what was last selected carousel order
      var currentSlide = $('.product-full__images').slickCurrentSlide();
      currentSlidePosition = currentSlide;

    // if Taaz then updated images and start slider
      that.productCode = skuData.PRODUCT_CODE;
      var newImageArray = [];
      newImageArray = skuData.XL_IMAGE;
      var newSmoosh = skuData.XL_SMOOSH;

      if($('.product-full__image').eq(currentSlide).hasClass('smoosh')){
        //add to beginning
        newImageArray.unshift(newSmoosh);
      }else{
      //add to end
        newImageArray.push(newSmoosh);
      }

      //getting odd duplicate, make unique
      newImageArray = _.uniq(newImageArray);
      //current slide count
      var slideCount = $('.product-full__images .slick-slide').length;
      
      nonTaazImagesArray = [];
      $(newImageArray).each(function(index, val) {
        nonTaazImagesArray.push(val);
      });
      TAAZ.setProduct(skuData.PRODUCT_CODE);
    } else {
      window.clearTimeout(slickToggleTimer1);
      window.clearTimeout(slickToggleTimer2);
      //update main images
      var newImageArray = [];
      newImageArray = skuData.XL_IMAGE;
      var newSmoosh = skuData.XL_SMOOSH;
      //newImageArray.splice(1, 0, newSmoosh);

      //determin order, what was last selected carousel order
      var currentSlide = $('.product-full__images').slickCurrentSlide();
      if($('.product-full__image').eq(currentSlide).hasClass('smoosh')){
        //add to beginning
        newImageArray.unshift(newSmoosh);
      }else{
      //add to end
        newImageArray.push(newSmoosh);
      }
      //getting odd duplicate, make unique
      newImageArray = _.uniq(newImageArray);
      //remove empty elements from array
      newImageArray = newImageArray.filter(function(v){return v!==''});

      //current slide count
      var slideCount = $('.product-full__images .slick-slide').length;
      //create new list
      for(var i = (slideCount-1); i >= 0; i--){
        $('.product-full__images').slickRemove(i);
      }
      $(newImageArray).each(function(index, val) {
        //add smoosh class
        var smooshClass = val.indexOf('smoosh') > 1 ? 'smoosh' : '';
        //add slide
        var newSlide = '<div class="product-full__image ' + smooshClass + '"><img src="'+ val + '" /></div>'
        $('.product-full__images').slickAdd(newSlide);
      });
    }
  });

  // shade filter
  if(that.productData.shaded){
    var sppPicker = new site.ShadePicker(that.productData);
    var $shadeFilterItem = $('.product-full__shade-filter-item');
    var $swatches = $('.swatch','.shade-list');

    $shadeFilterItem.click(function(event) {
      $shadeFilterItem.removeClass('is_selected');
      $(this).addClass('is_selected');
      if($(this).hasClass('all-item')){
        $swatches.parent().show();
      }else if($(this).hasClass('intensity-item')){
        var intensity = $(this).attr('data-intensity');
        $swatches.parent().hide();
        var $swatchesFiltered = $swatches.filter("[data-intensity=" + intensity +  "]");
        $swatchesFiltered.parent().show();
      }else if($(this).hasClass('misc-flag-item')){
        var miscFlag = $(this).attr('data-misc-flag');
        $swatches.parent().hide();
        var $swatchesFiltered = $swatches.filter("[data-misc-flag=" + miscFlag +  "]");
        $swatchesFiltered.parent().show();
      }
    });
  }

  site.addFavoritesButton($(".js-add-to-favorites"));

  var $quantitySelect = $('.product-full__quantity');
  var $sizeSelect = $('.product-full__price-size-select');
  var $skintypeSelect = $('.product-full__skintype-select');

  // set the default skintype value in the dropdown to match the one set in .net
  // note that the size select keys off of the skincare dropdown, so this must be set first
  if($skintypeSelect.length){
    // the default sku
    var defaultSku = args.productData.skus[0].SKU_BASE_ID;

    // get the value for the select with the data-skus attribute matching the default sku
    var defaultSkinTypeValue = $("[data-skus='" + defaultSku + "']").attr('value');

    // if there is also a sizeSelect, there may be a list of skus on the data-skus value, so need to match differently
    if ($sizeSelect.length){
        $skintypeSelect.find('[data-skus]').each( function (index, selectOption){
            if ($(selectOption).attr('data-skus')){
              var skus = $(selectOption).attr('data-skus').split(',');

              $(skus).each(function(index, skuValue){
                if (skuValue == defaultSku){
                  defaultSkinTypeValue = $(selectOption).attr('value');
                }
              });
            }
        });
    }

    // set that as the value of the select
    $(".product-full__skintype-select").val(defaultSkinTypeValue);

    // update the select box
    $skintypeSelect.selectBox('refresh');
  }

  //size select init:

  //get skus to show from skintype
  //if size exists
  if($sizeSelect.length && $skintypeSelect.length){
    function updateSizeSelect(){
      $('option', $sizeSelect).prop('disabled', true);
      var selectedSkus = $skintypeSelect.find('option:selected').attr('data-skus').split(',');
      $(selectedSkus).each(function(index, val) {
        var $option = $('option', $sizeSelect).filter("[data-sku-base-id=" + val +  "]");
        $option.prop('disabled', false);
        if(index == 0){
          $option.prop('selected', true);
        }
      });
      $sizeSelect.trigger('change');
    }
    updateSizeSelect();
  }

  if($sizeSelect.length){
    $sizeSelect.selectBox();
  }

  $sizeSelect.on('change', function() {
    var selectedSku = $(this).find('option:selected').attr('data-sku-base-id');
    var skuData = _.find(that.productData.skus, function(sku){ return sku.SKU_BASE_ID== selectedSku; });
    site.skuSelect(skuData);
  });

  $quantitySelect.change(function(event) {
    var quantity = $(this).val();
    site.qtySelect(that.productId, quantity);
    $('select.spp-product__mini-bag-quantity').val(quantity);
    $('.spp-product__mini-bag-quantity').selectBox('refresh');
  });

  // only use skintype as reference, set sku from size select
  $skintypeSelect.change(function(event) {
    if($sizeSelect.length){
      updateSizeSelect();
      $sizeSelect.selectBox('refresh');
    }else{
      var selectedSku = $(this).find('option:selected').attr('data-skus');
      //console.log(selectedSku);
      var skuData = _.find(that.productData.skus, function(sku){ return sku.SKU_BASE_ID== selectedSku; });
      site.skuSelect(skuData);
    }
  });

  $('.product-full__share').click(function(){
    var url = document.documentURI;
    var title = document.title;
    var img = $('#main img').first().attr("src");

    var twitter_url = 'http://twitter.com/intent/tweet?url=' + encodeURI(url) + '&amp;text=' + encodeURI(title) + '&amp;via=EsteeLauder';
    var facebook_url = 'http://www.facebook.com/sharer.php?u=' + encodeURI(url) + '&amp;t=' + encodeURI(title);

    var pinterest_url = 'http://pinterest.com/pin/create/button/?url=' + encodeURI(url) + '&amp;media=' + encodeURI(window.location.protocol) + '//' + encodeURI(window.location.host) + img + '&amp;description=' + encodeURI(title);

    var socialHTML ='<div class="social-share"><h4 class="title">Share</h4> <ul> <li><a class="social-share__link facebook" href="' + facebook_url + '" target="_blank">Facebook</a></li> <li><a class="social-share__link twitter" href="' + twitter_url + '" target="_blank">Twitter</a></li> <li><a class="social-share__link pinterest" href="' + pinterest_url + '" target="_blank">Pinterest</a></li> </ul> </div> ';
    $.colorbox({
      html: socialHTML,
      className: "colorbox--social-share",
      width: "320px",
      height: "200px"
    });
    return false;
  });

  // Add share icons
  //updateSocialLinks();
  var getShortUrl = function (urlIn, callback) {
      // clean up urlIn
      urlIn = urlIn.replace(/#.*/,"");

      // add swatch info
      var skuBaseId = $('.swatch--selected.selected').attr('data-sku-base-id');
      if ( skuBaseId ) {
          urlIn += "#"+ skuBaseId;
      }

      //var accessToken = '76cd85b016e8bd7a08db6ed187302c4ad8da70f2';
      var accessToken = 'f59213cc485198f3cba5dbc55e75bd6891f77ece';
      var apiUrl = 'https://api-ssl.bitly.com/v3/shorten?access_token=' + accessToken + '&longUrl=' + encodeURIComponent(urlIn);

      $.getJSON(
      apiUrl,
      {},
      function(response)
      {
          if(callback) {
              callback(response.data.url);
          }
      }
      );

  };
  
  var openSocialMedia = function(newUrl) {
      var deviceAgent = navigator.userAgent;
      var ios = deviceAgent.toLowerCase().match(/(iphone|ipod|ipad)/);
      var win;
      if (ios) {
          window.location=newUrl;
      } else { 
          win = window.open(newUrl, '_blank');
          if (win) {
              win.focus();
          }
      }
  }

  var applySocialMediaOffer = function(offerCode) {
    var signedIn = site.userInfoCookie.getValue('signed_in')
    var isLoyaltyMember = site.userInfoCookie.getValue('is_loyalty_member');

    // if the user is signed in and a loyalty member apply the social media offer
    if(signedIn && isLoyaltyMember) {
      var paramObj = {'offer_code' : offerCode, 'do_not_defer_messages' : 1};

      generic.jsonrpc.fetch({
        method: 'offers.apply',
        params: [paramObj]
      });
    }
  }

  if ($('.product-full__personal').find('.social-share-icons').length > 0) {

    var url = document.documentURI;
    var title = document.title;
    var shareCopyLine1 = "What's happening?";
    var shareCopyLine2 = "Check out " + productName + " from @Esteelauder";
    var img = $('#main img').first().attr("src");
    var subjectLine = "Check out " + productName + " from Estée Lauder";
    var email = 'mailto:?to=%20&body=I thought you might like this product from Estée Lauder!' + encodeURI(url) + '&subject=' + encodeURI(subjectLine);
    var twitter_url = 'http://twitter.com/intent/tweet?url=' + encodeURI(url) + '&amp;text=' + encodeURI(shareCopyLine1) + '%0A' + encodeURI(shareCopyLine2);
    var facebook_url = 'http://www.facebook.com/sharer.php?u=' + encodeURI(url) + '&amp;t=' + encodeURI(shareCopyLine1) + '%0A' + encodeURI(shareCopyLine2);
    var pinterest_url = 'http://pinterest.com/pin/create/button/?url=' + encodeURI(url) + '&amp;media=' + encodeURI(window.location.protocol) + '//' + encodeURI(window.location.host) + img + '&amp;description=' + encodeURI(shareCopyLine1) + '%0A' + encodeURI(shareCopyLine2);
    $('.product-full__personal .social-share-icons .email').attr('href', email);
    $('.product-full__personal .social-share-icons .facebook').attr('href', facebook_url).attr('offer_code', 'lyl_social_fb');
    $('.product-full__personal .social-share-icons .twitter').attr('href', twitter_url).attr('offer_code', 'lyl_social_twitter');
    $('.product-full__personal .social-share-icons .pinterest').attr('href', pinterest_url).attr('offer_code', 'lyl_social_pinterest');
    
    // the email icon isn't present, so I didn't actually get to test this part:
    $('.product-full__personal .social-share-icons .email').on("click tap", function(e){
      e.preventDefault();
      getShortUrl( document.location.href, function(result) {
        var url = result;
        var subjectLine = "Check out " + productName + " from Estée Lauder";
        var body = 'I thought you might like this product from Estée Lauder!';
        var email = 'mailto:?to=%20&body=' + encodeURI(body) + encodeURI(url) + '&subject=' + encodeURI(subjectLine);
        openSocialMedia(email);
      });
    });

    // pinterest
    $('.product-full__personal .social-share-icons .pinterest').on("click tap", function(e){
      e.preventDefault();
      getShortUrl( document.location.href, function(result) {
        var url = result;
        var img = $('#main img').first().attr("src");
        var shadeName = $('.shade-select .selectBox-label :first').text();
        var shareCopyLine1 = "What's happening?";
        var shareCopyLine2 = "Check out " + productName + " " + productSubname + (shadeName ? " in " + shadeName : " ") + " from @Esteelauder";
        var pinterest_url = 'http://pinterest.com/pin/create/button/?url=' + encodeURI(url) + '&amp;media=' + encodeURI(window.location.protocol) + '//' + encodeURI(window.location.host) + img + '&amp;description=' + encodeURI(shareCopyLine1) + '%0A' + encodeURI(shareCopyLine2);
        openSocialMedia(pinterest_url);
      });
      applySocialMediaOffer($(this).attr('offer_code'));
    });

    // facebook
    $('.product-full__personal .social-share-icons .facebook').on("click tap", function(e){
      e.preventDefault();
      getShortUrl( document.location.href, function(result) {
        var url = result;
        var shadeName = $('.shade-select .selectBox-label :first').text();
        var shareCopyLine1 = "What's happening?";
        var shareCopyLine2 = "Check out " + productName + " " + productSubname + (shadeName ? " in " + shadeName : " ") + " from @Esteelauder";
        var facebook_url = 'http://www.facebook.com/sharer.php?u=' + encodeURI(url) + '&amp;t=' + encodeURI(shareCopyLine1) + '%0A' + encodeURI(shareCopyLine2);
        openSocialMedia(facebook_url);
      });
      applySocialMediaOffer($(this).attr('offer_code'));
    });
    
    // twitter
    $('.product-full__personal .social-share-icons .twitter').on("click tap", function(e){
      e.preventDefault();
      getShortUrl( document.location.href, function(result) {
        var url = result;
        var shadeName = $('.shade-select .selectBox-label :first').text();
        var shareCopyLine1 = "What's happening?";
        var shareCopyLine2 = "Check out " + productName + " " + productSubname + (shadeName ? " in " + shadeName : " ") + " from @Esteelauder";
        var twitter_url = 'http://twitter.com/intent/tweet?url=' + encodeURI(url) + '&amp;text=' + encodeURI(shareCopyLine1) + '%0A' + encodeURI(shareCopyLine2);
        openSocialMedia(twitter_url);
      });
      applySocialMediaOffer($(this).attr('offer_code'));
    });

  }

  return that;
};

;
var site = site || {};
site.product = site.product || {};
site.product.view = site.product.view || {};


site.product.view.brief = function (args) {

  var that = {};

  that.$productView = $(args.containerNode);
  if (that.$productView.length < 1) return null;

  that.productData = args.productData;
  if (typeof that.productData != "object") return null;

  that.productId = args.productData.PRODUCT_ID;
  that.catId = that.productData.PARENT_CAT_ID;
  that.tagIds = that.catId +  '~' + that.productId;

  var isShaded = that.productData.shaded;
  var $productImageContainer = $('.product_brief__image-container', that.$productView);
  var $productImage = $('.product_brief__image', that.$productView);
  var $productHeaders = $('.product_brief__headers', that.$productView);
  var $productPanel = $('.product_brief__panel', that.$productView);
  var $productSubPanels = $('.product_brief__sub-panel', that.$productView);
  var $productDescSubPanel = $('.product_brief__description .product_brief__sub-panel', that.$productView);
  var $productButtonSub = $('.product_brief__buttons-container .product_brief__sub-panel', that.$productView);
  var $closePanel = $('.product_brief__sub-panel-close', that.$productView);
  var $productSelects = $('.product_brief__quantity, .product_brief__sku-sizes__select', that.$productView);
  var $quantitySelect = $('.product_brief__quantity', that.$productView);
  var $skintypeSelect = $('.product-brief__skintype-select', that.$productView);
  var $addToBag = $('.product_brief__button--add-to-bag', that.$productView);
  var $inventoryStatusMsg = $('ul.js-inv-status-list li', that.$productView);

  //$productSelects.selectBox();

  var $btnProductPanel = $('.product_brief__button-panel', that.$productView);
  $btnProductPanel.click( function(e) {
    e.preventDefault();
    $(document).trigger("MPP:productQV", that.tagIds);
    openSubPanel(that.productId);
    //Hide the inventory status message in quickview when morethan one sku's associated with the product
    if(that.productData.skus.length > 1)
    {
      $inventoryStatusMsg.hide();
    }
  });

  if(isShaded){
    var shadePicker = new site.ShadePicker(that.productData);
    var $swatchSelect = $('select.product_brief__swatch-select', that.$productView);
    var $shadeList = $('.shade-list', that.$productView);
    var $shadeListSwatches = $('.shade-list .swatch', that.$productView); // <a>
    var $miscFlag = $('.product_brief__misc-flag-sku', that.$productView);
    var $miscFlagREF = $('.product_brief__misc-flag-reference', that.$productView);

    function miscFlagValue(val){
      var value = val;
      if(value>=1 || value>=2 || value>=3 || value>=5 || value>=94){
        if(value == 5 || value == 94){
          value = 4; // 94 and 5 the same
        }
        var miscFlagText = $miscFlagREF.filter("[data-misc-flag=" + value + "]").html();
        $miscFlag.html(miscFlagText);
      }else{
        $miscFlag.html('');
      }
    }

    if($swatchSelect.length > 0){
      // Top Selling
      that.bestSellingSkus = that.productData.BEST_SELL_SKU_BASE_ID;
      function bestSellersSort(){
        var $swatchLis = $shadeListSwatches.parent();
        // hide all swatch LI's
        $swatchLis.hide();
        // set flag for selecting first SKU
        var select = true;
        // iterate over swatch LI's
        $swatchLis.each(function(i, ele) {
          var $swatchLi = $(this);
          var skuBaseId = $swatchLi.attr('data-sku-base-id');
          // if this swatch is in the best-seller list
          if (_.contains(that.bestSellingSkus, skuBaseId)) {
            $swatchLi.show();
            // select the first best-selling SKU
            if (select) {
              var skuDataToSelect = _.find(that.productData.skus, function(s){ return s.SKU_BASE_ID == skuBaseId; });
              site.skuSelect(skuDataToSelect);
              // set shade name
              // TODO attach this to the sku:select event instead
              $('.product_brief__shadename', that.$productView).html(skuDataToSelect.SHADENAME);
              miscFlagValue(skuDataToSelect.MISC_FLAG);
              select = false;
            }
          }
        });
      }
      if(!_.isUndefined(that.bestSellingSkus) && !_.isNull(that.bestSellingSkus)){
        $('.product_brief__all-shades', that.$productView).remove();
        that.bestSellingSkus = that.bestSellingSkus.split(',');
        //console.log(that.bestSellingSkus);
        bestSellersSort();
      }else{
        $('.product_brief__top-shades', that.$productView).remove();
      }

      // colorSelect + intensity
      $swatchSelect.selectBox({mobile: true});
      function updateSwatchSelect(select){
        $(select).selectBox('refresh');
        var $select = $(select).selectBox('control');
        var $selectOption =  $($select).data('selectBox-options');
        var $selectMenuOptions = $('li a', $selectOption);
        // add shade divs to custom select
        $selectMenuOptions.each(function() {
          var swatchClass = $(this).attr('rel');
          swatchClass = 'filter-' + swatchClass.toLowerCase().replace(/ /g,"_");
          swatchClass = swatchClass.toLowerCase();
          $(this).prepend( '<div class="filtered-swatch ' + swatchClass + '"></div>');
        });
      }
      updateSwatchSelect($swatchSelect);

      $swatchSelect.change(function(event) {
        updateSwatchSelect($(this));
        // var that.productData = _.find(page_data['catalog-mpp'].categories[0].products, function(p){ return p.PRODUCT_ID == that.productId; });
        if(!$(this)[0].selectedIndex){
          //console.log( 'top selling');
          if( $('.product_brief__top-shades', $(this)).length ){
            bestSellersSort();
          }else{
            $shadeListSwatches.parent().show();
            $shadeListSwatches.eq(0).trigger('click');
          }
        }else{
          var swatchFilter = $(this).val();
          // figure out if MISC_FLAG, ATTRIBUTE_COLOR_FAMILY or INTENSITY
          var isMiscFlag = $(this).find(":selected").hasClass('product_brief__misc-flag-option');
          if( isMiscFlag ){
            var miscFlagData = $(this).find(":selected").attr('data-misc-flag');
            var swatchFilterSkus = _.filter(that.productData.skus, function(s){ return s.MISC_FLAG == miscFlagData; });
          }else if( $(this).hasClass('color-family') ){
            var swatchFilterSkus = _.filter(that.productData.skus, function(s){ return s.ATTRIBUTE_COLOR_FAMILY == swatchFilter; });
          }else if ( $(this).hasClass('intensity') ){
            var swatchFilterSkus = _.filter(that.productData.skus, function(s){ return s.INTENSITY == swatchFilter; });
          }

          $shadeListSwatches.parent().hide();
          $(swatchFilterSkus).each(function( index, sku) {
            var skuID = sku.SKU_BASE_ID;
            var $swatch = $shadeListSwatches.filter("[data-sku-base-id=" + skuID +  "]").parent();
            $swatch.show();
          });
          //select first swatch in list
          $shadeListSwatches.filter("[data-sku-base-id=" + swatchFilterSkus[0].SKU_BASE_ID + "]").trigger('click');
          site.skuSelect(swatchFilterSkus[0]);
        }
      });
    }

    $shadeListSwatches.click(function(event) {
      var shadename = $(this).attr('name');
      $('.product_brief__shadename', that.$productView).html(shadename);
      var miscFlagSKU = $(this).attr('data-sku-base-id');
      var miscFlagVal = _.filter(that.productData.skus, function(s){ return s.SKU_BASE_ID == miscFlagSKU; });
      miscFlagValue(miscFlagVal[0].MISC_FLAG);
    });
  } // end shaded

  //non shaded - multiple sizes
  var $sizeSelect = $('.js-size-select', that.$productView);
  if($sizeSelect.length && $skintypeSelect.length){
    function updateSizeSelect(){
      $('option', $sizeSelect).prop('disabled', true);
      var selectedSkus = $skintypeSelect.find('option:selected').attr('data-skus').split(',');
      $(selectedSkus).each(function(index, val) {
        var $option = $('option', $sizeSelect).filter("[data-sku-base-id=" + val +  "]");
        $option.prop('disabled', false);
        if(index == 0){
          $option.prop('selected', true);
        }
      });
      $sizeSelect.trigger('change');
    }
    updateSizeSelect();
  }

  if($sizeSelect.length){
    $sizeSelect.selectBox();
  }

  $sizeSelect.change(function(event) {
    var selectedSku = $(this).find('option:selected').attr('data-sku-base-id');
    var skuData = _.find(that.productData.skus, function(sku){ return sku.SKU_BASE_ID== selectedSku; });
    site.skuSelect(skuData);
  });

  $quantitySelect.change(function(event) {
    var quantity = $(this).val();
    site.qtySelect(that.productId, quantity);
  });

    //get skus to show from skintype
  //if size exists
  if($sizeSelect.length){

  }

  // only use skintype as reference, set sku from size select
  $skintypeSelect.change(function(event) {
    if($sizeSelect.length){
      updateSizeSelect();
      $sizeSelect.selectBox('refresh');
    }else{
      var selectedSku = $(this).find('option:selected').attr('data-skus');
      //console.log(selectedSku);
      var skuData = _.find(that.productData.skus, function(sku){ return sku.SKU_BASE_ID== selectedSku; });
      site.skuSelect(skuData);
    }
  });

  // var $invStatusList = $(".js-inv-status-list", that.$productView);
  // var invStatusList = site.productView.InvStatusList($invStatusList);

  $productImage.on('sku:select', function(e, skuData) {
    $productImage.css('background-image','url(' + skuData.MEDIUM_IMAGE[0] + ')');
    e.stopPropagation();
  });

  var openSubPanel = function() {
    if(!$productImageContainer.hasClass('is-open')){
      // check sub-panel against prod thumb height
      var productOffsetHeight = $productHeaders.outerHeight() + $productDescSubPanel.outerHeight() + $productButtonSub.outerHeight() + 206 + 20; //small image frame = 206, extra button pad = 20
      var productCurrentHeight = that.$productView.closest('.mpp__product').outerHeight();

      var showPanel = function() {
        //$productImage.addClass('is-open');
        $productImageContainer.addClass('is-open');
        $productPanel.fadeOut( 400, function() {
          $productSubPanels.fadeIn( 400, function() {
            $closePanel.removeClass('hidden');
            //Trigger the select box change event after the quick view section loaded
            var $selectBox = $('.selectBox', that.$productView);
            $selectBox.trigger('change');
          });
        });
        site.product.view.equalRowHeight($('.mpp__product'));
      };

      if(productOffsetHeight > productCurrentHeight) {
        //expand bottom padding to fit $productButtonSub + additional 20px;
        that.$productView.closest('.mpp__product').animate({ height: productOffsetHeight }, 100, showPanel);
      }else if(productOffsetHeight <= productCurrentHeight){
        //if panel fits, just open
        showPanel();
      }
    }
    $closePanel.unbind('click');
    // TODO: collapse entire row if all are closed
    $closePanel.click( function(e) {
      e.preventDefault();
      $productImageContainer.removeClass('is-open');
      $productSubPanels.hide();
      $productPanel.fadeIn(400);
      $(this).addClass('hidden');
    });
  }; // end openSubPanel

  return that;
};
;
var site = site || {};
var profileRequests = profileRequests || '';
site.profile = site.profile || {};

/* Analytics reporting to be read post page load */
if (typeof tms_page_data =='object'){
    tms_page_data['PSN'] = {};
}else{
    tms_page_data = {};
    tms_page_data['PSN'] = {};
}

site.profile.pc = function() {

  var _common = new site.profile.common;

  var _mpp = {
    data : {},
    init : function(data) {
      if (!data || !Drupal.ELB.hasPersonalization()) {
        return null;
      };
      this.data = _common.data.mpp(data);
      this.setPageView();
    },
    setPageView : function() {
      if (!jQuery.isEmptyObject(this.data)) {
        _common.setPageView.mpp(this.data.CAT_BASE_ID);
      };
    }
  };

  var _spp = {
    data : {},
    init : function(data) {
      if (!data || !Drupal.ELB.hasPersonalization()) {
        return null;
      };
      this.data = _common.data.spp(data);
      this.setPageView();
    },
    setPageView : function() {
      if (!jQuery.isEmptyObject(this.data)) {
        _common.setPageView.spp(this.data.PROD_BASE_ID);
      };
    }
  };

  return {
    MPP : function(data) {
      _mpp.init(data);
    },
    SPP : function(data) {
      _spp.init(data);
    }
  };
}();
;
var site = site || {};

site.quickshop = function(quickshopData) {

  var that = {
    productData : quickshopData
  };
  that.productData['first_sku'] = that.productData['skus'][0];
  that.productData['XL_IMAGE_0'] = that.productData['skus'][0]['XL_IMAGE'][0];
  that.productId = that.productData.PRODUCT_ID;
  that.catId = that.productData.PARENT_CAT_ID;
  that.tagIds = that.catId +  '~' + that.productId;

  //image array
  var $imageArray = that.productData['skus'][0]['XL_IMAGE'];
  if (that.productData.shaded == 1) {
      var smooshCheck = that.productData['skus'][0]['XL_IMAGE'][0].indexOf('smoosh');
      if (smooshCheck > 1) {
          $imageArray = $imageArray.slice(1, 2);
      } {
          $imageArray = $imageArray.slice(0, 1);
      }
      $smoosh = that.productData['skus'][0]['XL_SMOOSH'];
      $imageArray.push($smoosh);
  }
  that.productData['IMAGE_ARRAY'] = $imageArray;

  //multiple sizes
  var multipleSizes = _.pluck(that.productData.skus, 'PRODUCT_SIZE');
  multipleSizes = _.uniq(multipleSizes);
  multipleSizes = _.compact(multipleSizes).length > 1 ? true : false;
  if(that.productData.sized && multipleSizes){
    that.productData['multiple_sizes'] = true;
  }else if( (that.productData.sized && !multipleSizes) || that.productData.shaded){
    that.productData['multiple_sizes'] = false;
  }

  //misc flag - product level
  var misc_flag = that.productData['MISC_FLAG'];
  if(misc_flag == 1){
    that.productData['misc_flag_1'] = true;
  }else if(misc_flag == 2){
    that.productData['misc_flag_2'] = true;
  }else if(misc_flag == 3){
    that.productData['misc_flag_3'] = true;
  }else if(misc_flag == 94 || misc_flag == 5){
    that.productData['misc_flag_4'] = true;
  }else if(misc_flag == 15){ /* PHF20150319 i222733 */
    that.productData['misc_flag_5'] = true;
  }

  var skus = that.productData.skus;
  $(skus).each(function(index, sku) {
    var shadeHex = sku.HEX_VALUE_STRING;
    // explode
    var shadeHex = shadeHex.split(',');
    if(shadeHex.length == 1) {
      sku['SWATCH_TYPE'] = 'single';
      sku['HEX_VALUE_1'] = shadeHex[0];
    }else if(shadeHex.length == 2){
      sku['SWATCH_TYPE'] = 'duo';
      sku['HEX_VALUE_1'] = shadeHex[0];
      sku['HEX_VALUE_2'] = shadeHex[1];
    }else if(shadeHex.length == 3){
      sku['SWATCH_TYPE'] = 'trio';
      sku['HEX_VALUE_1'] = shadeHex[0];
      sku['HEX_VALUE_2'] = shadeHex[1];
      sku['HEX_VALUE_3'] = shadeHex[2];
    }else if(shadeHex.length == 5){
      sku['SWATCH_TYPE'] = 'quint';
      sku['HEX_VALUE_1'] = shadeHex[0];
      sku['HEX_VALUE_2'] = shadeHex[1];
      sku['HEX_VALUE_3'] = shadeHex[2];
      sku['HEX_VALUE_4'] = shadeHex[3];
      sku['HEX_VALUE_5'] = shadeHex[4];
    }
    // misc flag
    var sku_misc_flag = sku.MISC_FLAG;
    if(sku_misc_flag == 1){
      sku['misc_flag_sku_1'] = true;
    }else if(sku_misc_flag == 2){
      sku['misc_flag_sku_2'] = true;
    }else if(sku_misc_flag == 3){
      sku['misc_flag_sku_3'] = true;
    }else if(sku_misc_flag == 94 || sku_misc_flag == 5){
      sku['misc_flag_sku_4'] = true;
    }
  });

  var  average = that.productData['AVERAGE_RATING'];
  var scale = 5;
  var calc = average / scale;
  var percentage = Math.round(parseFloat(calc) * 100);
  that.productData['stars_percent'] = percentage;

  var content = $('script.inline-template[path="quickshop"]').html();
  var qs_item = Mustache.render(content, that.productData);

  $.colorbox({
    html:qs_item,
    className: 'colorbox__quickshop',
    fixed: 'true',
    maxWidth: '90%',
    maxHeight: '90%',
    onComplete: function(){
      var $quickshop = $(".quickshop");
      if(that.productData.shaded){
        var qsPicker = new site.ShadePicker(that.productData);
      }
      var addBtn = site.createAddButton($(".js-add-to-cart", $quickshop));
      addBtn.updateInvStatus();
      site.addFavoritesButton($(".js-add-to-favorites", $quickshop));

      $('.shade-list .swatch', $quickshop).eq(0).trigger('click');

      // adjust some css for the extra row of swatches when > 30
      if ($('.shade-list .swatch', $quickshop).length > 30){
        $('.quickshop__tab-container').css('height','167px'); 
        $('.quickshop__price-size.shaded').css('padding-top','20px');
      }

      var $quantitySelect = $('.quickshop__quantity');
      var $sizeSelect = $('.quickshop__price-size-select');
      //$quantitySelect.selectBox();
      //$sizeSelect.selectBox();
      site.product.view.qsFixedBox('.quickshop__quantity');
      site.product.view.qsFixedBox('.quickshop__price-size-select');
      site.product.view.qsFixedBox('.quickshop__shade-select');

      //add after XL_SMOOSH is added to tout-mpp-product
      $productImages = $('.quickshop__image-container');
      $productImage = $('img',$productImages);
      $productImageCount = $productImage.length;

      $productImage.each(function(index, val) {
        var smooshCheck = $(this).attr('src').indexOf('smoosh');
        if(smooshCheck > 1) {
           $(this).parent().addClass('smoosh');
        }
      });

      if ($productImageCount > 1) {
          var slickToggleTimer1;
          var slickToggleTimer2;
          function slickToggle() {
              slickToggleTimer1 = setTimeout(function() {
                  $('.quickshop__image-container').slickNext();
                  slickToggleTimer2 = setTimeout(function() {
                      $('.quickshop__image-container').slickPrev();
                  }, 3000);
              }, 3000);
          }
          $('.quickshop__image-container').slick({
              dots: true,
              arrows: false,
              infinite: false,
              speed: 300,
              slidesToShow: 1,
              slidesToScroll: 1,
              onInit: function(args) {
                  var slideLength = args.$slides.length;
                  if (slideLength >= 2) {
                      slickToggle();
                  }
              }
          });
          $('.quickshop__image-container').on('sku:select', function(e, skuData) {
              window.clearTimeout(slickToggleTimer1);
              window.clearTimeout(slickToggleTimer2);
              //update main images
              var newImageArray = [];
              newImageArray = skuData.XL_IMAGE;
              var newSmoosh = skuData.XL_SMOOSH;
              //newImageArray.splice(1, 0, newSmoosh);
              //determin order, what was last selected carousel order
              var currentSlide = $('.quickshop__image-container').slickCurrentSlide();
              if ($('.quickshop__image').eq(currentSlide).hasClass('smoosh')) {
                  //add to beginning
                  newImageArray.unshift(newSmoosh);
              } else {
                  //add to end
                  newImageArray.push(newSmoosh);
              }
              //getting odd duplicate, make unique
              newImageArray = _.uniq(newImageArray);
              //current slide count
              var slideCount = $('.quickshop__image-container .slick-dots li').length;
              //create new list
              for (var i = (slideCount - 1); i >= 0; i--) {
                  $('.quickshop__image-container').slickRemove(i);
              }
              $(newImageArray).each(function(index, val) {
                  //add smoosh class
                  var smooshClass = val.indexOf('smoosh') > 1 ? 'smoosh' : '';
                  //add slide
                  var newSlide = '<div class="quickshop__image ' + smooshClass + '"><img src="' + val + '" /></div>'
                  $('.quickshop__image-container').slickAdd(newSlide);
              });
          });
      }

      $sizeSelect.change(function(event) {
        var selectedSku = $(this).find('option:selected').attr('data-sku-base-id');
        var skuData = _.find(that.productData.skus, function(sku){ return sku.SKU_BASE_ID== selectedSku; });
        site.skuSelect(skuData);
      });


      $quantitySelect.change(function(event) {
        var quantity = $(this).val();
        site.qtySelect(that.productId, quantity);
      });

      var $invStatusList = $(".js-inv-status-list", $quickshop);
      var invStatusList = site.productView.InvStatusList($invStatusList);
      invStatusList.updateInvStatus();

      //tabs
      var $qsTabControl = $('.quickshop__tab-control');
      var $qsTabs = $('.quickshop__tab');
      $qsTabs.eq(0).show();
      if($qsTabControl.length == 1){
        //hide menu
        $('.quickshop__tabs-control').hide();
      }
      $qsTabControl.addClass('quickshop__tab-control--' + $qsTabControl.length );

      $qsTabControl.click(function(event) {
        $qsTabControl.removeClass('text--bold');
        $(this).addClass('text--bold');
        var tab = $(this).attr('data-tab');
        $qsTabs.hide();
        $qsTabs.filter("[data-tab=" + tab +  "]").show();
        site.ellipsis();
      });

      $('.quickshop__add-button', $quickshop).click(function(event) {
        $.colorbox.close();
      });

      $('.quickshop__review-write').click(function(event) {
        event.preventDefault();
        $BV.ui("rr", "submit_review", {productId: that.productData.PROD_BASE_ID});
      });

      $( window ).resize(function() {
        $.colorbox.resize({
          width: '90%'
        });
      });

      $(document).trigger("MPP:productQV", [that.tagIds]);

      var $qs_container = $('.quickshop[data-product-id="' + that.productId + '"]');
      if($qs_container.length) {
        $(document).trigger('MPP:productQV:rendered', [$qs_container]);
      }
      site.ellipsis();
    },
    onClosed: function(){
      //lost reference to .selectBox() so just manually remove dropdowns
      $('.quickshop__quantity-selectBox-dropdown-menu').remove();
      $('.quickshop__price-size-select-selectBox-dropdown-menu').remove();
      $('.quickshop__shade-select-selectBox-dropdown-menu').remove();
    }
  });
  return that;
};

site.ellipsis = function(){
   
  var textDiv = $('.ellipsis');

  textDiv.each(function(){
    var current = $(this);
    
    // return if we've done this already
    if ( $(current).find('.ellipsis_characters').length ) { return 0 }
    
    var html = current.html();
    // <p> tags get closed right after the first word after they appear, so need to make them <br><br> instead, and remove closing tags
    html = html.replace(/<p>/g,' <br><br>');
    html = html.replace(/<\/p>/g,'');
    
    var words = html.split(' ');

    current.html(words[0]);

    //desired height is container height minus content top margin
    var height = parseInt( $('.quickshop__tab-container').height() - parseInt(current.css('margin-top')) );
    var html_minus_one = '';
    var html_minus_two = '';
    
    for(var i = 1; i < words.length; i++){
      // add words to div on at a time
      current.html(current.html() + ' ' + words[i]);

      // when we exceed the height we want, use the curent text minus one word, and add the ellipse
      if ($(current).height() > height){
        var sppUrl = $('.colorbox__quickshop a.quickshop__view-full').attr('href'); 
        current.html(html_minus_one + '<a href="' + sppUrl + '" class="ellipsis_characters">&#8230</a>');

        // if adding the ellipse exceeds our length, set it to minus 2 words
        if ($(current).height() > height){
          current.html(html_minus_two + '<a href="' + sppUrl + '" class="ellipsis_characters">&#8230</a>');
        }
        break;
      }

      html_minus_two = (i == 1) ? '' : html_minus_one;
      html_minus_one = current.html();
    }
  });
};
var site = site || {};

site.mppCompareInit = function(productsArray) {
  // Product compare nav
  var $compare = $('.product-compare-nav');
  if($compare.length){
    $('.js-compare-checkbox-wrapper').removeClass('hidden');
    var $mppCompareButton = $('.mpp-compare-button');
    var $mppCompareTooltip = $('.mpp-product-compare-tooltip');
    var $mppCheckbox = $('.mpp__product-grid input.compare-checkbox');
    var compareItemCount;
    var timeoutID;

    // hide compare tooltip on scroll
    $(window).scroll(function() {
      $mppCompareTooltip.hide();
    });

    $mppCompareButton.click(function(event) {
      event.preventDefault();
      if ((compareItemCount == 2) || (compareItemCount == 3)) {
        launchCompareOverlay();
      }
    });

    function fadeTooltip(fadeTime) {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
      timeoutID = setTimeout(function() { $mppCompareTooltip.fadeOut();}, fadeTime);
    }

    function launchCompareOverlay() {
      var compareProductsIds = mppCheckedProductsIDs();
      var compareProducts = [];
      $(compareProductsIds).each(function(index, val) {
        compareProducts.push(_.find( productsArray, function(p){ return p.PRODUCT_ID == val; }) );
      });
      site.mppCompare(compareProducts);
    }

    // behavior upon clicking on compare checkbox
    $mppCheckbox.change(function() {
      compareItemCount = mppCompareItems();
      if (compareItemCount > 3) {
        $(this).attr('checked', false);
        mppCompareItems();
      }
      if ((compareItemCount < 4) && (compareItemCount > 0) && $(this).attr('checked')) {
        $mppCompareTooltip.show();
        fadeTooltip(3000);
      }
      if (!$(this).attr('checked')) {
        $mppCompareTooltip.hide();
      }
      var lastCompareProductID = $(this).val();
      var lastCompareProductData = _.find(productsArray, function(p){ return p.PRODUCT_ID == lastCompareProductID; });
      var content = $('script.inline-template[path="mpp-compare-tooltip"]').html();
      var render = Mustache.render(content, lastCompareProductData);
      $('.mpp-product-compare-tooltip').html(render);
      var $mppCompareNowButton = $('.mpp-compare-now-button');
      var $mppCompareTooltipClose = $mppCompareTooltip.find('.close-button');

      $mppCompareTooltipClose.click(function() {
        console.log('close tooltip');
        $mppCompareTooltip.hide();
      });
      
      if ((compareItemCount == 2) || (compareItemCount == 3)) {
        $mppCompareNowButton.show();
        $mppCompareNowButton.unbind('click');
        $mppCompareNowButton.click(function(event) {
          event.preventDefault();
          launchCompareOverlay();
        });
      } else {
        $mppCompareNowButton.hide();
      }
    });

    // $('.compare-checkbox-label').eq(0).trigger('click');
    // $('.compare-checkbox-label').eq(1).trigger('click');
    // $('.compare-checkbox-label').eq(2).trigger('click');

    // get array of checked product IDs
    function mppCheckedProductsIDs() {
      return $(".mpp__product-grid").find('input.compare-checkbox:checked').map(function() {
        return this.value;
      }).get();
    }

    function mppCompareItems() {
      compareCount = $(".mpp__product-grid").find('input.compare-checkbox:checked').length;
      if (compareCount > 0 && compareCount < 4) {
        $mppCompareButton.find('.compare-counter').html(compareCount);
        $mppCompareButton.show();
        compareProducts = [];
      } else if (compareCount < 1) {
        $mppCompareButton.hide();
        $mppCompareTooltip.hide();
      }
      return compareCount;
    }
  }
};

site.mppCompare = function(compareProducts) {

  var that = {
    compareProducts: compareProducts,
  };
  //console.log(that.compareProducts);
  // sort labels
  var sortLabel = function(attribute){
    var label = [];
    for (var i = 0; i < that.compareProducts.length; i++) {
      var attr = that.compareProducts[i][attribute] ;
      if(!_.isNull(attr) && !_.isUndefined(attr)){
        label.push(attr);
      }
    };
    label = _.uniq(label);
    if(label.length){
      return label[0].toLowerCase();
    }else{
      return '';
    }
  }
  that.compareProducts.ATTRIBUTE_LABEL_1 = sortLabel('ATTRIBUTE_LABEL_1');
  that.compareProducts.ATTRIBUTE_LABEL_3 = sortLabel('ATTRIBUTE_LABEL_3');
  that.compareProducts.ATTRIBUTE_LABEL_4 = sortLabel('ATTRIBUTE_LABEL_4');
  that.compareProducts.ATTRIBUTE_LABEL_5 = sortLabel('ATTRIBUTE_LABEL_5');

  $(that.compareProducts).each(function(index, compareProduct) {
    //console.log(compareProduct);
    var average = compareProduct['AVERAGE_RATING'];
    if(!_.isUndefined(average) && !_.isNull(average)){
      compareProduct['stars_percent'] = site.product.view.getRatingPercentage(average);
    }

    if(compareProduct.shaded){
      // swatch list
      var skus = compareProduct.skus;
      compareProduct['filtered-intensity-show'] = 0;
      var filtered_intensity = [];
      compareProduct['color-family-show'] = 0;
      var filtered_color_family = []

      $(skus).each(function(index, sku) {
        //intensity
        if( !_.isNull(sku['INTENSITY']) && !_.isUndefined(sku['INTENSITY']) ){
          filtered_intensity.push(sku['INTENSITY']);
        }

        //color family
        if( !_.isNull(sku['ATTRIBUTE_COLOR_FAMILY']) && !_.isUndefined(sku['ATTRIBUTE_COLOR_FAMILY']) ){
          filtered_color_family.push(sku['ATTRIBUTE_COLOR_FAMILY'])
        }

        //hex
        var shadeHex = sku.HEX_VALUE_STRING;
        // explode
        var shadeHex = shadeHex.split(',');
        if(shadeHex.length == 1) {
          sku['SWATCH_TYPE'] = 'single';
          sku['HEX_VALUE_1'] = shadeHex[0];
        }else if(shadeHex.length == 2){
          sku['SWATCH_TYPE'] = 'duo';
          sku['HEX_VALUE_1'] = shadeHex[0];
          sku['HEX_VALUE_2'] = shadeHex[1];
        }else if(shadeHex.length == 3){
          sku['SWATCH_TYPE'] = 'trio';
          sku['HEX_VALUE_1'] = shadeHex[0];
          sku['HEX_VALUE_2'] = shadeHex[1];
          sku['HEX_VALUE_3'] = shadeHex[2];
        }else if(shadeHex.length == 5){
          sku['SWATCH_TYPE'] = 'quint';
          sku['HEX_VALUE_1'] = shadeHex[0];
          sku['HEX_VALUE_2'] = shadeHex[1];
          sku['HEX_VALUE_3'] = shadeHex[2];
          sku['HEX_VALUE_4'] = shadeHex[3];
          sku['HEX_VALUE_5'] = shadeHex[4];
        }
      }); // skus

      // intensity
      if ( skus.length > 1 ){
        filtered_intensity = _.uniq(filtered_intensity);
        if( filtered_intensity.length > 1 ) {
          compareProduct['filteredIntensity'] = filtered_intensity;
          compareProduct['filteredIntensityShow'] = 1;
        }
      }

      // color family
      filtered_color_family = _.uniq(filtered_color_family);
      if(filtered_color_family.length > 1){
        compareProduct['colorFamily'] = filtered_color_family;
        compareProduct['colorFamilyShow'] = 1;
      }
    }else if(!compareProduct.shaded) {
      //multiple sizes
      var multipleSizes = _.pluck(compareProduct.skus, 'PRODUCT_SIZE');
      multipleSizes = _.uniq(multipleSizes);
      multipleSizes = _.compact(multipleSizes).length > 1 ? true : false;
      if(compareProduct.sized && multipleSizes){
        compareProduct['multiple_sizes'] = true;
      }else if( (compareProduct.sized && !multipleSizes) || compareProduct.shaded){
        compareProduct['multiple_sizes'] = false;
      }
      //skintypes
      var st = _.filter(compareProduct.skus, function(sku){ return sku.SKIN_TYPE; });
      var skintypes = [];
      $(st).each(function(index, val) {
        skintypes[index] = [val.SKIN_TYPE, val.SKU_BASE_ID];
      });
      if(skintypes.length > 1){
        var skintypeKey = [];
        for (var i = 0; i < skintypes.length; i++) {
          if(skintypes[i][0] != 0){
            skintypeKey.push(skintypes[i][0]);
          }
        }
        skintypeKey = _.uniq(skintypeKey);
        var skintypeKeys = [];
        for (var i = 0; i < skintypeKey.length; i++) {
          skintypeKeys.push([skintypeKey[i],'-']);
        }
        for (var x = 0; x < skintypes.length; x++) {
          for (var i = 0; i < skintypeKeys.length; i++) {
            if(skintypes[x][0] == skintypeKeys[i][0]) {
              skintypeKeys[i][1] = skintypeKeys[i][1] + ',' + skintypes[x][1] ;
            }
          }
        }
        for (var i = 0; i < skintypeKeys.length; i++) {
          skintypeKeys[i][1] = skintypeKeys[i][1].replace("-,","");
        }
        if( skintypeKeys.length > 1){
          for (var p = 0; p < skintypeKeys.length; p++) {
            var glue = 'SKINTYPE_' + skintypeKeys[p][0];
            compareProduct[glue] = skintypeKeys[p][1];
          }
          compareProduct['skintypes'] = 1;
        }
      }
    }

  });// each compareProduct

  // console.log('that.compareProducts');
  // console.log(that.compareProducts);
  var content = $('script.inline-template[path="mpp-compare"]').html();
  var render = Mustache.render(content, that.compareProducts);

  $.colorbox({
    html:render,
    className: 'mpp-compare__container',
    fixed: 'true',
    maxWidth: '100%',
    maxHeight: '100%',
    onLoad: function(){
      $('body').addClass('products-compare');
    },
    onComplete: function(){
      if(that.compareProducts.length == 2){
        $('.mpp-compare__table td:nth-child(4)').empty();
      }
      $(that.compareProducts).each(function(index, compareProduct) {
        site.mppCompareWire(compareProduct, index);
      });
      var $trigger = $('.print-link');
      $trigger.on('click', function(e) {
        e.preventDefault();
        window.print();
      });

      $('.mpp-compare-vba__link').off('click.compare').on('click.compare', function(event){
        $('body').removeClass('products-compare');
      });
    },
    onClosed: function(){
      $('body').removeClass('products-compare');
    },
  });
  return that;
};

site.mppCompareWire = function(compareProduct, count){
  var that = {
    compareProduct: compareProduct,
  };
  var $compareContainer = $('.mpp-compare__bag-container--' + count);
  var $priceContainer = $('.mpp-compare__price-container--' + count);
  var isShaded = that.compareProduct.shaded;

  // add button and inventory
  var $compareButton = $(".js-add-to-cart", $compareContainer);
  var addBtn = site.createAddButton($(".js-add-to-cart", $compareContainer));
  addBtn.updateInvStatus();
  var $invStatusList = $(".js-inv-status-list", $compareContainer);
  var invStatusList = site.productView.InvStatusList($invStatusList);
  invStatusList.updateInvStatus();

  $compareButton.click(function(event) {
    $.colorbox.close();
    $('body').removeClass('products-compare');
  });

  $('.mpp-compare-vba__link').click(function(event) {
    $('body').removeClass('products-compare');
  });

  if(isShaded){
    var shadePicker = new site.ShadePicker(that.compareProduct);
    var $swatchSelect = $('.mpp-compare__swatch-select', $compareContainer);
    var $shadeList = $('.shade-list', $compareContainer);
    var $shadeListSwatches = $('.shade-list .swatch', $compareContainer);

    if($swatchSelect.length > 0){
      // bestsellers
      that.bestSellingSkus = that.compareProduct.BEST_SELL_SKU_BASE_ID;
      function bestSellersSort(){
        $shadeListSwatches.parent().hide();
        $(that.bestSellingSkus).each(function( index, sku) {
          var $swatch = $shadeListSwatches.filter("[data-sku-base-id=" + sku +  "]").parent();
          $swatch.show();
        });
      }
      if(!_.isUndefined(that.bestSellingSkus) && !_.isNull(that.bestSellingSkus)){
        $('.mpp-compare__all-shades', $compareContainer).remove();
        that.bestSellingSkus = that.bestSellingSkus.split(',');
        //console.log(that.bestSellingSkus);
        bestSellersSort();
        var firstBestSku = that.bestSellingSkus[0];
        $shadeListSwatches.filter(":visible").eq(0).trigger('click');
      }else{
        $('.mpp-compare__top-shades', $compareContainer).remove();
        $shadeListSwatches.eq(0).trigger('click');
      }

      // colorSelect
      //$swatchSelect.selectBox({mobile: true});
      site.mppCompareFixedBox($swatchSelect);
      function updateSwatchSelect(select){
        $(select).selectBox('refresh');
        var $select = $(select).selectBox('control');
        var $selectOption =  $($select).data('selectBox-options');
        var $selectMenuOptions = $('li a', $selectOption);
        // add shade divs to custom select
        $selectMenuOptions.each(function() {
          var swatchClass = $(this).attr('rel');
          swatchClass = 'filter-' + swatchClass.toLowerCase().replace(/ /g,"_");
          swatchClass = swatchClass.toLowerCase();
          $(this).prepend( '<div class="filtered-swatch ' + swatchClass + '"></div>');
        });
      }
      updateSwatchSelect($swatchSelect);

      $swatchSelect.change(function(event) {
        updateSwatchSelect($(this));
        if(!$(this)[0].selectedIndex){
          if( $('.mpp-compare__top-shades', $(this)).length ){
            bestSellersSort();
          }else{
            $shadeListSwatches.parent().show();
            $shadeListSwatches.eq(0).trigger('click');
          }
        }else{
          var swatchFilter = $(this).val();
          //test against skus for matches
          // If color family get ATTRIBUTE_COLOR_FAMILY, else if intensity get INTENSITY
          if( $(this).hasClass('color-family') ){
            var swatchFilterSkus = _.filter(that.compareProduct.skus, function(s){ return s.ATTRIBUTE_COLOR_FAMILY == swatchFilter; });
          }else if ( $(this).hasClass('intensity') ){
            var swatchFilterSkus = _.filter(that.compareProduct.skus, function(s){ return s.INTENSITY == swatchFilter; });
          }
          $shadeListSwatches.parent().hide();
          $(swatchFilterSkus).each(function( index, sku) {
            var skuID = sku.SKU_BASE_ID;
            var $swatch = $shadeListSwatches.filter("[data-sku-base-id=" + skuID +  "]").parent();
            $swatch.show();
          });
          //select first swatch in list
          $shadeListSwatches.filter("[data-sku-base-id=" + swatchFilterSkus[0].SKU_BASE_ID + "]").trigger('click');
        }
      });
    }else{
      $shadeListSwatches.eq(0).trigger('click');
    }
    $shadeListSwatches.click(function(event) {
      var shadename = $(this).attr('name');
      $('.mpp-compare__shadename', $compareContainer).html(shadename);
    });
  }else if(!isShaded){
    // size and skintype
    var $sizeSelect = $('.mpp-compare__price-size-select', $priceContainer);
    var $skintypeSelect = $('.mpp-compare__skintype-select', $compareContainer);
    if($sizeSelect.length && $skintypeSelect.length){
      function updateSizeSelect(){
        $('option', $sizeSelect).prop('disabled', true);
        var selectedSkus = $skintypeSelect.find('option:selected').attr('data-skus').split(',');
        $(selectedSkus).each(function(index, val) {
          var $option = $('option', $sizeSelect).filter("[data-sku-base-id=" + val +  "]");
          $option.prop('disabled', false);
          if(index == 0){
            $option.prop('selected', true);
          }
        });
        $sizeSelect.trigger('change');
      }
      updateSizeSelect();
    }
    if($sizeSelect.length){ site.mppCompareFixedBox($sizeSelect); }
    if($skintypeSelect.length){ site.mppCompareFixedBox($skintypeSelect); }

    $sizeSelect.change(function(event) {
      var selectedSku = $(this).find('option:selected').attr('data-sku-base-id');
      var skuData = _.find(that.compareProduct.skus, function(sku){ return sku.SKU_BASE_ID== selectedSku; });
      site.skuSelect(skuData);
    });

    // only use skintype as reference, set sku from size select
    $skintypeSelect.change(function(event) {
      if($sizeSelect.length){
        updateSizeSelect();
        $sizeSelect.selectBox('refresh');
      }else{
        var selectedSku = $(this).find('option:selected').attr('data-skus');
        //console.log(selectedSku);
        var skuData = _.find(that.compareProduct.skus, function(sku){ return sku.SKU_BASE_ID== selectedSku; });
        site.skuSelect(skuData);
      }
    });
  }
};

site.mppCompareFixedBox = function(select){
  var self = this;
  var $select = $(select);
  if($select.length){
    $select.selectBox({ mobile: true }).bind('open', function(){
      // add back in when once the rest is done

      //var $selectMenu = $(select+'-selectBox-dropdown-menu');
      // var scrollTop = $(window).scrollTop();
      // var menuTop = $selectMenu.css('top').split('px')[0];
      // var fixedTop = parseInt(menuTop - scrollTop) + 'px';
      // $selectMenu.css({
      //   'position':'fixed',
      //   'top': fixedTop,
      //   //'opacity': 1
      // });
    });
    var selectControl = $select.selectBox('instance');
    $('#cboxLoadedContent').scroll(function() {
      selectControl.hideMenus();
    });
    window.onscroll = function (event) {
      //console.log('scrolling');
      selectControl.hideMenus();
    }
  }
};
;
var site = site || {};

site.productSort = {
  init: function(productsArray) {
    var that = this;
    var productsArray = productsArray;
    var $sortSelect = $('.js-product-sort');
    var $sortContainer = $('.mpp__product-sort-container');
    //hide extra sort selects
    if($sortContainer.length > 1){
      $sortContainer.each(function(index, sort) {
        if(index !== 0){
          $(this).hide();
        }
      });
    }

    //alphabetical names
    var productsArrayNames = _.sortBy(productsArray, function(p) {
      var tempNames = p.PROD_RGN_NAME.toLowerCase();
      //strip out html
      tempNames = tempNames.replace(/<(?:.|\n)*?>/gm, ' ');
      return tempNames;
    });
    //console.log(_.pluck(productsArrayNames, 'PROD_RGN_NAME'));

    //newest - MISC_FLAG new shades (3) and new (1)
    var productsArrayNewest = _.filter(productsArray, function(p){ return p.MISC_FLAG == 1 || p.MISC_FLAG == 3; });
    var productDiff = _.difference(productsArray, productsArrayNewest);
    productsArrayNewest = productsArrayNewest.concat(productDiff);
    //rated - AVERAGE_RATING
    var productsArrayRated = _.sortBy(productsArray, function(p) {
      return -p.AVERAGE_RATING;
    });

    //price high
    var productsArrayPriceHigh = _.sortBy(productsArray, function(p) {
      var skuPrice = _.min(p.skus, function(sku){ return sku.PRICE; });
      skuPrice = skuPrice.PRICE;
      return -skuPrice;
    });

    //price low
    var productsArrayPriceLow = _.sortBy(productsArray, function(p) {
      var skuPrice = _.min(p.skus, function(sku){ return sku.PRICE; });
      skuPrice = skuPrice.PRICE;
      return skuPrice;
    });

    $sortSelect.change(function(event) {
      var $selected = $(this).find('option:selected');
      var dataSort = $selected.attr('data-sort');
      var sortedProducts;
      if(dataSort == 'all'){
        //all
        sortedProducts = productsArray;
      }else if(dataSort == 'name'){
        //name
        sortedProducts = productsArrayNames;
      }else if(dataSort == 'newest'){
        //newest
        sortedProducts = productsArrayNewest;
      }else if(dataSort == 'rated'){
        //rated
        sortedProducts = productsArrayRated;
      }else if(dataSort == 'price-high'){
        //price-high
        sortedProducts = productsArrayPriceHigh;
      }else if(dataSort == 'price-low'){
        //price-low
        sortedProducts = productsArrayPriceLow;
      }
      that.sort(sortedProducts);
    });
  },
  sort: function(sortedProducts){
    var sortedProducts = sortedProducts;
    var $productContainer = $('.mpp__product-grid');
    var $products = $('.mpp__product');
    //strip sorted object for PRODUCT_ID
    var productIDs = _.pluck(sortedProducts, 'PRODUCT_ID');
    //console.log(_.pluck(sortedProducts, 'PROD_RGN_NAME'));
    var $sortedProducts = [];
    //sort by PRODUCT_ID <> data-productid
    var dataProductId;
    if($products.eq(0).attr('data-productid')){
      dataProductId = 'data-productid';
    }else if($products.eq(0).attr('data-product-id')){
      dataProductId = 'data-product-id';
    }
    $(productIDs).each(function(index, prodID) {
      $sortedProducts.push($products.filter("["+dataProductId+"=" + prodID +  "]"));
    });
    //remove styles on $products
    $products.removeAttr('style');
    //move sorted products to top
    if($productContainer.length > 1){
      $productContainer.each(function(index, container) {
        $(this).data('prodCount', $('.mpp__product',$(this)).length );
      });
      $productContainer.each(function(index, container) {
        var prodCount = $(this).data('prodCount');
        var countArray = [];
        for(i=index; i>=0; i--) {
          countArray.push($productContainer.eq(i).data('prodCount'));
        }
        countArray.reverse();
        var lastCount = countArray[countArray.length-1];
        countArray.pop();
        var startIndex = 0;
        $(countArray).each(function() {
          startIndex += this;
        });
        //range
        var $productRange = $sortedProducts.slice(startIndex,(startIndex+prodCount));
        $(this).prepend($productRange);
      });
    }else{
      $productContainer.prepend($sortedProducts);
    }
    //update row heights
    site.product.view.equalRowHeightFunc($('.mpp__product'));
    site.product.view.miscFlagAlign($('.mpp__product'));
  }
};
;
// Original modified =  09-17-2011
// Modified by =  MB
// DrupalGem modifications = 05/26/14
// Modified by =  PC

var lpMTagConfig = {
	'lpServer' : 'server.iad.liveperson.net',
	'lpNumber' : '24631554',
        //'lpNumber' : '74547244',
	'lpProtocol' : (document.location.toString().indexOf('https:')==0) ? 'https' : 'http',
	'lpTagLoaded' : false,
	//'lpTagSrv' : 'sr2.liveperson.net', //uncomment for hosted solution (erase this line if not needed)
	'pageStartTime' : (new Date()).getTime(), //pageStartTime is set with a timestamp as soon as the page starts loading
	'defaultUnit' : 'Estee Lauder'
};
if (typeof(lpMTagConfig.lpTagSrv) == 'undefined') {
	lpMTagConfig.lpTagSrv = lpMTagConfig.lpServer;
}
lpMTagConfig.deploymentConfigPath = lpMTagConfig.lpTagSrv+'/visitor/addons/deploy.asp';

lpMTagConfig.lpLoadScripts = function(){
	lpAddMonitorTag(lpMTagConfig.lpProtocol + '://' + lpMTagConfig.deploymentConfigPath + '?site=' + lpMTagConfig.lpNumber + '&d_id=' + lpMTagConfig.deploymentID);
}

function lpAddMonitorTag(src) {
	if (!lpMTagConfig.lpTagLoaded) {if (typeof(src) == 'undefined' || typeof(src) == 'object') {if (lpMTagConfig.lpMTagSrc) {src = lpMTagConfig.lpMTagSrc;}else {if (lpMTagConfig.lpTagSrv) {src = lpMTagConfig.lpProtocol + '://' +lpMTagConfig.lpTagSrv + '/hcp/html/mTag.js';}else {src = '/hcp/html/mTag.js';};};};if (src.indexOf('http') != 0) {src = lpMTagConfig.lpProtocol + '://' + lpMTagConfig.lpServer + src + '?site=' + lpMTagConfig.lpNumber;} else {if (src.indexOf('site=') < 0) {if (src.indexOf('?') < 0) {src = src + '?';} else{src = src + '&';} src = src + 'site=' + lpMTagConfig.lpNumber;  };};var s = document.createElement('script');s.setAttribute('type', 'text/javascript');s.setAttribute('charset', 'iso-8859-1');s.setAttribute('src', src);document.getElementsByTagName('head').item(0).appendChild(s);}
}

//The code below send a PAGEVAR to LP with the time [in seconds] it took the page to load. Code is executed in the onload event
lpMTagConfig.calculateSentPageTime = function () {
	var t = (new Date()).getTime() - lpMTagConfig.pageStartTime;
	lpAddVars('page','pageLoadTime', Math.round(t/1000)+' sec');
};

//Variables Arrays - By Scope
if (typeof(lpMTagConfig.pageVar)=='undefined') { lpMTagConfig.pageVar = []; }
if (typeof(lpMTagConfig.sessionVar)=='undefined') { lpMTagConfig.sessionVar = []; }
if (typeof(lpMTagConfig.visitorVar)=='undefined') { lpMTagConfig.visitorVar = []; }
//Extra actions to be taken once the code executes
if (typeof(lpMTagConfig.onLoadCode)=='undefined') { lpMTagConfig.onLoadCode = []; }
//Dynamic Buttons Array
if(typeof(lpMTagConfig.dynButton)=='undefined') { lpMTagConfig.dynButton = []; }
// This need to be add to afterStartPage will work
if(typeof(lpMTagConfig.ifVisitorCode)=='undefined') {lpMTagConfig.ifVisitorCode = []; }


// Function that sends variables to LP - By Scope
function lpAddVars(scope,name,value) {
	if (name.indexOf('OrderTotal')!=-1 || name.indexOf('OrderNumber')!=-1){
		if  (value=='' || value==0) return; // pass 0 value to all but OrderTotal
		else lpMTagConfig.sendCookies = false
	}
	value=lpTrimSpaces(value.toString());
//Remove cut long variables names and values. Trims suffix of the variable name above the 25th character onwards
	if (name.length>50) {
		name=name.substr(0,50);
	}
    if (value.length>50) { // Trims suffix of the variable value above the 50th character onwards
		value=value.substr(0,50);
	}
	switch (scope){
		case 'page': lpMTagConfig.pageVar[lpMTagConfig.pageVar.length] = escape(name)+'='+escape(value); break;
		case 'session': lpMTagConfig.sessionVar[lpMTagConfig.sessionVar.length] = escape(name)+'='+escape(value); break;
		case 'visitor': lpMTagConfig.visitorVar[lpMTagConfig.visitorVar.length] = escape(name)+'='+escape(value); break;
	}
}

// Preventing long cookie transfer for IE based browsers.
function onloadEMT() {
	var LPcookieLengthTest=document.cookie;
	if (lpMTag.lpBrowser == 'IE'){
	 if (LPcookieLengthTest.length>1000){
		lpMTagConfig.sendCookies=false;
	 }
	 lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {'name':'chat-'+lpUnit+'-product','pid':'lpbuttonproductIE','afterStartPage': true};
   lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {'name':'chat-'+lpUnit+'-ordertech','pid':'lpbuttonordertechIE','afterStartPage': true};
	}
}

//The Trim function returns a text value with the leading and trailing spaces removed
function lpTrimSpaces(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,'');
}

// Immediate Data submission function
function lpSendData(varscope,varname,varvalue) {
	if(typeof(lpMTag)!='undefined' && typeof(lpMTag.lpSendData)!='undefined')
		lpMTag.lpSendData(varscope.toUpperCase() +'VAR!'+ varname + '=' + varvalue, true);
}

// The unit variable purpose is to route the chat or call to the designated skill. <LOB> should be replaced with the skill name, i.e. : sales
try{
	if (typeof(lpUnit)=='undefined') { var lpUnit=lpMTagConfig.defaultUnit; }
	lpMTagConfig.deploymentID=lpUnit;
	if(typeof(lpAddVars)!='undefined') { lpAddVars('page','unit',lpUnit); }
	lpMTagConfig.defaultInvite='chat'+'-'+lpUnit;
}catch(e){}

lpMTagConfig.onLoadCode[lpMTagConfig.onLoadCode.length] = onloadEMT;

//Scan dynButton and removes buttons which doesnt have Div on the page
lpMTagConfig.onLoadCode[lpMTagConfig.onLoadCode.length] = function () {
	if(typeof(lpMTagConfig.dynButton)!='undefined') {
		for (i=0;i<lpMTagConfig.dynButton.length;i++){
			if (typeof(lpMTagConfig.dynButton[i].pid)!='undefined' && document.getElementById(lpMTagConfig.dynButton[i].pid) == null) {
					lpMTagConfig.dynButton.splice(i,1);
					i--;
			}
		}
	}
};


function lpTriggerEvent (pgEventName, lpEventName, lpEventData) {
    var eventData = lpEventData || {};
    eventData.lpEventName = lpEventName;

    if (typeof document.fire === "function") { document.fire(pgEventName, eventData); }
    else if (typeof jQuery != "undefined") { jQuery(document).trigger(pgEventName, [ eventData ]); }
}

function lpEventButtonClicked (eventName, eventData) {
    lpTriggerEvent('livechat:button_clicked', eventName, eventData);
}
function lpEventInviteAccepted (eventName, eventData) {
    lpTriggerEvent('livechat:invite_accepted', eventName, eventData);
}
function lpEventInviteShown (eventName, eventData) {
    lpTriggerEvent('livechat:invite_shown', eventName, eventData);
}

lpMTagConfig.onLoadCode[lpMTagConfig.onLoadCode.length]  = function () {
    lpTriggerEvent('livechat:loaded', '', {} );
    lpMTag.events.register('LP_INV_SHOWN', lpEventInviteShown);
    lpMTag.events.register('LP_INV_ACCEPT', lpEventInviteAccepted);
    lpMTag.events.register('LP_DYNBUTTON_CLICKED', lpEventButtonClicked);
    lpMTag.events.register('LP_STATBUTTON_CLICKED', lpEventButtonClicked);
};

//The folowing functions will be load after the page will finish loading
lpMTagConfig.onLoadAll = function () {
	lpMTagConfig.calculateSentPageTime();
	lpMTagConfig.lpLoadScripts();

        $(document).ready(function(){

            //lpbuttonproduct
            $("#lpbuttonproduct").bind("click", function(evt){
                //analytics
                lpTriggerEvent('livechat:button_clicked','LP_DYNBUTTON_CLICKED', { 'name':'chat-'+lpUnit+'-product' });
            });
        
            //lpbuttonordertech
            $("#lpbuttonordertech").bind("click", function(evt){
                //analytics
                lpTriggerEvent('livechat:button_clicked','LP_DYNBUTTON_CLICKED', { 'name':'chat-'+lpUnit+'-ordertech' });
            });
        
            //lpbuttonfooter
            $("#lpbuttonfooter").bind("click", function(evt){
                //analytics
                lpTriggerEvent('livechat:button_clicked','LP_DYNBUTTON_CLICKED', { 'name':'chat-'+lpUnit+'-footer' });
            });
        });

};

if (window.attachEvent) { //it's IE
	window.attachEvent('onload',lpMTagConfig.onLoadAll);

	// workaround for IE only issues with updating the nodes in the dropdown
	window.attachEvent('onload',function(){
	 	var liveChatForIEChecker = setInterval(checkLPDivContentUpdate, 100);
	  function checkLPDivContentUpdate(){
	 		// These 2 divs are created in footer.tmpl, then updated in mtagconfig.js, and moved into the dropdown
	 		var lpPIE = document.getElementById('lpbuttonproductIE');
	  	var lpOTIE = document.getElementById('lpbuttonordertechIE');

	  	if (lpPIE && lpPIE.innerHTML.match('actionHook') && lpOTIE && lpOTIE.innerHTML.match('actionHook') ){
	  		// For lpbuttonproduct
	  		var P = document.getElementById('lpbuttonproduct');
   			if (typeof(P) != 'undefined' && P != null){
   				P.appendChild(lpPIE.parentNode.removeChild(lpPIE));
					lpPIE.style.top = '0px';
	 			}

	 			// For lpbuttonordertech
	  		var OT = document.getElementById('lpbuttonordertech');
   			if (typeof(OT) != 'undefined' && OT != null){
   				OT.appendChild(lpOTIE.parentNode.removeChild(lpOTIE));
	 				lpOTIE.style.top = '0px';
	 		  }

	 		  // Stop checking
	 			clearInterval(liveChatForIEChecker);
	 		}
	 }
 	});

} else {
	window.addEventListener('load',lpMTagConfig.onLoadAll,false);
}

// LP Button Code
lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {'name':'chat-'+lpUnit,'pid':'lpbuttondiv','afterStartPage': true};
lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {'name':'chat-'+lpUnit+'-footer','pid':'lpbuttonfooter','afterStartPage': true};
lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {'name':'chat-'+lpUnit+'-product','pid':'lpbuttonproduct','afterStartPage': true};
lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {'name':'chat-'+lpUnit+'-ordertech','pid':'lpbuttonordertech','afterStartPage': true};



lpMTagConfig.delegate = {};
/*
lpMTagConfig.delegate.launchWindow = function() {

        var first_name = 'FIRST-NAME'; //jQuery('#input-first-name').val();
        var email = 'EMAIL@ADDRESS.COM'; //jQuery('#input-email-address').val();
        var textarea = 'A long and short summary of text to demonstrate pre-chat survey text messages'; //jQuery('#textarea-your-question').val();

        var window_loc = '/customer_service/vba/vba_window.tmpl?' + 'email=' + email + '&' + 'name=' + first_name + '&' + 'message=' + textarea;
        myWindow = window.open(window_loc,"MsgWindow","width=828,height=670,resizable=0");

};
*/

/* Called when the user accepts the proactive chat invitation */
lpMTagConfig.delegate.proactiveAccepted = function() {
    lpTriggerEvent('livechat:invite_accepted', 'LP_INV_ACCEPT', {});
    lpMTagConfig.delegate.prechatWindow();
};

/* Called when the user initiates chat (from the bottom drawer, the CS pages, etc) */
lpMTagConfig.delegate.prechatWindow = function() {

        /* works with colorbox prechat window - callback upon prechat window content load */
        $(document).bind('cbox_complete', function(){

            // launch functions to arrive with prechat 
            jQuery('a.order-question-btn-active').bind('click',launchSimpleWindow);
            jQuery('a.beauty-advice-btn-active').bind('click',launchFullWindow);

            // redundant
            jQuery('.order-question-btn-off','#prechat_container').hide().unbind('click');
            jQuery('.beauty-advice-btn-off','#prechat_container').hide().unbind('click');

            /*
            cbox_open   triggers when Colorbox is first opened, but after a few key variable assignments take place.
            cbox_load   triggers at the start of the phase where content type is determined and loaded.
            cbox_complete       triggers when the transition has completed and the newly loaded content has been revealed.
            cbox_cleanup        triggers as the close method begins.
            cbox_closed         triggers as the close method ends. 
            */
        });


        jQuery.ajax({
            url: '/customer_service/vba/prechat_overlay.tmpl',
            context: document.body
        }).done(function(html) {

            var formContainerNode = jQuery('<div />').attr('id',"prechat_container");
            formContainerNode.html(html);

            generic.overlay.launch({content: formContainerNode, includeBackground: true, cssStyle:{width:"540px",height:"520px"}});

            // IE8 Prechat Overlay
            if (generic.env.isIE8) {
                jQuery.colorbox.resize({height:"600px",width:"540px"});
            } else {
                jQuery.colorbox.resize({height:"520px",width:"540px"});
            }

            jQuery('#prechat_container').parent().css({overflow:'hidden'});

            //IE9 Chat Button Enable
            if (generic.env.isIE9) {
                lpMTagConfig.onLoadAll();
            }

            lpTriggerEvent('livechat:;prechat_survey_displayed','LP_PRECHAT_SURVEY');

        });
        /* */

};
;
    var site = site || {};
    site.features = {
            has_auto_replenishment : true,
            has_checkout_samples : true,
            show_offer_entry_field : true,
            allows_anonymous_checkout : true,
            has_samples_only_checkout : false,
            search_type : 'endeca',
            uses_cheetah_mail_for_email_signup_email : true,
            uses_cheetah_mail_for_registration_email : true,
            personalization_is_enabled : false,
            use_frontend_device_detection : true,
            analytics_tagged : true,
            has_giftcards : true,
            has_waitlist_notification : true,
            has_favorites : true,
            has_pro_site : true,
            show_legal_acceptance_checkbox : false,
            has_loyalty_program : true,
            pre_check_optin : false
    };
;
