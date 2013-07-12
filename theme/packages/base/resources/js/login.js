/*
 * When the page loads, use jQuery infield label and focus username. Note that
 * infield labels uses class 'infield' and the id of the input element set focus is 'UserName' in the login.jsp.
 */
$(document).ready(function() {
	// Check if plugin exists (does not exist in mobile mode)
	if($().inFieldLabels) {
		$('.infield').inFieldLabels();
	}
    $('#UserName').focus();
    $('#loginSubmit').on('click', function(event) {
        // This will try to remove alert whether it is there or not so loader will take it's place.
        $('.alert').remove();
        // This will display the loader.
        $('#loader.hidden').show().css({'visibility':'visible'});
    });
});