<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>
            <%= bundle.getProperty("companyName")%>&nbsp;My Requests
        </title>
        <%-- Include the common content. --%>
        <%@include file="../../../common/interface/fragments/headContent.jspf"%>

        <!-- Page Stylesheets -->
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/submissionsDesktop.css" type="text/css" />
        <!-- Page Javascript -->
        <script type="text/javascript" src="<%=bundle.packagePath()%>resources/js/arsTable.js"></script>
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
                    >
                </li>
            </ul>
            <%-- LOADER --%>
            <div id="loader">
                <img alt="Please Wait." src="<%=bundle.bundlePath()%>common/resources/images/spinner.gif" />
                <br />
                Loading Results
            </div>
            <%-- SUBMISSIONS VIEW --%>
            <div id="submissionsTable" class="hidden">
                <%@include file="fragments/tableControls.jspf"%>
                <div class="tableContainer hidden" id="tableContainerRequestsOpen"></div>
                <div class="tableContainer hidden" id="tableContainerRequestsClosed"></div>
                <div class="tableContainer hidden" id="tableContainerRequestsParked"></div>
                <div class="tableContainer hidden" id="tableContainerApprovalsPending"></div>
                <div class="tableContainer hidden" id="tableContainerApprovalsCompleted"></div>
            </div>
            <%@include file="../../../common/interface/fragments/sidebarDesktop.jspf"%>
        </div>
        <%@include file="../../../common/interface/fragments/contentFooter.jspf"%>
    </body>
</html>