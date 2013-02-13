<%-- Set the page content type, ensuring that UTF-8 is used. --%>
<%@page contentType="text/html; charset=UTF-8"%>

<%-- Include the package initialization file. --%>
<%@include file="framework/includes/packageInitialization.jspf"%>

<%--
    If the user is already logged in, redirect them to the appropriate location
    and return (this prevents the JSP content from being evaluated and
    rendered).
--%>
<%@include file="framework/includes/redirectIfLoggedIn.jspf"%>
<%
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
    <%@include file="interface/fragments/loginMobile.jspf"%>
<% } else { %>
    <%@include file="interface/fragments/loginDesktop.jspf"%>
<% }%>