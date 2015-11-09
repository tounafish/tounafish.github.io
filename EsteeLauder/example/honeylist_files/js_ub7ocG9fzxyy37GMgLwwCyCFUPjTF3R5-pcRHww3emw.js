/**
 * Header nav responsive carousel trigger and behavior
 * Trigger slick, respond to opening/closing of top expand-o nav container
 */
(function($) {
  Drupal.behaviors.carousel_responsive_nav = {
    attach: function(context, settings) {
      var $carousel = $('.responsive-carousel-nav');

      // trigger flexslider on *just* our top nav carousel(s)
      $('.flexslider', $carousel).flexslider({
        animation: "slide",
        minItems: 1,
        maxItems: 5,
        controlNav: false,
        move: 5,
        slideshow: false,
        animationLoop: true,
        itemWidth: 173,
        itemMargin: 0, // leave this as ZERO for math
        start: centerCarousel
      });

      // respond to opening nav
      $(document).on('navOpen', function(event, category) {
        $carousel.removeClass('responsive-carousel-nav--visible');
        $('.responsive-carousel-nav[data-menucat="' + category + '"]').addClass('responsive-carousel-nav--visible');
      });

      // respond to closing nav
      $(document).on('navClose', function(event) {
        $carousel.removeClass('responsive-carousel-nav--visible');
      });

      // Quick function to center a variable slide carousel
      // alternate styles are applied
      // resize triggered
      function centerCarousel(slider) {
        if (slider.pagingCount == 1) {
          slider.addClass('js-flex-centered');
          slider.resize();
        }

      }

    }
  };
})(jQuery);
;
var generic = generic || {};
var site = site || {};

(function ($) {

site.countryChooser = {
  templateContainer : $('.country-chooser'),

  initCountryChooser : function() {
    var containerNode = this.templateContainer;
    if (!containerNode) {
      return null;
    }

    var $countrySelector = $('.country-chooser__selector');
    var $countryMenu = containerNode.find('.menu');

    // Initialize the country chooser
    $countrySelector.click(function(e) {
      e.preventDefault();
      $(this).addClass('active');
      var h = $countrySelector.outerHeight(true);
      $countryMenu.css({ 'bottom': h + 'px' }).stop().delay(100).slideToggle(300, function() {
        $countryMenu.is(':visible') || $countrySelector.removeClass('active');
        $countryMenu.css({ 'overflow': 'auto' });
      });
      return !1;
    });

    $countrySelector.bind('clickoutside', function(e) {
      $countryMenu.slideUp(200);
      $(this).removeClass('active');
    });
  }
}

Drupal.behaviors.countryChooserV1 = {
  attach: function (context, settings) {
    site.countryChooser.initCountryChooser();
  }
};

})(jQuery);
;
var generic = generic || {};
var site = site || {};

(function ($) {

site.emailSignup = {
  templateContainer: $(),

  initEmailSignup : function() {
    var $emailContainerNodes = this.templateContainer;
    if (!$emailContainerNodes.length) {
      return null;
    }

    $emailContainerNodes.each(function() {
      var $emailContainerNode = $(this);
      var $emailForm    = $emailContainerNode.is('form') ? $emailContainerNode : $('form', $emailContainerNode);
      var $emailSuccess = $('.email-signup__success', $emailContainerNode);
      var $emailError   = $('.email-signup__error', $emailContainerNode);
      var $emailInput   = $('input[name="PC_EMAIL_ADDRESS"]', $emailContainerNode);
      var isMobile = !$('body').hasClass('device-pc');
      var colorboxSettings = {
        html: $emailSuccess.html(),
        width: '600px',
        height: '600px',
        className: 'email_signup_sucess_popup'
      };
      if (isMobile) {
        colorboxSettings.width = '100%';
      }

      $emailForm.once('email-signup__form').submit(function(submitEvt) {
        submitEvt.preventDefault();
        $emailSuccess.add($emailError).addClass('hidden');
        $emailInput.removeClass('error');

        // Transform string into array of form elements
        var params = {};
        $.each($emailForm.serializeArray(), function(index, kv) {
          params[kv.name] = kv.value.replace('undefined', '').replace('%40', '@');
        });

        var form = this;
        // Send the data via a json rpc call
        generic.jsonrpc.fetch({
          method : 'rpc.form',
          params: [params],
          onSuccess:function(jsonRpcResponse) {
            //1st condition satisfies in promotions page where as in footer it has three levels so introduced the OR condition
            if (($(form).parent().parent().parent().parent().hasClass('content')) || ($(form).parent().parent().parent().hasClass('content'))) {
              // Only show the success message if the email_signup.success handlers haven't already done so
              if ($('#colorbox').css('display') != 'block') {
                $.colorbox(colorboxSettings);
              }
            } else {
              $.when(
                $(document).triggerHandler('email_signup.success', [jsonRpcResponse])
              ).then(function() {
                // Only show the success message if the email_signup.success handlers haven't already done so
                if ($('#colorbox').css('display') != 'block') {
                  $.colorbox({ html: $emailSuccess.html() });
                }
              });
            }
            $('.email_signup_sucess_popup .email-signup__success-text').on('click', function() {
              $.colorbox.close();
            });
          },
          onFailure: function(jsonRpcResponse){
            $emailError.removeClass('hidden');
            $emailInput.addClass('error');
          }
        });
      });
    });
  }
};

Drupal.behaviors.emailSignupFormV1 = {
  attach: function (context, settings) {
    site.emailSignup.templateContainer = $('.email-signup', context);
    site.emailSignup.initEmailSignup();
  }
};

})(jQuery);
;
var generic = generic || {};
var site = site || {};

(function ($) {

  site.sms = {

    initSMSForm : function() {
      // NB: the promotions page has 2 SMS forms on it but with the same class name
      // there is the promotions SMS for and the normal footer SMS form
      // so we loop here to bind to each individual form
      $('.sms-signup').each(function(){
        var smsContainerNode = $(this);

        var smsFormNode          = smsContainerNode.find('form'),
            smsSuccessNode       = smsContainerNode.find('.sms-signup__success'),
            smsErrorNode         = smsContainerNode.find('.sms-signup__error'),
            smsInputNode         = smsContainerNode.find("input[name='SMSPROMO_MOBILE_NUMBER']"), 
            smsPromtionsCheckbox = smsContainerNode.find("input[name='SMSPROMO_SMS_PROMOTIONS']"),
            smsCheckbox          = smsContainerNode.find('#sms-signup-checkbox');

            if(smsCheckbox.length > 1) {
              smsCheckbox.each(function(index, val) {
                 $(this).attr('id', 'sms-signup-checkbox'+index);
                 $(this).parent().find('.form-checkbox__label').attr('for','sms-signup-checkbox'+index);
              });
            }

        smsFormNode.once('mobile-signup-form').bind('submit', function(submitEvt) {
          submitEvt.preventDefault();
          smsSuccessNode.addClass('hidden');
          smsErrorNode.addClass('hidden');

          // Retrieve form data in querystring format
          var formSerial = smsFormNode.serialize();

          // Transform string into array of form elements
          var paramArr = formSerial.split("&");

          // Check phone number for extra chars.
          var smsNumberFind = _.findWhere(paramArr, "SMSPROMO_MOBILE_NUMBER");
          if (generic.env.isIE8) {
              smsNumberFind = _.filter(paramArr, function(item){return item.indexOf('SMSPROMO_MOBILE_NUMBER') >= 0;})[0];
          }
          var smsNumberIndex = _.indexOf(paramArr,smsNumberFind);
          var smsNumberArray = paramArr[smsNumberIndex].split('=');
          var smsNumber = smsNumberArray[1].toString();
          smsNumber = smsNumber.replace(/[^0-9]+/g, '');
          paramArr[smsNumberIndex] = "SMSPROMO_MOBILE_NUMBER="+smsNumber;

          paramStr = "";
          // Iterate through collection to transform form name/value into key/value properties of a literal object string.
          $.each(paramArr, function(index){
            paramStr += '"'+ this.split('=')[0] + '":"' + this.split('=')[1] + '",';
          });

          // Parse the string and create the literal object
          var params = eval("(" + "{"+paramStr.substring(0,(paramStr.length-1)).replace("undefined","").replace("%40","@")+"}" + ")");

          //Send the data via a json rpc call
          generic.jsonrpc.fetch({
            method : 'rpc.form',
            params: [params],
            onSuccess:function(jsonRpcResponse) {
              $.colorbox({html:smsSuccessNode.html()});
              smsErrorNode.addClass('hidden');
              smsInputNode.removeClass('error');
            },
            onFailure: function(jsonRpcResponse){           
              var error = jsonRpcResponse.getError();
              var errorText = error.data.messages[0].text;
              smsErrorNode.text(errorText).removeClass('hidden');
              smsInputNode.addClass('error');
            }
          });       
        });      
      });
    } 
  }; 

  Drupal.behaviors.smsFormV1 = {
    attach: function (context, settings) {
      site.sms.initSMSForm();
      if (generic.env.isIE8) {
         $('.sms-signup__terms .sms-signup__checkbox').next().addClass('smsnotcheckedlabel');
         $('.sms-signup__terms').on('click','.sms-signup__checkbox', function(e){
           if($(this).next().hasClass('smsnotcheckedlabel')) {
             $(this).next().removeClass('smsnotcheckedlabel').addClass('smscheckedlabel');
             $(this).attr('checked', true);
             $(this).next().parent().html($(this).next().parent().html());
           }
           else {
             $(this).next().removeClass('smscheckedlabel').addClass('smsnotcheckedlabel');
             $(this).removeAttr('checked');
             $(this).next().parent().html($(this).next().parent().html());
           }
         });
       }
    }
  };

})(jQuery);
;
var site = site || {};
site.account = site.account || {};
site.signin = site.signin || {};
site.userInfoCookie = site.userInfoCookie || {};
site.userInfoCookie.getValue = site.userInfoCookie.getValue || function() { return ''; };

(function ($) {
  Drupal.behaviors.signIn = {
    attach: function (context, settings) {
      Drupal.ELB.loadPersistenUserCookie();
      var signedIn = site.userInfoCookie.getValue('signed_in');
      var forceReturn = false;
      var returnURL = null;
      if (signedIn == '0') signedIn = false;


      // Determine if user has signed in before by looking at the persistent
      // user cookie.
      var persistentCookie = Drupal.ELB.getJSONCookie('persistent_user_cookie');
      var loyalty = persistentCookie.is_loyalty_member == "1";

      // @TODO: get email address too so we can put it in the input field
      var firstName = persistentCookie.first_name || '';
      firstName = firstName.replace(/\+/g, ' ');
      var firstTime = persistentCookie.first_time;
      var userDetected = !!firstName;

      // Show/hide registration/sign in links on Beaty Feed page based on user detection
      if (userDetected) {
        $('.bfeed-create-account').hide();
        $('.bfeed-sign-in').show();
      } else {
        $('.bfeed-create-account').show();
        $('.bfeed-sign-in').hide();
      }

      var $overlayTemplate = $('#signin-overlay-template', context);
      var overlayContent = $overlayTemplate.html();
      // replaced page-utilities__account-button with page-utilities__signin-text
      // 
      var $triggerButton = $('.page-utilities__signin-text, .js-launch-account, .field-mobile-menu .sign-in---my-account, .loyalty_join_signin .form-submit:last-child', context);

      // Determine the state of the overlay to show:
      var signInOverlayState = $.cookie('signInOverlayState', {path: '/'});
      // Delete the cookie immediately (apparently these are both needed?):
      $.cookie('signInOverlayState', null, {path: '/'});
      $.cookie('signInOverlayState', null);

      var isMobile = !$('body').hasClass('device-pc');
      var $signInPage = $('.sign-in-page', context);
      var isSignInPage = $signInPage.length;
      var colorboxSettings = {
        html: overlayContent,
        className: 'signin-overlay-wrapper signin-overlay-loyalty',
        width: '100%',
        height: '600px',
        maxWidth: '1022px',
        fixed: true
      };
      if (isMobile) {
        colorboxSettings.top = '0px';
        colorboxSettings.height = '1000px';
      }

      // User greeting and login/logout link below Account button
      // use with page_utilities_v1
      var userLoginState = $('.user-login-state');
      if( userLoginState.length ) {
          if ((signedIn || userDetected) && !isMobile) {
            var accountText = $('.page-utilities__account-text');
            $(accountText).show();
            // user is signed in or detected so show the sign out link
            $(accountText).find('.js-is_signed_in').removeClass('hidden');
            $('.page-utilities__signin-text').hide();
          } else {
            $('.page-utilities__signin-text').show();
            $('.page-utilities__account-text').hide();
          }
      }

      // use with page_utilities_loyalty_v1
      var userLoyaltyState = $('.user-loyalty-state');
      if( userLoyaltyState.length ) {
        if ((signedIn || userDetected) && !isMobile) {
          // check for loyalty
          if ( loyalty ) {
            // add the points/tier name to the global navigation under the user name
            var points = persistentCookie.points || 0;
            var levelName = persistentCookie.loyalty_level_name || '';
            levelName = levelName.replace(/\+/g, ' ');

            $(userLoyaltyState).find('.user-logged-in').find('.js-loyalty-points-value').html(points);
            $(userLoyaltyState).find('.user-logged-in').find('.js-loyalty-tier-name').html(levelName);

            // show points
            $('.user-logged-in').show();
            $('.user-logged-out').hide();
          } else {
            // show join link
            $('.user-logged-out').show();
            $('.user-logged-in').hide();
          }
        } else {
          // show join link
          $('.user-logged-out').show();
          $('.user-logged-in').hide();
        }

        // bind the click so when the user clicks 'join e-list' they are shown the popup to enroll
        $('.js-join-elist').click(function(event) {
          event.preventDefault();
          Drupal.behaviors.ELB_loyalty_offer.showSignupFormNow();
        });
      }

      function _launchOverlay(forceReturn, returnURL) {
        $.colorbox(colorboxSettings);

        var $overlay = $('.signin-overlay-wrapper .sign-in-component');

        // Redirect back to the current page
        // var returnURL = '?RETURN_URL=' + window.location.pathname;
        // Generally only registration sends you back to your last page, but
        // there are some cases where sign in can (ie. "Save to Profile" in the
        // Foundation Finder)
        if (forceReturn) {
          $('form', $overlay).each(function(){
            if (!$('input[name=RETURN_URL]', this).length) {
              $(this).append('<input type="hidden" name="RETURN_URL" value="" />');
            }
          });
        }
        returnURL = returnURL || window.location.pathname + window.location.search;

        $('input[name=RETURN_URL]', $overlay).val(returnURL);

        _initForm($overlay);

        // Init selectboxes for desktop:
        if (!isMobile) {
          $('.selectbox', $overlay).selectBox();
          // Apply global js text input behavior:
          Drupal.behaviors.formTextInputs.attach($('.signin-overlay-wrapper'));
        }
      }

      function triggerOverlay(event) {
        event.preventDefault();

        var forceReturn = $(this).hasClass('js-launch-account--return');
        var returnURL = forceReturn ? $(this).attr('data-return-url') : null;

        // If already signed in, this button works as a link to the account
        // landing.
        if (signedIn) {
          window.location = '/account/index.tmpl';
        }
        // If the form is already on the page, focus on the first element in it
        else if ($('.sign-in-component', context).length) {
          $('.sign-in-component', context).find('.form-text:visible').first().focus();
        } else {
          _launchOverlay(forceReturn, returnURL);
          if(generic.env.isIOS4) {
             popupScroll.destroy();
             popupScroll = null;
             popupScroll = new IScroll('#colorbox',  { mouseWheel: true });
             setTimeout( function(){
               popupScroll.refresh();
             }, 500 ) ;
          }
        }
      }

      function _initForm($wrapper) {
        $('.sign-in-component', $signInPage).show();
        var $registerForm = $('.sign-in-component__form--registration', $wrapper);
        var $registerConfirmForm = $('.sign-in-component__confirm--registration', $wrapper);
        var $signInForm = $('.sign-in-component__form--sign-in', $wrapper);
        var $showPass = $('input[name=SHOW_PASSWORD]', $wrapper);
        var $pass = $('input[type=password]', $registerForm);
        var $error_messages_list = $("ul.error_messages").find('li');

        // Set the appropriate class on the outer container to tell css what to
        // display. By default we show the registration
        // form, but if the overlay state cookie indicates we just registered or
        // signed in, we show the relevant confirmation screen instead. Finally,
        // if the user's ever logged in on this machine we display the sign in
        // form by default.

        // First off, if there's an error in the form, and we're trying to show
        // a confirmation page, go back a step:
        if (isSignInPage && $('input.error, select.error', $wrapper).length) {
          if (signInOverlayState == 'register-confirm') {
            signInOverlayState = 'register';
          } else if (signInOverlayState == 'signin-confirm') {
            signInOverlayState = 'signin';
          }
        }
    
        if(isSignInPage && $('#account_lockout\\.\\.').is(":visible")){
          if (signInOverlayState == 'signin-confirm') {
            signInOverlayState = 'signin';
          }
        }

        // Toggle the class:
        if (signInOverlayState == 'register' || signInOverlayState == null) {
          $wrapper.addClass('registration');
        } else if (signInOverlayState == 'register-confirm') {
          $wrapper.addClass('registration-confirmation');
        } else if (signInOverlayState == 'signin-confirm') {
          // $wrapper.addClass('sign-in-confirmation');
        } else if (signInOverlayState == 'signin' || userDetected) {
          $wrapper.addClass('sign-in');
        }

        // if user has registered before then show sign in form
        if ((firstTime == 0) && (signInOverlayState != 'register-confirm') && (userDetected)) {
          $wrapper.addClass('sign-in');
        }

        if(signInOverlayState == 'signin-confirm' && !loyalty) {
          $wrapper.addClass('signin-join-loyalty');
        }

        // Remove any stray error classes that may have ended up on the hidden forms:
        $('form:hidden', $wrapper).find('input.error, select.error').removeClass('error');

        // Preprocess the form:

        $pass.each(function(){
          $(this).after('<div class="visible-pass-wrapper"><input class="visible-pass form-text" type="text" style="display: none;" /></div>');
          if (!isMobile) {
            Drupal.behaviors.formTextInputs.attach($('.visible-pass-wrapper'));
          }
        });
        var $visiblePass = $('.visible-pass', $wrapper);

        // Add the user's first name to the sign in confirmation screen header:
        if (firstName) {
          var $signInConfirmHeader = $('.sign-in-component__confirm--sign-in .sign-in-component__header', $wrapper);
          $signInConfirmHeader.text($signInConfirmHeader.text().replace('first_name', firstName));
        }

        if ($('.sign-in-component__fpw-link', $wrapper).length >0){
          site.signin.forgotPassword({
            resetPassword: true,
            emailNode: $("input#sign-in-component__EMAIL_ADDRESS", $wrapper),
            errorListNode: $(".signin-block__lost-pass-text", $wrapper),
            forgotPasswordLink: $('#forgot-password', $wrapper),
            forgotPasswordNote: $('p#forgot_pw_note', $wrapper)
          });
        }

        // Bind events:

        $showPass.on('change', function(e) {
          var show = $(this).is(':checked');
          $visiblePass.add($pass).toggle();
          if (show) {
            $('.visible-pass', $wrapper).each(function(){
              $(this).val($(this).parent().prev().val()).trigger('blur');
            });
          } else {
            $pass.each(function(){
              $(this).val($(this).next().children().first().val()).trigger('blur');
            });
          }
        });

        // Prevent the sms form from submitting on the register-confirm overlay when the mobile number is blank
        if (signInOverlayState == 'register-confirm') {
          $('.sign-in-component__confirm-options, input[type=submit]').on('click', function() {
            var mobileNumber = $('#sign-in-component__SMSPROMO_MOBILE_NUMBER');
            if ( $(mobileNumber).attr('value') == '') {
              $('input[type=hidden], [name=_SECONDARY_SUBMIT], [value=sms]').remove();
            }
          });
        }

        if (signInOverlayState == 'signin-confirm') {
          // join loyalty
          $('.signin-loyalty-cta__button',$wrapper).click(function(event) {
            event.preventDefault();
            var params = {};
            params['_SUBMIT'] = 'loyalty_email_signup';
            params['LOYALTY_ACTIVE_FLAG'] = '1';
            params['PC_EMAIL_ADDRESS'] = site.userInfoCookie.getValue('email');
            params['PC_EMAIL_PROMOTIONS'] = '1';
            params['PC_EMAIL_PROMOTIONS_PRESENT'] = '1';
            params['ACCEPTED_LOYALTY_TERMS'] = '1';

            generic.jsonrpc.fetch({
              method: 'rpc.form',
              params: [params],
              onSuccess: function(jsonRpcResponse) {
                // send them to loyalty landing
                window.location.href = "/account/loyalty/index.tmpl";
              },
              onFailure: function(jsonRpcResponse) {
                // display error
                var errorObjectsArray = jsonRpcResponse.getMessages();
                var errListNode = $('#form--errors--loyalty-cta');
                generic.showErrors(errorObjectsArray, errListNode, $wrapper);
              }
            });
          });

          // no thanks
          $('.signin-loyalty-cta__link',$wrapper).click(function(event) {
            event.preventDefault();
            $.colorbox.close();
          });
        }
        
        $signInForm.add($registerForm).on('submit', function() {
          // Set the password field to what's in the visible password field if
          // show password is checked
          var showPass = $showPass.is(':checked');
          if (showPass) {
            $pass.each(function(){
              $(this).val($(this).next().children().first().val());
            });
          }

          // Set a cookie so we remember which form was submitted so we can
          // launch the relevant confirmation overlay on the next page load
          var cookieVal = $(this).hasClass('sign-in-component__form--sign-in') ? 'signin-confirm' : 'register-confirm';
          $.cookie('signInOverlayState', cookieVal, {path: '/'});

        });



        $('.signin-overlay__toggle-form a', $wrapper).on('click.signIn', function(event) {
          event.preventDefault();
          //$error_messages_list //not sure why this is here
          if($error_messages_list){ $error_messages_list.hide();}
          $wrapper.toggleClass('sign-in');
        });

        $('.sign-in-component__close', $wrapper).on('click.signIn', function(event) {
          event.preventDefault();
          $.colorbox.close();
          if (signInOverlayState == 'register-confirm' && signedIn) {
            $( '.my-feed-drawer .drawer-formatter__trigger').trigger('mouseover');
          }
        });

      } // /End initForm()

      $triggerButton.on( 'click.signIn', function(event) {
        triggerOverlay(event);
      });

      // Automatically launch the overlay if the cookie is set and we're not on
      // the dedicated sign in page.
      if (!isSignInPage) {
        // Disabling the sign in confirmation functionality since it was removed from the spec.
        // if ((signInOverlayState == 'register-confirm' || signInOverlayState == 'signin-confirm') && signedIn) {
        if (signInOverlayState == 'register-confirm' && signedIn) {
          colorboxSettings.className += " new-user-registration";
          _launchOverlay(forceReturn, returnURL);
        }

        // check loyalty
        if ( signInOverlayState == 'signin-confirm' && signedIn && !loyalty) {
          _launchOverlay(forceReturn, returnURL);
        }
      }

      // Run initForm directly on the context. This will only really be useful
      // for the sign in page, where the form is already embedded.
      _initForm($('.sign-in-component', context));

      // Ensure this script doesn't break site if perlgem isn't running:
      if (typeof site != 'undefined' && typeof site.userInfoCookie != 'undefined') {
        // enabling to use first_name placeholder in CMS
        var $template = $('.page-utilities__account-text');
        if(firstName.length){
          var rendered = Mustache.render( $template.html(), { first_name: firstName } );
          $template.html( rendered );
        }else{
          var $userGreating = $('.user-greeting__name',$template);
          $userGreating.html('');
        }
        // bind to the recogized sign in link in the gnav
        $('.js-is_detected').bind('click.signIn', function(event){ triggerOverlay(event); });
        // if user clicks on 'Sign out' link reset recognized user related cookies
        $('.sign-out-link').each(function(event) {
          var $signOutLink = $(this);
          var returnURL = window.location.pathname;
          var signOutURL = $signOutLink.attr('href');
          if (returnURL != "/checkout/confirm.tmpl") {
            signOutURL += '&success_url=' + returnURL;
          }
          $signOutLink.attr('href', signOutURL).on('click', function(event) {
            var domain = '.' + window.location.hostname.replace(/^.*(esteelauder\.)/,function(m, $1) { return $1; });
            var cookieObj = $.parseJSON($.cookie('persistent_user_cookie', { path: '/', domain: domain }));
            cookieObj.first_name = null;
            $.cookie('persistent_user_cookie', JSON.stringify(cookieObj), { path: '/', domain: domain });
            $.cookie("persistent_user_last_purchase", null, { path: '/' });
            $.cookie('expandMyFeedTray', 0, {path: '/'});
          });

        });
      }
    }
  };
})(jQuery);
;
var site = site || {};
site.account = site.account || {};
site.signin = site.signin || {};
site.userInfoCookie = site.userInfoCookie || {};
site.userInfoCookie.getValue = site.userInfoCookie.getValue || function() { return ''; };


(function ($) {
  Drupal.behaviors.restrictedLoyaltyPage = {
    attach: function (context, settings) {
      var self = this;
      self.validateLoyaltyUser();
      self._initForm($('.restricted-loyalty-sign-in-component'));
    },

    validateLoyaltyUser: function () {
      var self = this;

      var levelAccess = site.loyalty.checkLoyaltyPageAccess();

      if(levelAccess == 0) {
        // page has no restictions
        return;
      }

      var overlay = $('.restricted-loyalty-sign-in-component');
      var overlayTemplate = $('#loyalty-restricted-overlay-template');
      var overlayContent = overlayTemplate.html();
      var isMobile = !$('body').hasClass('device-pc');

      var colorboxSettings = {
          html: overlayContent,
          className: 'restricted-loyalty-signin-overlay-wrapper restricted-loyalty-signin-overlay-loyalty',
          width: '100%',
          height: '600px',
          maxWidth: '1022px',
          fixed: true,
          escKey: false,
          closeButton: false,
          overlayClose: false
        };
        if (isMobile) {
          colorboxSettings.top = '0px';
          colorboxSettings.height = '1000px';
      };

      $.colorbox(colorboxSettings);

      var signedIn = site.userInfoCookie.getValue('signed_in');
      if (signedIn == '0') signedIn = false;

      var loyalty = parseInt(site.userInfoCookie.getValue('is_loyalty_member'));
      var persistentCookie = Drupal.ELB.getJSONCookie('persistent_user_cookie');
      var currentLoyaltyLevel = persistentCookie.loyalty_level || 0;
      var firstName = persistentCookie.first_name || '';
      var userDetected = !!firstName;

      var args = {
        signedIn : signedIn,
        isLoyaltyMember : loyalty
      };

      var showOverlay = 1;

      // containers whose default state is hidden
      var hiddenContainers = [
        'js-loyalty-point-restriction',
        'js-loyalty-tier-restriction',
        'js-sign_in_text',
        'js-earn-more',
        'js-not-enrolled',
        'js-one-tier-away'
      ];

      // reset all containers back to their default state
      // this is to handle cases where we are revalidating after user state change
      $.each( hiddenContainers, function( index, value ) {
        $(overlay).find('.' + value).addClass('hidden');
      });

      // container that show form errors
      var errorContainers = [
        'form--errors--loyalty-restricted-signin',
        'form--errors--loyalty-cta'
      ];

      // reset errors
      // this is to handle cases where we are revalidating after user state change
      $.each( errorContainers, function( index, value ) {
        $('#' + value).html();
      });

      // user is signed in or detected and a loyalty member so check if they have access
      if ( !signedIn || ((signedIn || userDetected) && loyalty) ) {
        //console.log('user is not signed in or they are a detected loyalty person');
        var points = persistentCookie.points || 0;
        var pointsNeededUntilNextLevel = persistentCookie.points_to_next_level || 50;

        //console.log('we need to be level ' + levelAccess);
        //console.log('currentLoyaltyLevel is ' + currentLoyaltyLevel);
        // 6.1.1 Restricted Page by points
        // 6.1.2 Restricted Page by tier
        if(levelAccess > currentLoyaltyLevel) {
          var loyaltyDiff = levelAccess - currentLoyaltyLevel;
          //console.log('we dont have access to this page - trigger popup');
          // tell the user they need to be a certain tier
          // 6.1.3 Restricted Page - Error Message - Already Member
          if(loyaltyDiff > 1) {
            //console.log('page only accessible to level ' + levelAccess + ' members');
            args['levelAccess'] = levelAccess;
          }
          // show the user how close they are to accessing this page
          // 6.1.5 Restricted Page - Only One Tier Away
          else {
            //console.log('pointsNeededUntilNextLevel is ' + pointsNeededUntilNextLevel);
            args['pointsNeededUntilNextLevel'] = pointsNeededUntilNextLevel;
          }
        }
        // dont show the user the overlay because they validated ok
        else {
          //console.log('we are ok to see this page');
          $.colorbox.close();
          showOverlay = 0;
        }
      }
      // show them the popup that allows them to join elist
      // 6.1.4 Restricted Page - Error Message
      else if (signedIn && !loyalty) {
        //console.log('show popup to join elist');
        args['join_elist'] = 1;
        args['levelAccess'] = levelAccess;
      }

      // show the overlay to user
      if(showOverlay) {
        //console.log('showOverlay is ' + showOverlay );
        self._launchOverlay(args);
      }
    },

    _launchOverlay: function(args) {
      var self = this;
      var overlay = $('.restricted-loyalty-sign-in-component');

      var signedIn = args.signedIn;
      var levelAccess = args.levelAccess || 0;
      var pointsNeeded = args.pointsNeededUntilNextLevel || 0;
      var isLoyaltyMember = args.isLoyaltyMember;

      var signin = $(overlay).find('.js-retricted-signin-form-container');
      var signInText = $(overlay).find('.js-sign_in_text');
      var pointRestrictionMsg = $(overlay).find('.js-loyalty-point-restriction');
      var tierRestrictionMsg = $(overlay).find('.js-loyalty-tier-restriction');
      var earnMore = $(overlay).find('.js-earn-more');
      var notEnrolled = $(overlay).find('.js-not-enrolled');
      var oneTierAway = $(overlay).find('.js-one-tier-away');

      // find and replace content with loyalty details
      $(overlay).find('.js-points').html(pointsNeeded);
      $(overlay).find('.js-elist-level').html(levelAccess);

      // hide the signin form if the user is signed in
      if(signedIn) {
        $(signin).addClass('hidden');
      }

      // user is not signed in
      // show signin text in conjunction with other messaging
      if(!signedIn) {
        $(signInText).removeClass('hidden');
        if(levelAccess) {
          $(tierRestrictionMsg).removeClass('hidden');
        }
        else if(pointsNeeded) {
          $(pointRestrictionMsg).removeClass('hidden');
        }
      }

      // 6.1.4 Restricted Page - Error Message - Not Member
      else if(signedIn && !isLoyaltyMember) {
        //console.log('notEnrolled + tierRestrictionMsg');
        $(notEnrolled).removeClass('hidden');
      }

      // 6.1.1 Restricted Page - Restricted By Tier
    //   6.1.3 Restricted Page - Error Message - Already Member
      else if(levelAccess) {
        $(earnMore).removeClass('hidden');
        //console.log('notEnrolled + levelAccess');
      }

      // 6.1.2 Restricted Page - Restricted By Points
      // 6.1.5 Restricted Page - Only One Tier Away
      else if(pointsNeeded) {
        //console.log('pointsNeeded + pointRestrictionMsg');
        if(signedIn) {
          $(oneTierAway).removeClass('hidden');
        }
      }

      var returnURL = returnURL || window.location.pathname + window.location.search;
      $('input[name=RETURN_URL]', $(overlay)).val(returnURL);

      // Init selectboxes for desktop:
      var isMobile = !$('body').hasClass('device-pc');
      if (!isMobile) {
        $('.selectbox', $(overlay)).selectBox();
        // Apply global js text input behavior:
        Drupal.behaviors.formTextInputs.attach($('.signin-overlay-wrapper'));
      }

      $(overlay).show();
    },

    _initForm: function($wrapper) {
      var self = this;

      if ($('.sign-in-component__fpw-link', $wrapper).length > 0){
        site.signin.forgotPassword({
          resetPassword: true,
          emailNode: $("input#sign-in-component__EMAIL_ADDRESS", $wrapper),
          errorListNode: $(".signin-block__lost-pass-text", $wrapper),
          forgotPasswordLink: $('#forgot-password', $wrapper),
          forgotPasswordNote: $('p#forgot_pw_note', $wrapper)
        });
      }

      // bind join loyalty form
      $('.js-loyalty-cta__button',$wrapper).click(function(event) {
        event.preventDefault();
        var params = {};
        params['_SUBMIT'] = 'loyalty_join';
        params['LOYALTY_ACTIVE_FLAG'] = '1';
        params['ACCEPTED_LOYALTY_TERMS'] = '1';

        generic.jsonrpc.fetch({
          method: 'rpc.form',
          params: [params],
          onSuccess: function(jsonRpcResponse) {
            var data = jsonRpcResponse.getData();
            loyalty = data.userinfo.is_loyalty_member;
            currentLoyaltyLevel = data.userinfo.loyalty_level;
            // revalidate user info
            self.validateLoyaltyUser();
          },
          onFailure: function(jsonRpcResponse) {
            // display error
            var errorObjectsArray = jsonRpcResponse.getMessages();
            var errListNode = $('#form--errors--loyalty-cta');
            generic.showErrors(errorObjectsArray, errListNode, $wrapper);
          }
        });
      });

      // bind signin form
      $('.js-restricted-loyalty-signin__button', $wrapper).click(function(event) {
        event.preventDefault();
        var params = {};
        params['_SUBMIT'] = 'signin';
        params['EMAIL_ADDRESS'] = $wrapper.find('#restricted-loyalty-sign-in-component__EMAIL_ADDRESS').val();
        params['PASSWORD'] = $wrapper.find('#restricted-loyalty-sign-in-component__PASSWORD').val();

        generic.jsonrpc.fetch({
          method: 'rpc.form',
          params: [params],
          onSuccess: function(jsonRpcResponse) {
            var data = jsonRpcResponse.getData();
            site.userInfoCookie.init();
            Drupal.ELB.loadPersistenUserCookie();
            self.validateLoyaltyUser();
          },
          onFailure: function(jsonRpcResponse) {
            // display error
            var errorObjectsArray = jsonRpcResponse.getMessages();
            var errListNode = $('#form--errors--loyalty-restricted-signin');
            generic.showErrors(errorObjectsArray, errListNode, $wrapper);
          }
        });
      });
    }
  };
})(jQuery);
;
(function($) {

Drupal.behaviors.ELB_BeautyChat = {
  attach: function(context, settings) {
    var $tray = $('.beauty-chat-tray', context);
    var site = site || {};
    // @TODO: need to connect to 3rd party chat service
    site.beautyChatAvailable = site.beautyChatAvailable || true;

    $tray.toggleClass('beauty-chat-tray--unavailable', !site.beautyChatAvailable);

    $('.beauty-chat-drawer .drawer-formatter__trigger', context).on('click', function() {
	  lpMTagConfig.delegate.prechatWindow();
	});
  }
};

})(jQuery);
;
(function($) {

Drupal.behaviors.ELB_MyFeed_Loyalty = {
  attach: function(context, settings) {

    // loyalty
    var $container  = $('.my-feed-tray--loyalty');
    $container.closest('.drawer-formatter__content').css('min-height','auto');
    var persistentCookie = Drupal.ELB.getJSONCookie('persistent_user_cookie');
    // console.log('/// persistentCookie ///');
    // console.log(persistentCookie);
    var newsletterOptin = persistentCookie.pc_email_optin - 0;
    var hasLoyalty = persistentCookie.is_loyalty_member - 0;
    var signedIn = site.userInfoCookie.getValue('signed_in') - 0;
    if ( hasLoyalty ) {
      $container.removeClass('anon');
      $container.addClass('auth loyal');
      var points = persistentCookie.points || 0;
      var pointsClass = 'my-feed-tray--' + points;
      var level = persistentCookie.loyalty_level || 1;
      var levelClass= 'level__' + level;
      var levelName = persistentCookie.loyalty_level_name || '';
      levelName = levelName.replace(/\+/g,' ');
      var nextLevelPoints = persistentCookie.points_to_next_level || 0;
      var nextLevel = persistentCookie.next_level || 2;
      var nextLevelName = persistentCookie.next_level_name || '';
      nextLevelName = nextLevelName.replace(/\+/g,' ');
      var levelSeparator = $container.find('.level-separator').html() + ' ';
      var levelText = $container.find('.level-text--2').html() + ' ';
      var levelDisplay = level + levelSeparator + levelName;
      var nextLevelDisplay = levelText + nextLevel + levelSeparator + nextLevelName;
      var firstName = persistentCookie.first_name || '';
      firstName = firstName.replace(/\+/g, ' ');

      $container.addClass(levelClass);
      $container.addClass(pointsClass);
      $container.find('.first-name').html('&nbsp;' + firstName);
      $container.find('.point-value').html(points);
      $container.find('.current-level').html(levelDisplay);
      $container.find('.next-level').html(nextLevelDisplay);

      if (nextLevelPoints && nextLevelPoints > 0) {
        $container.find('.next-level-points').html(nextLevelPoints);
      } else {
        $container.find('.my-feed-loyalty__status-next').hide();
      }
    } else if ( signedIn ) {
      $container.removeClass('anon');
      $container.addClass('auth');
    }

    var $newsletterCheckbox = $('.my-feed-loyalty__checkbox-container',$container);
    if(newsletterOptin){
      $newsletterCheckbox.hide();
      $container.addClass('my-feed-tray--newsletter');
    }

    var loyaltyFeedForm = $('#my-feed-loyalty__form');
    $(loyaltyFeedForm).find('.js-my-feed-loyalty__form-submit').bind('click', function(e){
      e.preventDefault();

      // we want to get all the fields in the form because 'serialize' encodes potentially bad emails and decode doesn't decode characters like '+' properly
      var fields = [
        'PC_EMAIL_ADDRESS',
        'LOYALTY_ACTIVE_FLAG',
        'ACCEPTED_LOYALTY_TERMS',
        'PC_EMAIL_PROMOTIONS',
        'PC_EMAIL_PROMOTIONS_PRESENT',
        '_SUBMIT'
      ];

      var paramObj = {};

      // loop through all the fields and get the values
      $.each(fields, function(index, value){
          var formField = $("#my-feed-loyalty__form input[name=" + value + "]");

          // for the unchecked PC_EMAIL_PROMOTIONS we want to send empty strings to backend for processing
          if(value == "PC_EMAIL_PROMOTIONS" && formField.is(':checkbox') && !formField.prop('checked')) {
              //paramObj[value] = '';
              paramObj[value] = 0;
          }

          else {
              paramObj[value] = formField.val();
          }
      });

      generic.jsonrpc.fetch({
        method: 'rpc.form',
        params: [paramObj],
        onSuccess: function(jsonRpcResponse) {
          $(document).triggerHandler('email_signup.success', [jsonRpcResponse]);
        },
        onFailure: function(jsonRpcResponse) {
          var errorObjectsArray = jsonRpcResponse.getMessages();
          var errListNode = $('#form--errors--my-feed-loyalty__form');
          generic.showErrors(errorObjectsArray, errListNode, loyaltyFeedForm);
        }
      });
    });

    // already logged in
    var $joinBtn = $('.loyalty-offer__join',$container);
    $joinBtn.click(function(event) {
      event.preventDefault();
      var params = {};
      params['_SUBMIT'] = 'loyalty_join';
      params['LOYALTY_ACTIVE_FLAG'] = '1';

      generic.jsonrpc.fetch({
        method: 'rpc.form',
        params: [params],
        onSuccess: function(jsonRpcResponse) {
          // send them to loyalty landing
          //window.location.href = "/account/loyalty/index.tmpl"
          $(document).triggerHandler('email_signup.success', [jsonRpcResponse]);
        },
        onFailure: function(jsonRpcResponse) {
          // display error
          console.log('error in joining');
        }
      });
    });


    var $authTray = $('.my-feed-tray__auth', context);
    if (!$authTray.length) return;

    var $trigger = $( '.my-feed-drawer .drawer-formatter__trigger', context );
    $trigger.on('click', function() {
      var myWindow = window.open("/account/beauty_feed.tmpl", "_self");
    });

    // Sign out link returns you to current page and expands special offers (see
    // special_offers.js for cookie handling)

    // Drawers need to be initialized before we can bind events to them:
    site.drawers.init(context);


    // USE TO SHOW HIDE ANON/AUTH
    // if (typeof site != 'undefined' && typeof site.userInfoCookie != 'undefined') {
    //   var firstName = site.userInfoCookie.getValue('first_name') || persistentCookie.first_name;
    //   var firstTime = !!persistentCookie.first_time;
    //   if (!firstName) return;
    //   // must have first name (logged on? or just persistant) and not be first time
    //   if (!firstTime) {
    //     $('.my-feed-tray__anon', context).hide();
    //     $('.my-feed-tray__auth', context).show();
    //   }
    //   var $template = $('.my-feed-summary--auth'); //grab section
    //   var rendered = Mustache.render( $template.html(), { first_name: firstName } ); //insert name
    //   $template.html( rendered ); // re-render
    // }

  }
};

})(jQuery);
;
(function($) {
window.site = site || {};
site.drawers = site.drawers || {};

site.drawers.$formatters = $();
site.drawers.$closeButtons = $();

site.drawers.animationSpeed = 300;
site.drawers.mouseOutDelay = 800;
site.drawers.drawerOpen = false;
site.drawers.waited = false;
site.drawers.waiting = false;
site.drawers.isOver = false;
site.drawers.keepOpen = false;

var initialized = false;

site.drawers.init = function(context) {
  // Only run once
  if (initialized) {
    return;
  }
  initialized = true;
  site.drawers.$formatters = $('.drawer-formatter', context);
  site.drawers.$closeButtons = $('.drawer-formatter__close', site.drawers.$formatters);
  site.drawers.$container = $('.drawer-container', context);

  function _mouseMove(event, over) {
    site.drawers.isOver = over === true || false;
    // Don't bother with any of this if the drawer is closed
    if (!site.drawers.drawerOpen || site.drawers.keepOpen) return;

    if (event) {
      site.drawers.isOver = !!$(event.target).closest('.drawer-container').length;
    }

    if (!site.drawers.waiting && !site.drawers.waited) {
      // Set a delay before we check the cursor again
      site.drawers.waiting = true;
      setTimeout(function() {
        site.drawers.waited = true;
        site.drawers.waiting = false;
        _mouseMove(false, site.drawers.isOver);
      }, site.drawers.mouseOutDelay);
    } else if (site.drawers.waited) {
      if (!site.drawers.isOver) { // If we're still not over the container, close it
        _close();
      }
      site.drawers.waited = false;
    }
  }

  function _close(event) {
    if (typeof event != 'undefined') event.preventDefault();

    site.drawers.close();
  }

  site.drawers.$formatters.each(function() {
    var $formatter = $(this);
    var $pane = $('.drawer-formatter__content', $formatter);
    var $trigger = $('.drawer-formatter__trigger', $formatter);
    var hidePane = $pane.is(':hidden');
    var paneHeight = $pane.show().height();
    
    $pane.data('paneHeight', paneHeight);

    function _mouseOver(event) {
      var speed = site.drawers.drawerOpen ? 0 : site.drawers.animationSpeed;
      site.drawers.open($(this), $pane, speed);
    }

    $trigger.on('mouseover', _mouseOver);

    if (hidePane) {
      $pane.hide();
    } else {
      site.drawers.drawerOpen = true;
    }

    if (site.drawers.$container.length) {
      site.drawers.$container.append($pane);
    } else {
      site.drawers.$container = $formatter.addClass('drawer-container');
    }

  });

  $('body', context).on('mousemove', _mouseMove);
  site.drawers.$closeButtons.on('click', _close);
};

site.drawers.open = function($trigger, $pane, speed, keepOpen) {
  if (site.drawers.drawerOpen) {
    $pane.siblings('.drawer-formatter__content').hide().css('top', 0);
  }
  site.drawers.drawerOpen = true;
  $pane.stop().show().data('paneHeight', $pane.find('> div').height());
  $pane.stop().show().animate({ top: -$pane.data('paneHeight') }, speed);
  $('.drawer-formatter__trigger', site.drawers.$container).removeClass('active');
  $trigger.addClass('active');
  this.keepOpen = !!keepOpen;
  site.drawers.lastPaneOpen = $pane;
  site.drawers.lastSpeed = speed;
};

$(window).on("orientationchange",function(){
    if(site.drawers.drawerOpen) {
        site.drawers.lastPaneOpen.stop().show().data('paneHeight', site.drawers.lastPaneOpen.find('> div').height());
        site.drawers.lastPaneOpen.stop().show().animate({ top: -site.drawers.lastPaneOpen.data('paneHeight') }, site.drawers.lastSpeed);
    }
});

site.drawers.close = function($pane) {
  if (typeof $pane == 'undefined') $pane = $('.drawer-formatter__content:visible');
  if (!$pane.is(':visible')) return;
  site.drawers.drawerOpen = false;
  site.drawers.keepOpen = false;
  $pane.stop().animate({ top: 0 }, site.drawers.animationSpeed, function() {
    $pane.hide();
  });
  $('.drawer-formatter__trigger').removeClass('active');
};

  /**
   * Generic behaviors for footer drawers
   */
  Drupal.behaviors.ELB_Drawers = {
    attach: function(context, settings) {
      site.drawers.init(context);
    }
  };

})(jQuery);
;
