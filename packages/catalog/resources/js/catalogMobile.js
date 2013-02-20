$(document).ready(function() {
    // Local selectors that are used quite a bit
    var breadCrumbsNav = 'ul#breadcrumbs';
    var templatesNav = 'ul#templatesNav';
    var templatePreview = '#templatePreview';
    var categoriesNav = 'ul#categoriesNav';
    
    /* This unobtrusive on click event displays the menus */
    $(categoriesNav).on('click', 'li', function(event) {
        event.preventDefault();
        // Get current clicked category id and name
        var categoryId =  $(this).data('id');
        var categoryName =  $(this).data('name');
        // Find category's children and get the html
        var currentSubcategories = $('[root-catagory-id='+categoryId+']').find('.subcategories').html();
        // Display the category's children into div
        if(currentSubcategories) {
            $(categoriesNav).html(currentSubcategories);
        } else {
            $(categoriesNav).html('');
        }
        // Find category's templates and get the html
        var currentTemplates = $('[root-catagory-id='+categoryId+']').find('.templates').html();
         // Display the category's templates into div
        $(templatesNav).html(currentTemplates);
        // Create new bread crumb with the category's details
        var breadCrumb = '<li class="breadcrumb" data-id="'+categoryId+'" data-name="'+categoryName+'"><a class="backMenu">'+categoryName+'</a></li>';
        // Append new bread crumb to current list of bread crumbs
        $(breadCrumbsNav).append(breadCrumb);
    });
    /* This unobtrusive on click event displays the template's information */
    $(templatesNav).on('click', 'li', function(event) {
        event.preventDefault();
        var templateName =  $(this).data('name');
        $(templatesNav).empty();
        $(categoriesNav).empty();
        $(templatePreview).html($(this).find('.request').html());
        // Create new bread crumb
        var breadCrumb = '<li class="breadcrumb"><a class="backMenu">'+templateName+'</a></li>';
        // Append new bread crumb to current list of bread crumbs
        $(breadCrumbsNav).append(breadCrumb);
    });
    
    /* This unobtrusive on click event manages the view for bread crumbs, categories and templates. */
    $(breadCrumbsNav).on('click', 'li.breadcrumb', function(event) {
        event.preventDefault();
        $(templatePreview).empty();
        // Get current clicked bread crumb category id
        var previousCategoryId = $(this).prev().data('id');
        // Check if root bread crumb is selected
        if(previousCategoryId == 'root') {
            var rootCategories = $('#rootCategories').html();
            $(categoriesNav).html(rootCategories);
            $(templatesNav).empty();           
            $(this).remove();
        } else {
            var currentSubcategories = $('[root-catagory-id='+previousCategoryId+']').find('.subcategories').html();
            var currentTemplates = $('[root-catagory-id='+previousCategoryId+']').find('.templates').html();
            $(categoriesNav).html(currentSubcategories);
            $(templatesNav).html(currentTemplates);
            $(this).remove();
            $(breadCrumbsNav).html($(breadCrumbsNav).html());   
        }
    });
});