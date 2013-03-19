<html>
    <head>
        <meta charset="utf-8">
        <title>
            <%= bundle.getProperty("companyName")%>&nbsp;My Requests
        </title>
        <%-- Include the common content. --%>
        <%@include file="../../../common/interface/fragments/headContentMobile.jspf"%>

        <!-- Page Stylesheets -->
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/submissionsMobile.css" type="text/css" />
        <!-- Page Javascript -->
        <script type="text/javascript" src="<%=bundle.packagePath()%>resources/js/jquery.dataTables.js"></script>
        <script type="text/javascript" src="<%=bundle.packagePath()%>resources/js/ArsUrl.js"></script>
        <script type="text/javascript" src="<%=bundle.packagePath()%>resources/js/submissionsMobile.js"></script>
    </head>
    <body>
        <div class="container">
            <%@include file="../../../common/interface/fragments/contentHeaderMobile.jspf"%>
            <div class="wrapper clearfix">
                <section id="sidebar" class="catalog clearfix">
                <!-- Normally the nav is located here -->
                </section>
                <section id="main" class="clearfix">
                    <%-- LOADER --%>
                    <div id="loader">
                        <img alt="Please Wait." src="<%=bundle.bundlePath()%>common/resources/images/spinner.gif" />
                        <br />
                        Loading Results
                    </div>
                    <%-- SUBMISSIONS VIEW --%>
                    <div id="submissionsTable" class="hidden">
                        <table class="tableContainer responsive hidden" id="tableContainerRequestsOpen"></table>
                    </div>
                </section>
            </div>
        </div> 
        <%@include file="../../../common/interface/fragments/contentFooterMobile.jspf"%>
    </body>
</html>