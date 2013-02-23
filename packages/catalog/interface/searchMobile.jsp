<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>
            <%= bundle.getProperty("companyName") + " Search" %>
        </title>
        <%-- Include the common content. --%>
        <%@include file="../../../common/interface/fragments/headContentMobile.jspf"%>
        <!-- Page Stylesheets -->
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/searchMobile.css" type="text/css" />
    </head>
    <body>
        <div class="container">
            <%@include file="../../../common/interface/fragments/contentHeaderMobile.jspf"%>
            <div class="wrapper clearfix">
                <!-- Breadcrumbs Begins -->
                <nav class="breadcrumb">
                    <a href="<%= bundle.getProperty("catalogUrl")%>">
                        Catalog
                    </a> / 
                    <a href='<%= bundle.getProperty("searchUrl")%>'>
                        Search
                    </a> /
                    <% if(request.getParameter("q") != null) { %>
                    <strong>
                        <%= request.getParameter("q")%>
                    </strong>
                    <% }%>
                </nav>
                <!-- Breadcrumbs End -->
                <section id="main" class="clearfix">
                    <div class="mainWrap">
                        <% if(responseMessage != null) {%>
                            <%= responseMessage %>
                        <% } else {%>
                            <div class="search-header">
                                <h1>
                                    <em>Results found for</em> '<%= request.getParameter("q")%>'.
                                </h1>
                            </div>
                            <ol class="search-results">
                            <% for (int i = 0; i < matchingTemplates.length; i++) {%>
                                <li>
                                    <a href="DisplayPage?srv=<%= matchingTemplates[i].getId()%>">
                                        <%= CatalogSearch.replaceAll(combinedPattern, matchingTemplates[i].getName())%>
                                    </a>
                                    <p class="description">
                                        <%= matchingTemplates[i].getDescription() %>
                                    </p>
                                    <div class="clearfix"></div>
                                </li>
                            <% }%>
                        </ol>
                        <% }%>
                    </div>
                </section>
            </div>
        </div>
        <%@include file="../../../common/interface/fragments/contentFooterMobile.jspf"%>
    </body>
</html>