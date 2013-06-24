<%-- Set the page content type, ensuring that UTF-8 is used. --%>
<%@page contentType="text/html; charset=UTF-8"%>

<%-- Include the package initialization file. --%>
<%@include file="framework/includes/packageInitialization.jspf"%>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title><%= bundle.getProperty("companyName") + " " + bundle.getProperty("catalogName")%></title>

        <%-- Include the common content. --%>
        <%@include file="../../common/interface/fragments/headContent.jspf"%>

        <!-- Page Stylesheets -->
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/submissionDetails.css" type="text/css" />
        <link rel="stylesheet" href="<%= bundle.packagePath()%>resources/css/jquery.qtip.css" type="text/css" />
        <!-- Page Javascript -->
         <script type="text/javascript" src="<%=bundle.packagePath()%>resources/js/jquery.qtip.min.js"></script>
        <script type="text/javascript" src="<%=bundle.packagePath()%>resources/js/submissionDetails.js"></script>
    </head>
    
    <body>
        <%@include file="../../common/interface/fragments/contentHeader.jspf"%>
        <div class="container">
            <div class="topNavContainer">
                Submission Details
            </div>
            <%
                if (context == null) {
                    ResponseHelper.sendUnauthorizedResponse(response);
                } else {
                    String csrv = request.getParameter("submissionId");
                    Submission submission = Submission.findByInstanceId(context, csrv);

                    if (submission == null) {
            %>
            <div class="submissionDetails">
                Unable to locate record
            </div>
            <%} else {
            %>
            <div class="submissionDetails">
                <div class="timeline">
                    <ul class="events">
                        <%-- REQUEST START VIEW --%>
                        <li style="width: 99.5%; left: 0.2%;">
                            <div class="requestId">
                                <a title="Review Submission" class="read" href="/kinetic/ReviewRequest?csrv=<%=submission.getId()%>&reviewPage=<%= bundle.getProperty("reviewJsp")%>&excludeByName=Review%20Page">
                                    Kinetic Request - <%= submission.getRequestId()%>
                                </a>
                            </div>
                            <div class="template">
                                <%= submission.getTemplateName()%>
                                <div class="details">
                                    <div class="detail">
                                        <% if(!submission.getNotes().equals("")) {%>
                                        Notes: <%= submission.getNotes()%>
                                        <%}%>
                                    </div>
                                    <div id="submissionStartDate" class="detail" data-created="<%= DateHelper.formatDate(submission.getCreateDate(), request.getLocale())%>">
                                        <%= DateHelper.formatDate(submission.getCreateDate(), request.getLocale())%>
                                    </div>
                                </div>
                            </div>
                        </li>


                        <%-- TASKS VIEW --%>
                        <% for (String treeName : submission.getTaskTreeExecutions(context).keySet()) {%>
                            <% for (Task task : submission.getTaskTreeExecutions(context).get(treeName)) {%>
                            <li class="task" style="width: 15%; left: 0.2%;" data-created="<%= DateHelper.formatDate(task.getCreateDate(), request.getLocale())%>"
                            <% if (task.getStatus().equals("Closed")) {%>
                                data-closed="<%= DateHelper.formatDate(task.getModifiedDate(), request.getLocale())%>"
                            <% } else {%>
                                 data-closed="<%= DateHelper.getCurrentDateTime(request.getLocale())%>"
                            <% }%> >
                                <% TaskMessage[] messages = task.getMessages(context); %>
                                <% if(task.hasMessages()) {%>
                                    <div>
                                        <img width="16" height="16" src="<%=bundle.packagePath()%>resources/images/comments.png" />
                                    </div>
                                 <% }%>
                                <div class="taskName">
                                    <%= task.getName()%>                                          
                                </div>
                                <div class="details hidden">
                                    <div class="detail">
                                        Status: <%= task.getStatus()%>
                                    </div>
                                    <div class="detail">
                                        Initiated: <%= DateHelper.formatDate(task.getCreateDate(), request.getLocale())%>
                                    </div>
                                    <% if (task.getStatus().equals("Closed")) {%>
                                    <div class="detail">
                                        Completed: <%= DateHelper.formatDate(task.getModifiedDate(), request.getLocale())%>
                                    </div>
                                    <%}%>
                                    <% if(task.hasMessages()) {%>
                                        Messages:
                                        <% for (TaskMessage message : messages) {%>
                                            <div class="detail"> 
                                                <div class="message"><%= message.getMessage()%></div>  
                                            </div>
                                        <% }%>
                                    <% }%>
                                </div>
                            </li>
                            <% }%>
                        <% }%>
                        
                        <%-- REQUEST COMPLETE/OPEN VIEW --%>
                        <li class="status" style="width: 99.5%; left: 0;">
                        <% if (submission.getRequestStatus().equals("Closed")) {%>
                            Request Closed
                            <div class="details">
                                <div id="submissionCloseDate" class="detail" data-closed="<%= DateHelper.formatDate(submission.getRequestClosedDate(), request.getLocale())%>">
                                    &nbsp;(<%= DateHelper.formatDate(submission.getCreateDate(), request.getLocale())%> - <%= DateHelper.formatDate(submission.getRequestClosedDate(), request.getLocale())%>)
                                </div> Total business days
                            </div>
                        <%} else {%>
                             Request Open
                            <div class="details">
                                 <div id="submissionCloseDate" class="detail" data-closed="<%= DateHelper.getCurrentDateTime(request.getLocale())%>">
                                     &nbsp;(<%= DateHelper.formatDate(submission.getCreateDate(), request.getLocale())%> - <%= DateHelper.getCurrentDateTime(request.getLocale())%>)
                                 </div> 
                                 Elapsed Total Days and Elapsed Business Days
                            </div>
                        <% }%>
                        </li>
                    </ul> <!-- end .events -->
                </div> <!-- end timeline -->
                <div style="height: 1px;"></div>
            </div>
            <% }%>
            <% }%>
        </div>
        <%@include file="../../common/interface/fragments/contentFooter.jspf"%>
    </body>
</html>