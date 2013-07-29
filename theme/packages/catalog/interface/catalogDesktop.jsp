<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>
            <%= bundle.getProperty("companyName") + " " + bundle.getProperty("catalogName")%>
        </title>
        <%-- Include the common content. --%>
        <%@include file="../../../common/interface/fragments/headContent.jspf"%>

        <!-- Page Stylesheets -->
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/catalogDesktop.css" type="text/css" />
        <!-- Page Javascript -->
        <script type="text/javascript" src="<%=bundle.packagePath()%>resources/js/catalogDesktop.js"></script>
    </head>
    <body>
        <%@include file="../../../common/interface/fragments/contentHeader.jspf"%>
        <div class="container containerBorderBottom">
            <%-- BREADCRUMBS VIEW --%>
            <ul id="catalogBreadCrumbs">
                <li id="breadCrumbRoot" data-id="root" class="breadCrumb">
                    Catalog
                </li>
            </ul>
            <%-- LOADER --%>
            <div id="loader" class="hidden">
                <img alt="Please Wait." src="<%=bundle.bundlePath()%>common/resources/images/spinner.gif" />
                <br />
                Loading Results
            </div>
            <%-- SEARCH RESULTS VIEW --%>
            <div id="searchResults" class="hidden">
            </div>
            <div id="catalogContainer" class="borderRight">
                <div id="nestedNav" class="borderRight">
                    <%-- TEMPLATES VIEW --%>
                    <ul id="templatesNav" class="unstyled">
                    </ul>
                    <div id="navDivider" class="borderTop hidden"></div>
                    <%-- CATAGORIES VIEW --%>
                    <ul id="categoriesNav" class="unstyled">
                    </ul>
                </div>
                <div id="preview">
                </div>
                <div id="portalRequestContent" class="hidden">
                    <%@include file="../../../core/interface/fragments/displayBodyContent.jspf"%>
                </div>
                <div id="previewLoader" class="hidden">
                    <img alt="Please Wait." src="<%=bundle.bundlePath()%>common/resources/images/spinner.gif" />
                    <br />
                    Loading Description
                </div>
            </div>
            <%@include file="../../../common/interface/fragments/sidebarDesktop.jspf"%>
        </div>
        <%@include file="../../../common/interface/fragments/contentFooter.jspf"%>
        <%-- ROOT CATEGORIES DATA --%>
        <ul id="rootCategories" class="hidden">
            <% for (Category category : catalog.getRootCategories(context)) { %>
                <% if (category.hasTemplates()) { %>
                    <li class="category" data-id="<%= category.getId()%>" data-name="<%= category.getName()%>">
                        <div class="name navigation" data-description-id="<%= categoryDescriptions.get(category.getId()) %>">
                            <span class="arrow">&gt;</span> <%= category.getName()%>
                        </div>
                        <div class="description hidden">
                            <%= category.getDescription()%>
                        </div>
                    </li>
                <% } %>
            <% }%>
        </ul>
        <%-- CATEGORY DATA --%>
        <% for (Category category : catalog.getAllCategories(context)) {%>
            <% if (category.hasTemplates()) { %>
                <li class="category hidden" id="<%= category.getId()%>">
                    <div class="name navigation" data-description-id="<%= categoryDescriptions.get(category.getId()) %>">
                        <%= category.getName()%>
                    </div>
                    <div class="description hidden"><%= category.getDescription()%></div>
                    <%-- SUBCATEGORIES DATA --%>
                    <% if (category.hasNonEmptySubcategories()) {%>
                    <ul class="subcategories hidden">
                        <% for (Category subcategory : category.getSubcategories()) { %>
                            <% if (subcategory.hasTemplates()) { %>
                            <li class="category" data-id="<%= subcategory.getId()%>" data-name="<%= subcategory.getName()%>">
                                <div class="name navigation" data-description-id="<%= categoryDescriptions.get(subcategory.getId()) %>">
                                    <span class="arrow">&gt;</span> <%= subcategory.getName()%>
                                </div>
                                <div class="description hidden">
                                    <%= subcategory.getDescription()%>
                                </div>
                            </li>
                            <% }%>
                        <% }%>
                        <div class="clearfix"></div>
                    </ul>
                    <% }%>
                    <%-- TEMPLATES DATA --%>
                    <% if (category.hasTemplates()) {%>
                        <ul class="templates hidden">
                            <% for (Template template : category.getTemplates()) {%>
                                <% if (!(template.getTemplateAttributeValues("IsDescription").length > 0)) { %>
                                <li class="template">
                                    <div class="name navigation" data-description-id="<%= templateDescriptions.get(template.getId())%>">
                                        <%= template.getName()%>
                                    </div>
                                    <div class="description hidden">
                                        <%= template.getDescription()%>
                                        <div class="request">
                                            <a class="templateButton" href="<%= pathHelper.templateUrl(template.getId())%>">Request</a>
                                        </div>
                                    </div>
                                </li>
                                <% }%>
                            <% }%>
                        </ul>
                    <% }%>
                </li>
            <% }%>
        <% }%>
    </body>
</html>