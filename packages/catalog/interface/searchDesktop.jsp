<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>
            <%= bundle.getProperty("companyName") + " Search" %>
        </title>
        <%-- Include the common content. --%>
        <%@include file="../../../common/interface/fragments/headContent.jspf"%>

        <!-- Page Stylesheets -->
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/searchDesktop.css" type="text/css" />
    </head>
    <body>
        <%@include file="../../../common/interface/fragments/contentHeader.jspf"%>
        <div class="container clearfix">
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
                <li class="breadCrumb">
                    <a href='<%= bundle.getProperty("searchUrl")%>'>
                        Search
                    </a>
                </li>
                <% if(request.getParameter("q") != null) { %>
                    <li class="breadCrumb arrow"> 
                        >
                    </li>
                    <li class="breadCrumb">
                        <strong>
                            <%= request.getParameter("q")%>
                        </strong>
                    </li>
                <% }%>
            </ul>
            <%-- SEARCH RESULTS VIEW --%>
            <div id="searchResults">
                <% if(responseMessage != null) {%>
                    <%= responseMessage %>
                <% } else {%>
                    <ul class="templates">
                        <% for (int i = 0; i < matchingTemplates.length; i++) {%>
                        <li class="template border gradient">
                            <div class="templateName header">
                                <a href="<%= bundle.applicationPath()%>DisplayPage?srv=<%= matchingTemplates[i].getId()%>">
                                    <%= CatalogSearch.replaceAll(combinedPattern, matchingTemplates[i].getName())%>
                                </a>
                            </div>

                            <div class="templateDescription"><%= CatalogSearch.replaceAll(combinedPattern, matchingTemplates[i].getDescription())%></div>
                            <div class="attributes">
                                <% for (String attributeName : searchableAttributes) {%>
                                <div class="attribute">
                                    <div class="attributeName"><%= attributeName %></div>
                                    <div class="attributeValues">
                                        <% for (String attributeValue : matchingTemplates[i].getTemplateAttributeValues(attributeName)) {%>
                                        <div class="attributeValue borderRight"><%= CatalogSearch.replaceAll(combinedPattern, attributeValue)%></div>
                                        <% }%>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                <% }%>
                                <div class="clearfix"></div>
                            </div>
                        </li>
                        <% }%>
                        <div class="clearfix"></div>
                    </ul>
                <% }%>
            </div>
            <%@include file="../../../common/interface/fragments/sidebarDesktop.jspf"%>
        </div>
        <%@include file="../../../common/interface/fragments/contentFooter.jspf"%>
    </body>
</html>