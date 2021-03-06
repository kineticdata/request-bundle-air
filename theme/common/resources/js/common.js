$(document).ready(function() {
    $('header.contentHeader ul.headerNav li.mobileChoice form label input[type="checkbox"]').on('click', function() {
        $(this).parent().parent().submit();
    });
    // Some Default states for dom elements
    $('.infield').inFieldLabels();
});

// This jQuery method can be used to check the existance of dom elements
jQuery.fn.exists = function() {
    return this.length > 0;
} 

/**
* StickyElement will make an element fixed based on the scroll position and parameters provided.
* It also will return the element back to it's static position based on the scroll position and parameters provided.
* 
* @param selector string
* @param topOffSet int
* @param heightControlModifier int
* @param marginTopFixed string
* @param marginTopStatic string
* @param marginLeftFixed string
* @param marginLeftStatic string
* @author Andre Crouch
*/
function stickyElement(selector, topOffSet, heightControlModifier, marginTopFixed, marginTopStatic, marginLeftFixed, marginLeftStatic) {
   var obj = $(selector);
   $(window).scroll(function() {
       /**
        * So here's the deal, if your browser window is too small, the sticky elements displays improperly.
        * The scroll also acts very glithcy when the window is positioned so there is a minimal amount of scroll required.
        * So to solve for these problems we need to know the total height of the sticky element
        * The if statement checks if the total height is larger than the window height.
        * If that's the case, the sticky object remains static.
        */
       if(obj.height() + heightControlModifier >= $(window).height()) {
           obj.css({
               marginTop: marginTopStatic,
               marginLeft: marginLeftStatic,
               position: 'static'
           });
       } else {
           var scrollTop = $(window).scrollTop();
           if (scrollTop < topOffSet){
               obj.css({
                   marginTop: marginTopStatic,
                   marginLeft: marginLeftStatic,
                   position: 'static'
               });
           }
           if (scrollTop >= topOffSet){

               obj.css({
                   marginTop: marginTopFixed,
                   marginLeft: marginLeftFixed,
                   position: 'fixed'
               });
           }
       }
   });    
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
 * Live jQuery hover function used to display specific behavior when a user hovers over dhildren selector.
 * The parent slector of the children are quired for the even to be live.
 * @param parentSelector string
 * @param childSelector string
 * @param mouseEnter function
 * @param mouseLeave function
 */
function hover(parentSelector, childSelector, mouseEnter, mouseLeave) {
    $(parentSelector).on({
        mouseenter: function() {
            if(mouseEnter != null) {
                mouseEnter(this);
            }
        },
        mouseleave: function() {
            if(mouseLeave != null) {
                mouseLeave(this);
            }
        }
    }, childSelector);
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
 * @param loadingMsg string
 * @param width string
 */
function blockUICustom(loadingMsg, width) {
    jQuery.blockUI({ 
        message: loadingMsg,
        showOverlay: true, 
        centerY: true,
        centerX: true,
        baseZ: 10000,
        css: {
            width: width,
            border: 'none', 
            padding: '5px', 
            backgroundColor: '#000000', 
            '-moz-border-radius': '5px',
            '-webkit-border-radius': '5px',
            '-khtml-border-radius': '5px',
            'border-radius': '5px',
            opacity: .6, 
            color: '#FFFFFF'
        }
    });
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
 * Ajax Class
 */
function Ajax() {
   'use strict';

    /**
     * @var string private
     */
    var ajaxSelector = new String();

    /**
     * @var object private
     */
    var options = {};

    /**
     * @param selector
     * @return Ajax
     */
    this.setAjaxSelector = function(selector) {
        ajaxSelector = selector;
        return this;
    }

    /**
     * @param object
     * @return Ajax
     */
    this.setOptions = function(ajaxOptions) {
        options = ajaxOptions;
        return this;
    }

    /**
     * @return Ajax
     */
    this.makeRequest = function() {
        if(ajaxSelector == null) {
             $(selector).ajax(options);
         } else {
            $.ajax(options);
         }      
        return this;
    }
}

/**
 * Message class
 */
function Message() {
    'use strict';

    /**
     * @var string private
     */
    var message = new String();

    /**
     * @param msg
     * @return Message
     */
    this.setMessage = function(msg) {
        message = msg;
        return this;
    }

    /**
     * @return error message
     */
    this.getErrorMessage = function() {
        return '<div class="message alert alert-error"><a class="close" data-dismiss="alert">x</a>'+message+'</div>';
    }

    /**
     * @return success message
     */
    this.getSuccessMessage = function() {
        return '<div class="message alert alert-success"><a class="close" data-dismiss="alert">x</a>'+message+'</div>';
    }

    /**
     * @return info message
     */
    this.getWarningMessage = function() {
        return '<div class="message alert alert-info"><a class="close" data-dismiss="alert">x</a>'+message+'</div>';
    }
}

/**
 * DialogInitializer Class
 */
function DialogInitializer() {
    'use strict';

    /**
     * @var function private
     */
    var openAction = function(){};

    /**
     * @var function private
     */
    var beforeCloseAction = function(){};

    /**
     * @var function private
     */
    var closeAction = function(){};

    /**
     * @var string private
     */
    var dialogSelector = new String();

    /**
     * @var string private
     */
    var title = new String();

     /**
     * @var string private
     */
    var width = 0;

    /**
     * @param element
     * @return DialogInitializer
     */
    this.setDialogSelector = function(element) {
        dialogSelector = element;
        return this;
    }

    /**
     * @param dialogTitle
     * @return DialogInitializer
     */
    this.setDialogTitle = function(dialogTitle) {
        title = dialogTitle;
        return this;
    }

    /**
     * @param dialogWidth
     * @return DialogInitializer
     */
    this.setDialogWidth = function(dialogWidth) {
        width = dialogWidth;
        return this;
    }

    /**
     * @param openFunction
     * @return DialogInitializer
     */
    this.setOpenAction = function(openFunction) {
        openAction = openFunction;
        return this;
    }

   /**
     * @param beforeCloseFunction
     * @return DialogInitializer
     */
    this.setBeforeCloseAction = function(beforeCloseFunction) {
        beforeCloseAction = beforeCloseFunction;
        return this;
    }

    /**
     * @param closeFunction
     * @return DialogInitializer
     */
    this.setCloseAction = function(closeFunction) {
        closeAction = closeFunction;
        return this;
    }

    /**
     * @return DialogInitializer
     */
    this.closeDialog = function() {
        $(dialogSelector).dialog('close');
        return this;
    }

    /**
     * @return DialogInitializer
     */
    this.startDialog = function() {
        jQuery(dialogSelector).dialog({
            title: title,
            resizable: false,
            draggable: false,
            modal: true,
            closeOnEscape: true,
            closeText: '',
            position:['middle', 240],
            width: width,
            show: 'fade',
            hide: 'fade',
            dialogClass:'dev_dialog',
            minHeight: 0,
            zIndex: 10000,
            open: openAction,
            close: closeAction
        });
        return this;
    }
}

/**
 * TabsInitializer Class
 */
function TabsInitializer() {
    'use strict';

    /**
     * @var function private
     */
    var createAction = function(){};

    /**
     * @var function private
     */
    var selectAction = function(){};

    /**
     * @var string private
     */
    var tabsSelector = new String();

    /**
     * @var int private
     */
    var selectedTab = 0;

    /**
     * @param element
     * @return TabsInitializer
     */
    this.setTabsSelector = function(element) {
        tabsSelector = element;
        return this;
    }

    /**
     * @param createFunction
     * @return TabsInitializer
     */
    this.setCreateAction = function(createFunction) {
        createAction = createFunction;
        return this;
    }

    /**
     * @param selectFunction
     * @return TabsInitializer
     */
    this.setSelectAction = function(selectFunction) {
        selectAction = selectFunction;
        return this;
    }

    /**
     * @param selected int
     * @return TabsInitializer
     */
    this.setSelectedTab = function(selected) {
        selectedTab = selected;
        return this;
    }

    /**
     * @return TabsInitializer
     */
    this.startTabs = function() {
        jQuery(tabsSelector).tabs({
            selected: selectedTab,
            create: function(event, ui) {
                // ui.index is undefined, this little hax fixes that problem
                ui.index = selectedTab;
                createAction(this, event, ui);
            },
            select: function(event, ui) {
                selectAction(this, event, ui);
            }
        });
        return this;
    }
}