$(document).ready(function() {
    // Page load events
    $('#preview').html($('#portalRequestContent').html());
    $('ul#categoriesNav').html($('#rootCategories').html());
    
    /* This jQuery unobtrusive on click event displays the menus */
    $('ul#categoriesNav').on('click', '.category', function() {
        // Clear previews
        $('#preview').empty();
        // Get current clicked category id and name
        var categoryId =  $(this).data('id');
        var categoryName =  $(this).data('name');
        // Find category's children and get the html
        var currentSubcategories = $('#'+categoryId).find('.subcategories').html();
        // Display the category's children into div
        if(currentSubcategories) {
            $('ul#categoriesNav').html(currentSubcategories);
        } else {
            $('ul#categoriesNav').html('');
        }
        // Find category's templates and get the html
        var currentTemplates = $('#'+categoryId).find('.templates').html();
         // Display the category's templates into div
        $('ul#templatesNav').html(currentTemplates);
        // Add arrow to the last bread crumbs child before we append new category bread crumb
        $('ul#catalogBreadCrumbs').append('<li class="breadCrumbArrow">></li>'); 
        // Create new bread crumb with the category's details
        var breadCrumb = '<li class="breadCrumb" data-id="'+categoryId+'" data-name="'+categoryName+'">'+categoryName+'</li>';
        // Append new bread crumb to current list of bread crumbs
        $('ul#catalogBreadCrumbs').append(breadCrumb);
        // Set divider
        setNavDivider();
        // Get description
        getDescription(this);
    });
    
    /* This jQuery unobtrusive on click event displays template descriptions */
    $('ul#templatesNav').on('click', '.template', function() {
        // Get description
        getDescription(this);
    });
    
    /* This jQuery unobtrusive on click event manages the view for bread crumbs, categories and templates. */
    $('ul#catalogBreadCrumbs').on('click', 'li.breadCrumb', function() {
        // Clear previous previews
        $('#preview').empty();
        // Get current clicked bread crumb category id
        var categoryId =  $(this).data('id');
        // Check if root bread crumb is selected
        if(categoryId == 'root') {
            // Remove arrow for currently selected
            $(this).find('.breadCrumbArrow').remove();
            var rootCategories = $('#rootCategories').html();
            $('#preview').html($('#portalRequestContent').html());
            $('ul#categoriesNav').html(rootCategories);
            $('ul#templatesNav').empty();           
            $(this).nextAll().remove();
            // Set divider
            setNavDivider();
        } else {
            // Remove arrow for currently selected
            $(this).find('.breadCrumbArrow').remove();
            var currentSubcategories = $('#'+categoryId).find('.subcategories').html();
            var currentTemplates = $('#'+categoryId).find('.templates').html();
            $('ul#categoriesNav').html(currentSubcategories);
            $('ul#templatesNav').html(currentTemplates);
            $(this).nextAll().remove();
            // Set divider
            setNavDivider();
            // Get description
            getDescription('#'+categoryId);
        }
    });

   /* This will display template and category descriptions */
   var descriptions = {};
   function getDescription(element) {
       $('.template').removeClass('textGreen');
       $('.category').removeClass('textGreen');
       $(element).addClass('textGreen');
       var descriptionId = $(element).find(".name.navigation").data("description-id");
       if (descriptionId) {
           $('#preview').empty();
           if (descriptions[descriptionId] === undefined) { 
               BUNDLE.ajax({
                   cache: false,
                   type: "GET",
                   url: BUNDLE.applicationPath + "DisplayPage?srv=" + encodeURIComponent(descriptionId),
                   beforeSend: function(jqXHR, settings) {
                       $("#previewLoader").show();
                   },
                   success: function(data, textStatus, jqXHR) {
                       // Cache the description
                       descriptions[descriptionId] = data;
                       $("#previewLoader").hide();
                       $('#preview').append(data);
                   },
                   error: function(jqXHR, textStatus, errorThrown) {
                       // A 401 response will be handled by the BUNDLE.ajax function
                       // so we will not handle that response here.
                       if (jqXHR.status !== 401) {
                           $("#previewLoader").hide();
                           $('#preview').html("Could not load description.")
                       }
                   }
               });
           } else {
               $('#preview').append(descriptions[descriptionId]);
           }
       } else {
           var description = $(element).find('.description').html();
           $('#preview').html(description);
       }
   }

   /* This hides or shows the divider between categories and templates nav */
   function setNavDivider() {
      if ($('ul#templatesNav > li').exists() && $('ul#categoriesNav > li').exists()) {
          $('#navDivider').show();
      } else {
          $('#navDivider').hide();
      }
   }
});