/**
 * Displays messages to div above template button layer
 * alert box.  This gives the benefit of displaying HTML formatted strings.
 * @method alertPanel
 * @private
 * @param {Object} options Defines the text information to display
 *     header: {String} The text to diaplay in the Panel header
 *     body:   {String} The text to display in the Panel body
 *     element: {HTMLElement} A form field to set the focus to on close
 * @return void
 */
KD.utils.ClientManager.alertPanel = function (options) {
    if (options == null) {
        options = {
            header: 'Alert',
            body: '',
            element: null
        };
    }
    if($('div.warningContainer').exists()) {
            $('div.warningTitle').replaceWith(options.body);
    } else {
        $('div.templateButtonLayer').before('<div class="warningContainer">' + options.body + '</div>');
    }
};