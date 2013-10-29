$(document).ready(function() {
    // Mobile navigation
    var firstToggleClick = true;
    $('[data-toggle="collapse"]').on('click', function(event) {
        event.stopImmediatePropagation();
        if(firstToggleClick) {
            firstToggleClick = false;
            startMobileNavigation('#mobile-slide', '#'+$(this).data('target'))
        } else {
            firstToggleClick = true;
            resetDisplay('#mobile-slide', '#'+$(this).data('target'));
        }
    });
    $('#mobile-slide').on('click', function(event) {     
        if(!firstToggleClick && $(window).width() < 979) {
            event.preventDefault();
            event.stopImmediatePropagation();
            firstToggleClick = true;
            resetDisplay(this, '#'+$(this).data('target')); 
        }
    });
});

// This jQuery method can be used to check the existance of dom elements
jQuery.fn.exists = function() {
    return this.length > 0;
} 

// This will load a little faster if we keep it out of document ready
if (navigator.userAgent.indexOf('iPhone') != -1 || navigator.userAgent.indexOf('Android') != -1) {
    addEventListener("load", function() {
            setTimeout(hideURLbar, 0);
    }, false);
}

// Hides the url bar inside mobile devices
function hideURLbar() {
    if (window.location.hash.indexOf('#') == -1) {
        window.scrollTo(0, 1);
    }
}

/**
 * @param email string
 * @param displaySelector string
 */
function gravatar(email, displaySelector) {
    var lowercaseEmail = email.toLocaleLowerCase();
    var md5 = $.md5(lowercaseEmail);
    var gravatarHtml = '<img src="https://secure.gravatar.com/avatar/'+md5+'" />';
    $(displaySelector).html(gravatarHtml);
}

/**
 * @return object url parameters
 */
function getUrlParameters() {
  var searchString = window.location.search.substring(1)
    , params = searchString.split("&")
    , hash = {}
    ;

  for (var i = 0; i < params.length; i++) {
    var val = params[i].split("=");
    hash[unescape(val[0])] = unescape(val[1]);
  }
  return hash;
}

/**
 * @param obj object
 * IE ONLY - used with the styles "preRequiredLabel
 * Example: *.preRequiredLabel { zoom: expression(setIE7PreRequired(this)); }
 */
setIE7PreRequired = function(obj) {
    if(jQuery(obj).hasClass('preRequiredLabel')) {
        if(obj.innerHTML.indexOf("*")==-1) {
            jQuery(obj).prepend("*");
        }
    }
}


/**
 * @param contentWrap selector
 * @param menuWrap selector
 * @return void
 */
function startMobileNavigation(contentWrap, menuWrap) {
    $(contentWrap).css({'position':'fixed', 'top':'0', 'min-width':'480px', 'bottom':'0', 'right':'0', 'left':'240px', 'background-color': 'white'});
    $('html').css({'overflow-x':'hidden'});
    $('body').css({'background-color':'#262626;'});
    $(menuWrap).show();
}
/**
 * @param contentWrap selector
 * @param menuWrap selector
 * @return void
 */
function resetDisplay(contentWrap, menuWrap) {
    $(contentWrap).css({'position':'static', 'left':'0', 'width':'auto', 'min-width':'0'});
    $('html').css({'overflow-x':'auto'});
    $('body').css({'background-color':'#FFFFFF;'});
    $(menuWrap).hide();
}