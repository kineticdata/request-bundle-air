<!DOCTYPE html>
<html>
    <head>
        <title>
            <%= customerRequest.getTemplateName()%>
        </title>
        <%-- Include the application head content. --%>
        <%@include file="../../../core/interface/fragments/applicationHeadContent.jspf" %>
        <%@include file="../../../core/interface/fragments/reviewHeadContent.jspf"%>

        <%-- Include the bundle common content. --%>
        <%@include file="../../../common/interface/fragments/headContentMobile.jspf"%>
        <!-- Page Stylesheets -->
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/display.css" type="text/css" />
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/review.css" type="text/css" />
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/reviewMobile.css" type="text/css" />
    </head>
    <body class="loadAllPages_<%=customerSurveyReview.getLoadAllPages()%> review">
        <div class="container">
            <%@include file="../../../common/interface/fragments/sideNavigationMobile.jspf"%>
            <div id="mobile-slide" data-target="nav-slide">
                <%@include file="../../../common/interface/fragments/contentHeaderMobile.jspf"%>
                <div class="wrapper clearfix">
                    <%@include file="../../../core/interface/fragments/reviewBodyContent.jspf"%>
                </div>
                <%@include file="../../../common/interface/fragments/contentFooterMobile.jspf"%>
            </div>
        </div>
    </body>
</html>