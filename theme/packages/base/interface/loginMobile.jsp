<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title><%= customerRequest.getTemplateName()%></title>
        <%-- Include the application head content. --%>
        <%@include file="../../../core/interface/fragments/applicationHeadContent.jspf" %>
        
        <%-- Include the bundle common content. --%>
        <%@include file="../../../common/interface/fragments/headContentMobile.jspf"%>
        <!-- Page Stylesheets -->
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/login.css" type="text/css" />
        <!-- Page Stylesheets -->
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/loginMobile.css" type="text/css" />
        <!-- Page Javascript -->       
        <script type="text/javascript" src="<%=bundle.packagePath()%>resources/js/login.js"></script>
    </head>
    <body>
        <div class="container">
        <!-- Header Begins -->
            <header class="clearfix">
                <div class="wrapper clearfix">
                    <div class="dashboard clearfix">
                        <!-- Customer Logo -->
                        <div id="logo">
                            <a href="<%= bundle.getProperty("catalogUrl")%>">
                                <img alt="<%= bundle.getProperty("companyName") %>" class="logoHeader" src="<%= bundle.bundlePath()%>common/resources/images/logo.png" >
                            </a>
                        </div>
                    </div>
                </div>
            </header>
            <div class="wrapper clearfix" >
                <!-- Breadcrumbs Begins -->
                <nav class="breadcrumb">
                    <a href="<%= bundle.getProperty("loginUrl")%>">
                        Catalog Login
                    </a>
                </nav>
            </div>
            <!-- Render the Login Box -->
            <div class="loginSection">
                <!-- Login Box Header -->
                <div class="pageHeader">
                    <h3>Please Log In</h3>
                </div>
                <!-- Logging In Spinner -->
                <div class="hidden" id="loader">
                    <img style="margin: 0px 0px 10px 0px; height: 24px; width: 24px;" alt="Please Wait." src="<%=bundle.bundlePath()%>common/resources/images/spinner.gif" />
                    <br />
                    Authenticating
                </div>
                <!-- Error Message -->
                <% if (!("".equals(customerRequest.getErrorMessage()) || customerRequest.getErrorMessage() == null)) { %>   
                    <div class="message alert alert-error">
                        <a class="close" data-dismiss="alert">x</a>
                            <%= customerRequest.getErrorMessage() %>
                            <% customerRequest.clearErrorMessage(); %>
                </div>
                <% }%>
                <!-- Login Form -->
                <form id="loginForm" class="border rounded boxShadow gradient" name="Login" method="post" action="KSAuthenticationServlet">
                    <fieldset>
                        <!-- User Name -->
                        <p>
                            <input id="UserName" name="UserName" type="text" autocomplete="off" placeholder="Username" />
                        </p>
                        <!-- Password -->
                        <p>
                            <input id="Password" name="Password" type="password" autocomplete="off" placeholder="Password" />
                        </p>
                        <!-- Options -->
                        <!-- Log In Button -->
                        <input id="loginSubmit" type="submit" value="Log In" />
                        <% if (bundle.getProperty("forgotPasswordAction") != null) {%>
                            <!-- Forgot Password -->
                            <a href="<%= bundle.getProperty("forgotPasswordAction")%>">Forgot Password</a>
                        <% }%>
                    </fieldset>
                </form>
            </div>
            <div class="clearfix"></div>
        </div>
        <%@include file="../../../common/interface/fragments/contentFooterMobile.jspf"%>
    </body>
</html>