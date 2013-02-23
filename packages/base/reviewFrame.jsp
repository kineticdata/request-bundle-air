<%-- Set the page content type, ensuring that UTF-8 is used. --%>
<%@page contentType="text/html; charset=UTF-8"%>

<%-- Include the package initialization file for preparing a review page. --%>
<%@include file="framework/includes/reviewRequestInitialization.jspf"%>

<%-- Include the package initialization file. --%>
<%@include file="framework/includes/packageInitialization.jspf"%>
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
    <%@include file="interface/reviewFrameMobile.jsp"%>
<% } else { %>
    <%@include file="interface/reviewFrameDesktop.jsp"%>
<% }%>
