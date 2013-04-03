$(document).ready(function() {
    firstClick = true;
    $('ul.category li.category-details').on('click', 'div.name:not(.template .name)', function(event) {
        event.stopPropagation();
        if(firstClick) {
            $(this).parent().parent().siblings().hide();
            firstClick = false;
        } else {
            $(this).parent().parent().parent().siblings().hide();
        }
        $(this).parent().children('.name').hide();
        if($(this).parent().parent().data('description-id')) {
            getTemplateDescription($(this).parent().parent().data('description-id'));
        } else {
            $('#preview').html($(this).parent().children('.description').html());
        }
        $(this).parent().children('.category').show();
        $(this).parent().nextAll().show();

        // Add arrow to the last bread crumbs child before we append new category bread crumb
        $('ul#catalogBreadCrumbs').append('<li class="breadCrumbArrow">></li>'); 
        // Create new bread crumb with the category's details
        var breadCrumb = '<li class="breadCrumb" data-id="'+$(this).parent().parent().data('id')+'" data-name="'+$(this).parent().parent().data('name')+'">'+$(this).parent().parent().data('name')+'</li>';
        // Append new bread crumb to current list of bread crumbs
        $('ul#catalogBreadCrumbs').append(breadCrumb);
    });

    $('ul.category li.template').on('click', 'div.name', function(event) {
        if($(this).parent().data('description-id')) {
            getTemplateDescription($(this).parent().parent().data('description-id'));
        } else {
            $('#preview').html($(this).parent().children('.description').html());
        }
    });

    $('ul#catalogBreadCrumbs').on('click', 'li.breadCrumb', function() {
        // Clear previous previews
        $('#preview').empty();
        // Get current clicked bread crumb category id
        var categoryId =  $(this).data('id');
        // Check if root bread crumb is selected

        $('ul.category li > ul').hide();
        $('ul.category li + li').hide();
        $('ul.category li div.description').hide();
        $('ul.category li.category-details div.name').show();
        if(categoryId == 'root') {
            firstClick = true;
            // Remove arrow for currently selected
            $(this).find('.breadCrumbArrow').remove();
            $('#preview').html($('#portalRequestContent').html());
            $('#nestedNav').children('ul').show();          
            $(this).nextAll().remove();
        } else {
            // Remove arrow for currently selected
            $(this).find('.breadCrumbArrow').remove();
            $(this).nextAll().remove();
            $('[data-id="'+categoryId+'"]').siblings().hide();
           // $('#'+categoryId+' li.category-details').children('.name').hide();
            $('[data-id="'+categoryId+'"]').nextAll().show();
            $('[data-id="'+categoryId+'"]').show();
        }
    });

    descriptions = {};
    function getTemplateDescription(descriptionId) {
       if (descriptions[descriptionId] === undefined) { 
           BUNDLE.ajax({
               cache: false,
               type: 'GET',
               url: BUNDLE.applicationPath + "DisplayPage?srv=" + encodeURIComponent(descriptionId),
               beforeSend: function(jqXHR, settings) {
                   $("#previewLoader").show();
               },
               success: function(data, textStatus, jqXHR) {
                   // Cache the description
                   descriptions[descriptionId] = data;
                   $("#previewLoader").hide();
                   $('#preview').html(data);
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
           $('#preview').html(descriptions[descriptionId]);
       }
    }
});