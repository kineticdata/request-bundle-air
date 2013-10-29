<!DOCTYPE html>
<html>
    <head>
        <%-- Include the common content. --%>
        <%@include file="../../../common/interface/fragments/headContent.jspf"%>
        
        <title>
            <%= bundle.getProperty("companyName")%>&nbsp;My Requests
        </title>

        <!-- Page Stylesheets -->
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/jquery.qtip.css" type="text/css" />
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/submissionsDesktop.css" type="text/css" />
        <!-- Page Javascript -->
        <script type="text/javascript" src="<%=bundle.packagePath()%>resources/js/moment.min.js"></script>
        <script type="text/javascript" src="<%=bundle.packagePath()%>resources/js/jquery.qtip.min.js"></script>
        <script type="text/javascript" src="<%=bundle.packagePath()%>resources/js/jquery.consoleTable.js"></script>
        <script type="text/javascript" src="<%=bundle.packagePath()%>resources/js/submissionsDesktop.js"></script>
    </head>
    <body>
        <%@include file="../../../common/interface/fragments/contentHeader.jspf"%>
        <div class="container containerBorderBottom">
            <%-- BREADCRUMBS VIEW --%>
            <ul id="catalogBreadCrumbs">
                <li class="breadCrumb">
                    <a href="<%= bundle.getProperty("catalogUrl")%>">
                        Catalog
                    </a>
                </li>
                <li class="breadCrumb arrow"> 
                    &#62;
                </li>
            </ul>
            <%-- LOADER --%>
            <div id="loader">
                <img alt="Please Wait." src="<%=bundle.bundlePath()%>common/resources/images/spinner.gif" />
                <br />
                Loading Results
            </div>
            <%-- SUBMISSIONS VIEW --%>
            <div class="results hidden">
            </div>
            <div class="results-message hidden"></div>
            <%@include file="../../../common/interface/fragments/sidebarDesktop.jspf"%>
        </div>
        <%@include file="../../../common/interface/fragments/contentFooter.jspf"%>
    </body>
</html>
