<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>
            <%= bundle.getProperty("companyName") + " " + bundle.getProperty("catalogName")%>
        </title>
        <%-- Include the common content. --%>
        <%@include file="../../../common/interface/fragments/headContentMobile.jspf"%>

        <!-- Page Stylesheets -->
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/catalogMobile.css" type="text/css" />
        <!-- Page Javascript -->
        <script type="text/javascript" src="<%=bundle.packagePath()%>resources/js/catalogMobile.js"></script>
    </head>
    <body>
        <div class="container">
            <%@include file="../../../common/interface/fragments/sideNavigationMobile.jspf"%>
            <div id="mobile-slide" data-target="nav-slide">
                <%@include file="../../../common/interface/fragments/contentHeaderMobile.jspf"%>
                <div class="wrapper clearfix">
                    <!-- Breadcrumbs Begins -->
                    <nav class="breadcrumb">
                        <a href="<%= bundle.getProperty("catalogUrl")%>">
                            Catalog
                        </a> /
                    </nav>
                    <!-- Breadcrumbs End -->
                    <section id="sidebar" class="catalog clearfix">
                        <nav class="catalog-list">
                            <div class="menuContainer" id="catalogMenu">
                                <%-- BREADCRUMBS VIEW --%>
                                <ul id="breadcrumbs">
                                    <li class="breadcrumb" data-id="root" data-name="root">
                                    </li>
                                </ul>
                                <%-- TEMPLATES VIEW --%>
                                <ul id="templatesNav">
                                </ul>
                                <%-- CATAGORIES VIEW --%>
                                <ul id="categoriesNav">
                                    <% for (Category category : catalog.getRootCategories(context)) {%>
                                        <% if (category.hasTemplates()) { %>
                                            <li data-id="<%= category.getId()%>" data-name="<%= category.getName()%>">
                                                <a class="arrow" href="">
                                                    <%= category.getName()%>
                                                </a>
                                            </li>
                                        <%}%>
                                    <%}%>
                                </ul>
                                <%-- TEMPLATE PREVIEW --%>
                                <div id="templatePreview">
                                </div>
                            </div>
                        </nav>
                    </section>
                </div>
                <%@include file="../../../common/interface/fragments/contentFooterMobile.jspf"%>
            </div>
        </div>
        <%-- ROOT CATEGORIES DATA --%>
        <ul id="rootCategories" class="hidden">
            <% for (Category category : catalog.getRootCategories(context)) {%>
                <% if (category.hasTemplates()) { %>
                    <li data-id="<%= category.getId()%>" data-name="<%= category.getName()%>">
                        <a class="arrow" href="">
                            <%= category.getName()%>
                        </a>
                    </li>
                <%}%>
            <%}%>
        </ul>
        <%-- CATEGORY DATA --%>
        <% for (Category category : catalog.getAllCategories(context)) {%>
            <% if (category.hasTemplates()) { %>
                <li class="category hidden" root-catagory-id="<%= category.getId()%>">
                    <a class="arrow" href="">
                        <%= category.getName()%>
                    </a>
                    <%-- SUBCATEGORIES DATA --%>
                <% if (category.hasNonEmptySubcategories()) {%>
                <ul class="subcategories hidden">
                    <% for (Category subcategory : category.getSubcategories()) { %>
                        <% if (subcategory.hasTemplates()) { %>
                        <li class="category" data-id="<%= subcategory.getId()%>" data-name="<%= subcategory.getName()%>">
                            <a class="arrow" href="">
                                <%= subcategory.getName()%>
                            </a>
                        </li>
                        <% }%>
                    <% }%>
                </ul>
                <% }%>
                <%-- TEMPLATES DATA --%>
                <% if (category.hasTemplates()) {%>
                    <ul class="templates hidden">
                        <% for (Template template : category.getTemplates()) {%>
                            <li class="template" data-name="<%= template.getName()%>">
                                <a href="">
                                    <%= template.getName()%>
                                </a>
                                <div class="request hidden">
                                    <div class="requestSummary">
                                        <h1>
                                            <%= template.getName()%>
                                        </h1>
                                        <p>
                                            <%= template.getDescription()%>
                                        </p>
                                        <a class="templateButton" href="<%= pathHelper.templateUrl(template.getId())%>">
                                            Request
                                        </a>
                                    </div>
                                </div>
                            </li>
                        <% }%>
                    </ul>
                <% }%>
                </li>
            <% }%>
        <% }%>
    </body>
</html>