<%-- Set the page content type, ensuring that UTF-8 is used. --%>
<%@page contentType="text/html; charset=UTF-8"%>

<%-- Include the package initialization file. --%>
<%@include file="framework/includes/packageInitialization.jspf"%>

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
%>
<% if(isMobile) { %>
    <%@include file="interface/fragments/submissionsMobile.jspf"%>
<% } else { %>
    <%@include file="interface/fragments/submissionsDesktop.jspf"%>
<% }%>