<!DOCTYPE html>
<html>
    <head>
        <%-- Include the bundle common content. --%>
        <%@include file="../../../common/interface/fragments/headContent.jspf"%>
        
        <title>
            <%= customerRequest.getTemplateName()%>
        </title>

        <%-- Include the application head content. --%>
        <%@include file="../../../core/interface/fragments/applicationHeadContent.jspf" %>
        <%@include file="../../../core/interface/fragments/reviewHeadContent.jspf"%>

        <!-- Page Stylesheets -->
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/display.css" type="text/css" />
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/review.css" type="text/css" />
        <!-- Page Javascript -->
        <script type="text/javascript" src="<%=bundle.packagePath()%>resources/js/display.js"></script>

        <%-- Include the form head content, including attached css/javascript files and custom header content --%>
        <%@include file="../../../core/interface/fragments/formHeadContent.jspf"%>
    </head>
    <body class="loadAllPages_<%=customerSurveyReview.getLoadAllPages()%> reviewFrame">
        <div class="container">
            <%@include file="../../../core/interface/fragments/reviewBodyContent.jspf"%>
        </div>
    </body>
</html>