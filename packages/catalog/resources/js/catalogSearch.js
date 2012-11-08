$(document).ready(function() {
    // Click event for search
    $('#catalogSearchForm').on('submit', function(event) {
        // Prevent default action.
        event.preventDefault();
        // Execute the ajax request.
        BUNDLE.ajax({
            cache: false,
            type: $(this).attr('method'),
            data: $(this).serialize(),
            url: $(this).attr('action'),
            beforeSend: function(jqXHR, settings) {
                before(jqXHR, settings);
            },
            success: function(data, textStatus, jqXHR) {
                success(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                error(jqXHR, textStatus, errorThrown);
            }
        });
    });

    // Set search results
    var searchResults = '#searchResults';
    /**
     * Action functions for catalog search
     */
    function before(jqXHR, settings) {
        blockUICustom('<h1>Loading...</h1>', '300px');
        // Retrieve the search value from the search input
        var searchValue = $('input[name="query"]').val();
        $('.searchValue').text(searchValue);
        $('#catalogContainer').hide();
        $('#breadCrumbRoot').nextAll().remove();
        $('.breadCrumbArrow').remove();
        $('#breadCrumbRoot').append('<span class="breadCrumbArrow">></span>');
        $('#catalogBreadCrumbs').append($('#breadCrumbSearchResults').html());      
        // Blank validation
        if(!searchValue) {
            // Fail abort request
            jqXHR.abort();
            // Focus on input
            $('input[name="query"]').focus();
            // Message
            $(searchResults).html('<div class="message alert alert-error"><a class="close" data-dismiss="alert">x</a> Search field required!</div>').show();
            $.unblockUI();
        }    
    }

    function success(data, textStatus, jqXHR) {
        if(data) {
            $(searchResults).html(data).show();
            $.unblockUI();
        }
    }

    function error(jqXHR, textStatus, errorThrown) {
        $(searchResults).html('<div class="message alert alert-error"><a class="close" data-dismiss="alert">x</a> There was an error. Try again.</div>').show();
        $.unblockUI();
    }
});