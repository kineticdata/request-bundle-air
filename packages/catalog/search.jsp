<%-- Set the page content type, ensuring that UTF-8 is used. --%>
<%@page contentType="text/html; charset=UTF-8"%>

<%-- Include the package initialization file. --%>
<%@include file="framework/includes/packageInitialization.jspf"%>

<%-- 
    Include the CatalogSearch fragment that defines the CatalogSearch class that
    will be used to retrieve and filter the catalog data.
--%>
<%@include file="framework/helpers/CatalogSearch.jspf"%>

<%-- Retrieve the Catalog --%>
<%
    // Retrieve the main catalog object
    Catalog catalog = Catalog.findByName(context, customerRequest.getCatalogName());
    // Preload the catalog child objects (such as Categories, Templates, etc) so
    // that they are available.  Preloading all of the related objects at once
    // is more efficient than loading them individually.
    catalog.preload(context);

    // Mobile Check
    Boolean isMobile = false;
    if(request.getParameter("mobile") != null) {
        isMobile = Boolean.valueOf(request.getParameter("mobile"));
        if(isMobile) {
            CookieHelper.setCookieValue(response, "mobile", "true");
        } else {
            CookieHelper.setCookieValue(response, "mobile", "false");
        }
    } else if(CookieHelper.getCookieValue(request, "mobile") != null) {
        isMobile = Boolean.valueOf(CookieHelper.getCookieValue(request, "mobile"));
    } else {
        isMobile = MobileDetectionHelper.isMobile(request);
    }

    // Define variables
    String[] querySegments;
    String responseMessage = null;
    List<Template> templates = new ArrayList();
    Template[] matchingTemplates = templates.toArray(new Template[templates.size()]);
    Pattern combinedPattern = Pattern.compile("");
    // Retrieve the searchableAttribute property
    String searchableAttributeString = bundle.getProperty("searchableAttributes");
    // Initialize the searchable attributes array
    String[] searchableAttributes = new String[0];
    if(request.getParameter("q") != null) {
        // Build the array of querySegments (query string separated by a space)
        querySegments = request.getParameter("q").split(" ");
        // Display an error message if there are 0 querySegments or > 10 querySegments
        if (querySegments.length == 0 || querySegments[0].length() == 0) {
            responseMessage = "<div class=\"message alert alert-error\"><a class=\"close\" data-dismiss=\"alert\">x</a> Please enter a search term.</div>";
        } else if (querySegments.length > 10) {
            responseMessage = "<div class=\"message alert alert-error\"><a class=\"close\" data-dismiss=\"alert\">x</a> Search is limited to 10 search terms.</div>";
        } else {
            // Default the searchableAttribute property to "Keyword" if it wasn't specified
            if (searchableAttributeString == null) {searchableAttributeString = "Keyword";}
            // If the searchableAttributeString is not empty
            if (!searchableAttributeString.equals("")) {
                searchableAttributes = searchableAttributeString.split("\\s*,\\s*");
            }
            CatalogSearch catalogSearch = new CatalogSearch(context, catalog.getName(), querySegments);
            //Category[] matchingCategories = catalogSearch.getMatchingCategories();
            matchingTemplates = catalogSearch.getMatchingTemplates(searchableAttributes);
            combinedPattern = catalogSearch.getCombinedPattern();
            if (matchingTemplates.length == 0) {
                responseMessage = "<div class=\"message alert alert-error\"><a class=\"close\" data-dismiss=\"alert\">x</a>No results were found.</div>";
            }
        }
    } else {
        responseMessage = "<div class=\"message alert alert-info\"><a class=\"close\" data-dismiss=\"alert\">x</a>Please Start Your Search</div>";
    }
%>
<% if(isMobile) { %>
    <%@include file="interface/fragments/searchMobile.jspf"%>
<% } else { %>
    <%@include file="interface/fragments/searchDesktop.jspf"%>
<% }%>