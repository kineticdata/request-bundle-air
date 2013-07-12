<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
        <title><%= customerRequest.getTemplateName()%></title>
        <%-- Include the application head content. --%>
        <%@include file="../../../core/interface/fragments/applicationHeadContent.jspf"%>
        <%@include file="../../../core/interface/fragments/displayHeadContent.jspf"%>

        <%-- Include the bundle common content. --%>
        <%@include file="../../../common/interface/fragments/headContent.jspf"%>

        <!-- Page Stylesheets -->
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/display.css" type="text/css" />
        <!-- Page Javascript -->
        <script type="text/javascript" src="<%=bundle.packagePath()%>resources/js/display.js"></script>
        <%-- Include the form head content, including attached css/javascript files and custom header content --%>
        <%@include file="../../../core/interface/fragments/formHeadContent.jspf"%>
    </head>
    <body>
        <%@include file="fragments/contentHeaderDesktop.jspf"%>
        <div class="container">
            <%@include file="../../../core/interface/fragments/displayBodyContent.jspf"%>
            <div class="clearfix"></div>
        </div>
        <%@include file="../../../common/interface/fragments/contentFooter.jspf"%>
    </body>
</html>